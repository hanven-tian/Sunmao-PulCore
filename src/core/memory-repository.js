import { randomUUID } from 'node:crypto';

export class MemoryRepository {
  #tables = new Map();

  ensureModel(name) {
    if (!this.#tables.has(name)) this.#tables.set(name, new Map());
  }

  dropModel(name) {
    this.#tables.delete(name);
  }

  create(model, data) {
    this.ensureModel(model);
    const now = new Date().toISOString();
    const record = { id: randomUUID(), ...data, createdAt: now, updatedAt: now };
    this.#tables.get(model).set(record.id, record);
    return structuredClone(record);
  }

  list(model) {
    this.ensureModel(model);
    return [...this.#tables.get(model).values()].map((record) => structuredClone(record));
  }

  get(model, id) {
    const record = this.#tables.get(model)?.get(id);
    return record ? structuredClone(record) : null;
  }

  update(model, id, patch) {
    const current = this.#tables.get(model)?.get(id);
    if (!current) return null;
    const record = { ...current, ...patch, id, updatedAt: new Date().toISOString() };
    this.#tables.get(model).set(id, record);
    return structuredClone(record);
  }

  delete(model, id) {
    return this.#tables.get(model)?.delete(id) ?? false;
  }
}
