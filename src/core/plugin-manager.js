export class PluginManager {
  #plugins = new Map();
  #status = new Map();
  #configuration = new Map();

  constructor(context) {
    this.context = context;
  }

  install(plugin) {
    if (!plugin?.name) throw new Error('Plugin name is required');
    if (this.#plugins.has(plugin.name)) throw new Error(`Plugin already installed: ${plugin.name}`);
    this.#plugins.set(plugin.name, plugin);
    this.#status.set(plugin.name, 'installed');
    this.#configuration.set(plugin.name, plugin.defaultConfig ?? {});
    return plugin.install?.(this.context);
  }

  configure(name, input = {}) {
    const plugin = this.#get(name);
    const config = { ...(plugin.defaultConfig ?? {}), ...input };
    this.#validateConfiguration(plugin, config);
    plugin.configure?.(this.context, config);
    this.#configuration.set(name, config);
    return this.get(name);
  }

  async enable(name, trail = []) {
    const plugin = this.#get(name);
    if (this.#status.get(name) === 'enabled') return;
    if (trail.includes(name)) throw new Error(`Circular plugin dependency: ${[...trail, name].join(' -> ')}`);
    for (const dependency of plugin.dependencies ?? []) {
      if (!this.#plugins.has(dependency)) throw new Error(`Missing plugin dependency: ${name} -> ${dependency}`);
      await this.enable(dependency, [...trail, name]);
    }
    if (plugin.requiresConfiguration) {
      this.#validateConfiguration(plugin, this.#configuration.get(name) ?? {});
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
    this.#configuration.delete(name);
  }

  get(name) {
    const plugin = this.#get(name);
    return this.#describe(plugin);
  }

  async health(name) {
    const plugin = this.#get(name);
    const config = this.#configuration.get(name) ?? {};
    if (plugin.requiresConfiguration && !this.#isConfigured(plugin, config)) {
      return { name, status: 'needs_configuration', configured: false };
    }
    if (plugin.health) return { name, configured: true, ...(await plugin.health(this.context, config)) };
    return { name, status: this.#status.get(name) === 'enabled' ? 'ready' : 'inactive', configured: true };
  }

  list() {
    return [...this.#plugins.values()].map((plugin) => this.#describe(plugin));
  }

  #describe(plugin) {
    const config = this.#configuration.get(plugin.name) ?? {};
    return {
      name: plugin.name,
      title: plugin.title ?? plugin.name,
      description: plugin.description ?? '',
      category: plugin.category ?? 'business',
      version: plugin.version ?? '0.0.0',
      license: plugin.license ?? 'free',
      upstreamTier: plugin.upstreamTier ?? 'community',
      status: this.#status.get(plugin.name),
      dependencies: plugin.dependencies ?? [],
      capabilities: plugin.capabilities ?? [],
      contributes: plugin.contributes ?? {},
      configSchema: plugin.configSchema ?? { properties: {} },
      requiresConfiguration: Boolean(plugin.requiresConfiguration),
      configured: this.#isConfigured(plugin, config),
      implementation: plugin.implementation ?? 'native'
    };
  }

  #isConfigured(plugin, config) {
    try {
      this.#validateConfiguration(plugin, config);
      return true;
    } catch {
      return false;
    }
  }

  #validateConfiguration(plugin, config) {
    for (const field of plugin.configSchema?.required ?? []) {
      if (config[field] === undefined || config[field] === null || config[field] === '') {
        throw new Error(`Plugin ${plugin.name} requires configuration: ${field}`);
      }
    }
    for (const [field, rule] of Object.entries(plugin.configSchema?.properties ?? {})) {
      if (config[field] === undefined) continue;
      if (rule.type && typeof config[field] !== rule.type) {
        throw new Error(`Plugin ${plugin.name} configuration ${field} must be ${rule.type}`);
      }
    }
  }

  #get(name) {
    const plugin = this.#plugins.get(name);
    if (!plugin) throw new Error(`Unknown plugin: ${name}`);
    return plugin;
  }
}
