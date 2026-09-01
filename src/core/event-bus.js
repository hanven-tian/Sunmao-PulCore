export class EventBus {
  #listeners = new Map();

  on(event, listener, { priority = 0 } = {}) {
    const listeners = this.#listeners.get(event) ?? [];
    listeners.push({ listener, priority });
    listeners.sort((a, b) => b.priority - a.priority);
    this.#listeners.set(event, listeners);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    const listeners = this.#listeners.get(event) ?? [];
    this.#listeners.set(event, listeners.filter((item) => item.listener !== listener));
  }

  async emit(event, payload) {
    const results = [];
    for (const { listener } of this.#listeners.get(event) ?? []) {
      results.push(await listener(payload));
    }
    return results;
  }
}

