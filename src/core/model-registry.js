const TYPES = new Set(['string', 'text', 'integer', 'number', 'boolean', 'date', 'datetime', 'json']);

export class ModelRegistry {
  #models = new Map();

  register(definition) {
    this.#validate(definition);
    if (this.#models.has(definition.name)) throw new Error(`Model already registered: ${definition.name}`);
    const fields = {
      id: { type: 'string', primaryKey: true, readonly: true },
      ...definition.fields,
      createdAt: { type: 'datetime', readonly: true },
      updatedAt: { type: 'datetime', readonly: true }
    };
    const normalized = Object.freeze({ ...definition, fields: Object.freeze(fields) });
    this.#models.set(definition.name, normalized);
    return normalized;
  }

  unregister(name) {
    return this.#models.delete(name);
  }

  get(name) {
    const model = this.#models.get(name);
    if (!model) throw new Error(`Unknown model: ${name}`);
    return model;
  }

  list() {
    return [...this.#models.values()];
  }

  validateRecord(name, input, { partial = false } = {}) {
    const model = this.get(name);
    const output = {};
    for (const key of Object.keys(input)) {
      const field = model.fields[key];
      if (!field) throw new Error(`Unknown field ${name}.${key}`);
      if (field.readonly) continue;
      output[key] = coerce(field.type, input[key], `${name}.${key}`);
    }
    if (!partial) {
      for (const [key, field] of Object.entries(model.fields)) {
        if (field.required && output[key] == null) throw new Error(`Required field missing: ${name}.${key}`);
      }
    }
    return output;
  }

  #validate(definition) {
    if (!definition || !/^[a-z][a-z0-9_]*$/.test(definition.name ?? '')) {
      throw new Error('Model name must be lower_snake_case');
    }
    if (!definition.fields || typeof definition.fields !== 'object') throw new Error('Model fields are required');
    for (const [name, field] of Object.entries(definition.fields)) {
      if (!/^[a-z][A-Za-z0-9]*$/.test(name)) throw new Error(`Invalid field name: ${name}`);
      if (!TYPES.has(field.type)) throw new Error(`Unsupported field type: ${field.type}`);
    }
  }
}

function coerce(type, value, label) {
  if (value == null) return value;
  if (type === 'integer') {
    const result = Number.parseInt(value, 10);
    if (!Number.isInteger(result)) throw new Error(`${label} must be an integer`);
    return result;
  }
  if (type === 'number') {
    const result = Number(value);
    if (!Number.isFinite(result)) throw new Error(`${label} must be a number`);
    return result;
  }
  if (type === 'boolean') return value === true || value === 'true';
  if (type === 'json') return value;
  if (['date', 'datetime'].includes(type) && Number.isNaN(Date.parse(value))) {
    throw new Error(`${label} must be a valid ${type}`);
  }
  return String(value);
}

