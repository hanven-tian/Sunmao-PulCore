export class PluginManager {
  #plugins = new Map();
  #status = new Map();

  constructor(context) {
    this.context = context;
  }

  install(plugin) {
    if (!plugin?.name) throw new Error('Plugin name is required');
    if (this.#plugins.has(plugin.name)) throw new Error(`Plugin already installed: ${plugin.name}`);
    this.#plugins.set(plugin.name, plugin);
    this.#status.set(plugin.name, 'installed');
    return plugin.install?.(this.context);
  }

  async enable(name, trail = []) {
    const plugin = this.#get(name);
    if (this.#status.get(name) === 'enabled') return;
    if (trail.includes(name)) throw new Error(`Circular plugin dependency: ${[...trail, name].join(' -> ')}`);
    for (const dependency of plugin.dependencies ?? []) {
      if (!this.#plugins.has(dependency)) throw new Error(`Missing plugin dependency: ${name} -> ${dependency}`);
      await this.enable(dependency, [...trail, name]);
    }
    this.#status.set(name, 'enabling');
    try {
      await plugin.enable?.(this.context);
      this.#status.set(name, 'enabled');
      await this.context.events.emit('plugin.enabled', { name });
    } catch (error) {
      this.#status.set(name, 'failed');
      await this.context.events.emit('plugin.failed', { name, error });
      throw error;
    }
  }

  async disable(name) {
    const dependants = [...this.#plugins.values()].filter((plugin) =>
      (plugin.dependencies ?? []).includes(name) && this.#status.get(plugin.name) === 'enabled'
    );
    if (dependants.length) throw new Error(`Plugin ${name} is required by: ${dependants.map((p) => p.name).join(', ')}`);
    const plugin = this.#get(name);
    await plugin.disable?.(this.context);
    this.#status.set(name, 'disabled');
    await this.context.events.emit('plugin.disabled', { name });
  }

  async uninstall(name) {
    if (this.#status.get(name) === 'enabled') await this.disable(name);
    const plugin = this.#get(name);
    await plugin.uninstall?.(this.context);
    this.#plugins.delete(name);
    this.#status.delete(name);
  }

  list() {
    return [...this.#plugins.values()].map((plugin) => ({
      name: plugin.name,
      title: plugin.title ?? plugin.name,
      description: plugin.description ?? '',
      category: plugin.category ?? 'business',
      version: plugin.version ?? '0.0.0',
      license: plugin.license ?? 'free',
      upstreamTier: plugin.upstreamTier ?? 'community',
      status: this.#status.get(plugin.name),
      dependencies: plugin.dependencies ?? [],
      capabilities: plugin.capabilities ?? []
    }));
  }

  #get(name) {
    const plugin = this.#plugins.get(name);
    if (!plugin) throw new Error(`Unknown plugin: ${name}`);
    return plugin;
  }
}
