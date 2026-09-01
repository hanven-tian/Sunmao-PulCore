import { Container } from './container.js';
import { EventBus } from './event-bus.js';
import { ModelRegistry } from './model-registry.js';
import { AclEngine } from './acl.js';
import { MemoryRepository } from './memory-repository.js';
import { PluginManager } from './plugin-manager.js';

export class PulCore {
  constructor() {
    this.container = new Container();
    this.events = new EventBus();
    this.models = new ModelRegistry();
    this.acl = new AclEngine();
    this.repository = new MemoryRepository();
    this.plugins = new PluginManager(this);
    this.container
      .register('events', this.events)
      .register('models', this.models)
      .register('acl', this.acl)
      .register('repository', this.repository);
  }

  registerModel(definition) {
    const model = this.models.register(definition);
    this.repository.ensureModel(model.name);
    return model;
  }

  async execute({ role = 'anonymous', user = null, model, action, id, input = {}, query = {} }) {
    const definition = this.models.get(model);
    const rule = this.acl.authorize({ role, model, action });
    const context = { role, user, model: definition, action };
    await this.events.emit(`${model}.${action}.before`, { input, query, context });
    let result;
    if (action === 'list') {
      let rows = this.repository.list(model);
      rows = applyFilters(rows, query, definition);
      rows = this.acl.filterRows(rows, rule, context);
      const total = rows.length;
      rows = applySort(rows, query.sort, definition);
      const page = positiveInteger(query.page, 1);
      const pageSize = Math.min(positiveInteger(query.pageSize, 20), 100);
      result = { data: rows.slice((page - 1) * pageSize, page * pageSize).map((row) => this.acl.filterFields(row, rule)), meta: { page, pageSize, total } };
    } else if (action === 'get') {
      const row = this.repository.get(model, id);
      const permitted = row && this.acl.filterRows([row], rule, context)[0];
      result = permitted ? this.acl.filterFields(permitted, rule) : null;
    } else if (action === 'create') {
      result = this.acl.filterFields(this.repository.create(model, this.models.validateRecord(model, input)), rule);
    } else if (action === 'update') {
      result = this.acl.filterFields(this.repository.update(model, id, this.models.validateRecord(model, input, { partial: true })), rule);
    } else if (action === 'delete') {
      result = { deleted: this.repository.delete(model, id) };
    } else {
      throw new Error(`Unsupported action: ${action}`);
    }
    await this.events.emit(`${model}.${action}.after`, { result, query, context });
    return result;
  }
}

function positiveInteger(value, fallback) {
  const number = Number.parseInt(value, 10);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function applyFilters(rows, query, model) {
  const reserved = new Set(['page', 'pageSize', 'sort']);
  const filters = Object.entries(query).filter(([key]) => !reserved.has(key) && model.fields[key]);
  return rows.filter((row) => filters.every(([key, value]) => String(row[key]) === String(value)));
}

function applySort(rows, sort, model) {
  if (!sort) return rows;
  const descending = sort.startsWith('-');
  const field = descending ? sort.slice(1) : sort;
  if (!model.fields[field]) throw new Error(`Unknown sort field: ${field}`);
  return [...rows].sort((a, b) => String(a[field] ?? '').localeCompare(String(b[field] ?? '')) * (descending ? -1 : 1));
}

