export class Container {
  #providers = new Map();
  #instances = new Map();

  register(token, provider, { singleton = true } = {}) {
    if (!token) throw new Error('Service token is required');
    if (this.#providers.has(token)) throw new Error(`Service already registered: ${token}`);
    this.#providers.set(token, { provider, singleton });
    return this;
  }

  has(token) {
    return this.#providers.has(token);
  }

  resolve(token) {
    if (this.#instances.has(token)) return this.#instances.get(token);
    const registration = this.#providers.get(token);
    if (!registration) throw new Error(`Unknown service: ${token}`);
    const value = typeof registration.provider === 'function'
      ? registration.provider(this)
      : registration.provider;
    if (registration.singleton) this.#instances.set(token, value);
    return value;
  }
}

