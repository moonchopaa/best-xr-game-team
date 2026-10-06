// Local development server. Runs the built worker on Node with a SQLite-backed
// D1 binding and a folder-backed R2 bucket, so the game and editor work offline.
import {createServer} from 'node:http';
import {Readable} from 'node:stream';
import {DatabaseSync} from 'node:sqlite';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {readFileSync} from 'node:fs';

const port = Number(process.env.PORT || 8787);
const dataDir = '.dev';
await mkdir(dataDir + '/images', {recursive: true});

const sqlite = new DatabaseSync(dataDir + '/dev.sqlite');
for (const statement of readFileSync('drizzle/0000_elite_power_pack.sql', 'utf8').split('--> statement-breakpoint')) {
 const sql = statement.trim();
 if (sql) sqlite.exec(sql.replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS'));
}

const DB = {
 prepare(sql) {
  const statement = sqlite.prepare(sql);
  const run = params => {
   const row = /returning/i.test(sql) || /^\s*select/i.test(sql) ? statement.get(...params) : (statement.run(...params), undefined);
   return row ?? null;
  };
  return {bind: (...params) => ({first: async () => run(params)}), first: async () => run([])};
 },
};

const BUCKET = {
 async get(key) {
  const name = dataDir + '/images/' + key.replaceAll('/', '_');
  try {
   const [bytes, meta] = await Promise.all([readFile(name), readFile(name + '.type', 'utf8')]);
   return {body: new Blob([bytes]).stream(), httpMetadata: {contentType: meta}};
  } catch {
   return null;
  }
 },
 async put(key, bytes, options) {
  const name = dataDir + '/images/' + key.replaceAll('/', '_');
  await writeFile(name, bytes);
  await writeFile(name + '.type', options?.httpMetadata?.contentType || 'application/octet-stream');
 },
};

const env = {
 DB,
 BUCKET,
 EDITOR_PASSWORD: process.env.EDITOR_PASSWORD || 'dev',
 EDITOR_SESSION_SECRET: process.env.EDITOR_SESSION_SECRET || 'dev-session-secret',
};

const {default: worker} = await import('../dist/server/index.js');

createServer(async (req, res) => {
 const hasBody = !['GET', 'HEAD'].includes(req.method);
 const request = new Request('http://localhost:' + port + req.url, {
  method: req.method,
  headers: req.headers,
  body: hasBody ? Readable.toWeb(req) : undefined,
  duplex: hasBody ? 'half' : undefined,
 });
 const response = await worker.fetch(request, env);
 const headers = Object.fromEntries(response.headers);
 const cookies = response.headers.getSetCookie();
 if (cookies.length) headers['set-cookie'] = cookies;
 res.writeHead(response.status, headers);
 res.end(response.body ? Buffer.from(await response.arrayBuffer()) : undefined);
 console.log(req.method, req.url, response.status);
}).listen(port, () => console.log('A Sip of Home: http://localhost:' + port + '  (editor at /edit)'));
