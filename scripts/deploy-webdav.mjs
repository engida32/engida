import { readdir, readFile } from "node:fs/promises";
import { extname } from "node:path";
import { request as httpsRequest } from "node:https";

const baseUrl = (process.env.WEBDAV_URL || "").replace(/\/+$/, "");
const username = process.env.WEBDAV_USER || "";
const password = process.env.WEBDAV_PASSWORD || "";
const outDir = process.env.WEBDAV_OUT || "out";
const manifestPath = "/engida-manifest.json";

if (!baseUrl.startsWith("https://")) {
  throw new Error("WEBDAV_URL must be an https:// URL");
}
if (!username || !password) {
  throw new Error("WEBDAV_USER and WEBDAV_PASSWORD are required");
}

const protectedPaths = new Set([
  "/.ftpquota",
  "/.htaccess",
  "/.user.ini",
  "/.well-known/",
  "/cgi-bin/",
  "/php.ini",
]);

const contentTypes = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function request(method, remotePath, body, headers = {}) {
  const url = new URL(remotePath, `${baseUrl}/`);
  return new Promise((resolve, reject) => {
    const req = httpsRequest(
      url,
      {
        method,
        auth: `${username}:${password}`,
        headers: {
          ...(body ? { "Content-Length": String(body.length) } : {}),
          ...headers,
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode || 0, body: Buffer.concat(chunks) });
        });
      },
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function collectFiles(dir, prefix = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;
    const relativePath = `${prefix}${entry.name}`;
    const absolutePath = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath, `${relativePath}/`)));
    } else if (entry.isFile()) {
      files.push({ relativePath, absolutePath });
    }
  }

  return files;
}

async function readPreviousManifest() {
  const response = await request("GET", manifestPath);
  if (response.status === 404) return [];
  if (response.status !== 200) {
    throw new Error(`Could not read remote manifest: HTTP ${response.status}`);
  }
  const parsed = JSON.parse(response.body.toString("utf8"));
  if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
    throw new Error("Remote manifest is not a string array");
  }
  return parsed;
}

async function ensureCollection(remotePath) {
  const response = await request("MKCOL", remotePath);
  if (![201, 405].includes(response.status)) {
    throw new Error(`MKCOL ${remotePath} failed: HTTP ${response.status}`);
  }
}

const localFiles = (await collectFiles(outDir))
  .filter(({ relativePath }) => relativePath !== "CNAME")
  .map((file) => ({ ...file, remotePath: `/${file.relativePath}` }));

const directories = [...new Set(
  localFiles.flatMap(({ relativePath }) => {
    const parts = relativePath.split("/");
    return parts.slice(0, -1).map((_, index) => `/${parts.slice(0, index + 1).join("/")}`);
  }),
)].sort((a, b) => a.split("/").length - b.split("/").length);

for (const directory of directories) {
  await ensureCollection(directory);
}

const uploaded = new Set();
for (const file of localFiles) {
  const body = await readFile(file.absolutePath);
  const type = contentTypes.get(extname(file.remotePath).toLowerCase()) || "application/octet-stream";
  const response = await request("PUT", file.remotePath, body, { "Content-Type": type });
  if (![200, 201, 204].includes(response.status)) {
    throw new Error(`PUT ${file.remotePath} failed: HTTP ${response.status}`);
  }
  uploaded.add(file.remotePath);
}

const previousManifest = await readPreviousManifest();
const stale = previousManifest.filter((remotePath) => !uploaded.has(remotePath) && !protectedPaths.has(remotePath));

for (const remotePath of stale) {
  const response = await request("DELETE", remotePath);
  if (![204, 404].includes(response.status)) {
    throw new Error(`DELETE ${remotePath} failed: HTTP ${response.status}`);
  }
}

const manifest = [...uploaded].sort();
const manifestBody = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
const manifestResponse = await request("PUT", manifestPath, manifestBody, { "Content-Type": "application/json; charset=utf-8" });
if (![200, 201, 204].includes(manifestResponse.status)) {
  throw new Error(`PUT ${manifestPath} failed: HTTP ${manifestResponse.status}`);
}

console.log(`Uploaded ${localFiles.length} files and removed ${stale.length} stale files.`);
