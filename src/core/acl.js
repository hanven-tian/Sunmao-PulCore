export class AccessDeniedError extends Error {
  constructor(message = 'Access denied') {
    super(message);
    this.name = 'AccessDeniedError';
    this.statusCode = 403;
  }
}

export class AclEngine {
  #rules = [];

  allow(rule) {
    this.#rules.push({ fields: null, row: null, ...rule });
    return this;
  }

  authorize({ role, model, action }) {
    const rule = this.#rules.find((candidate) =>
      (candidate.role === role || candidate.role === '*') &&
      (candidate.model === model || candidate.model === '*') &&
      (candidate.actions.includes(action) || candidate.actions.includes('*'))
    );
    if (!rule) throw new AccessDeniedError(`${role} cannot ${action} ${model}`);
    return rule;
  }

  filterRows(rows, rule, context) {
    return rule.row ? rows.filter((row) => rule.row(row, context)) : rows;
  }

  filterFields(record, rule) {
    if (!record || !rule.fields) return record;
    return Object.fromEntries(Object.entries(record).filter(([key]) => rule.fields.includes(key)));
  }
}

