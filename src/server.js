import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { PulCore } from './core/pulcore.js';
import { AccessDeniedError } from './core/acl.js';
import { accessControlPlugin } from './plugins/access-control.js';
import { portalManagerPlugin } from './plugins/portal-manager.js';
import { workflowPlugin } from './plugins/workflow.js';
import { auditLogPlugin } from './plugins/audit-log.js';
import { iotSuitePlugins } from './plugins/iot-suite.js';
import { createParityPlugins } from './plugins/parity-catalog.js';

export async function createApp() {
  const core = new PulCore();
  const parityPlugins = createParityPlugins({
    'access-control': accessControlPlugin,
    'portal-manager': portalManagerPlugin,
    workflow: workflowPlugin,
    'audit-log': auditLogPlugin
  });
  const plugins = [...parityPlugins, ...iotSuitePlugins];
  for (const plugin of plugins) core.plugins.install(plugin);
  for (const plugin of plugins) if (!plugin.requiresConfiguration) await core.plugins.enable(plugin.name);

  const server = http.createServer(async (request, response) => {
    try {
      await route(core, request, response);
    } catch (error) {
      const status = error instanceof AccessDeniedError ? 403 : error.statusCode ?? 400;
      json(response, status, { error: error.name, message: error.message });
    }
  });
  return { core, server };
}

async function route(core, request, response) {
  const url = new URL(request.url, 'http://localhost');
  if (request.method === 'GET' && url.pathname === '/health') {
    return json(response, 200, { name: 'PulCore', status: 'ok', plugins: core.plugins.list() });
  }
  if (request.method === 'GET' && url.pathname === '/api/plugins') {
    if (request.headers['x-user-role'] !== 'admin') return json(response, 403, { error: 'AccessDenied', message: 'Administrator role required' });
    return json(response, 200, { data: core.plugins.list(), meta: { total: core.plugins.list().length } });
  }
  const pluginDetail = url.pathname.match(/^\/api\/plugins\/([a-z][a-z0-9-]*)(?:\/(health))?$/);
  if (request.method === 'GET' && pluginDetail) {
    if (request.headers['x-user-role'] !== 'admin') return json(response, 403, { error: 'AccessDenied', message: 'Administrator role required' });
    return json(response, 200, pluginDetail[2] ? await core.plugins.health(pluginDetail[1]) : core.plugins.get(pluginDetail[1]));
  }
  if (request.method === 'PUT' && pluginDetail && !pluginDetail[2]) {
    if (request.headers['x-user-role'] !== 'admin') return json(response, 403, { error: 'AccessDenied', message: 'Administrator role required' });
    return json(response, 200, core.plugins.configure(pluginDetail[1], await readJson(request)));
  }
  const pluginAction = url.pathname.match(/^\/api\/plugins\/([a-z][a-z0-9-]*):(enable|disable)$/);
  if (request.method === 'POST' && pluginAction) {
    if (request.headers['x-user-role'] !== 'admin') return json(response, 403, { error: 'AccessDenied', message: 'Administrator role required' });
    const [, name, action] = pluginAction;
    await core.plugins[action](name);
    return json(response, 200, core.plugins.list().find((plugin) => plugin.name === name));
  }

  const metadataMatch = url.pathname.match(/^\/api\/models\/([a-z][a-z0-9_]*)$/);
  if (request.method === 'GET' && metadataMatch) return json(response, 200, core.models.get(metadataMatch[1]));

  const match = url.pathname.match(/^\/api\/model-([a-z][a-z0-9_]*):(list|create|get|update|delete)(?:\/([^/]+))?$/);
  if (!match) return json(response, 404, { error: 'NotFound', message: 'Route not found' });
  const [, model, action, id] = match;
  const methods = { list: 'GET', get: 'GET', create: 'POST', update: 'PUT', delete: 'DELETE' };
  if (request.method !== methods[action]) return json(response, 405, { error: 'MethodNotAllowed' });
  if (['get', 'update', 'delete'].includes(action) && !id) return json(response, 400, { error: 'ValidationError', message: 'Record id is required' });

  const result = await core.execute({
    role: request.headers['x-user-role'] ?? 'anonymous',
    user: request.headers['x-user-id'] ? { id: request.headers['x-user-id'] } : null,
    model,
    action,
    id,
    input: ['POST', 'PUT'].includes(request.method) ? await readJson(request) : {},
    query: Object.fromEntries(url.searchParams)
  });
  json(response, result == null ? 404 : action === 'create' ? 201 : 200, result ?? { error: 'NotFound' });
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1_000_000) throw Object.assign(new Error('Request body too large'), { statusCode: 413 });
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new Error('Request body must be valid JSON');
  }
}

function json(response, statusCode, body) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { server } = await createApp();
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '127.0.0.1';
  server.listen(port, host, () => console.log(`PulCore listening on http://${host}:${port}`));
}
