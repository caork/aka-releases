#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL(".", import.meta.url);
const files = readdirSync(root)
  .filter((name) => name.endsWith(".md"))
  .sort();
const content = Object.fromEntries(
  files.map((name) => [name, readFileSync(join(root.pathname, name), "utf8")]),
);

assert.deepEqual(files, [
  "README.md",
  "licenses.md",
  "linux-headless.md",
  "maintenance.md",
  "windows-desktop.md",
]);

const all = Object.values(content).join("\n");
for (const required of [
  "Windows 桌面版",
  "Linux headless 服务包",
  "1500 秒",
  "aka serve",
  "Argon2id PHC",
  "HTTPS",
  "THIRD_PARTY_NOTICES.md",
  "MIT 派生",
  "Semantic packs",
  "Import local package",
  "aka-packs",
  "packs-v0.1.11",
]) {
  assert.match(all, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}

assert.match(content["README.md"], /普通包[\s\S]*complete 包/);
assert.match(content["README.md"], /complete 包[\s\S]*五个已签名/);
assert.match(content["windows-desktop.md"], /complete 包首次启动时会自动校验并导入/);
assert.match(content["linux-headless.md"], /首次运行 `aka serve` 时会自动校验并导入/);
assert.match(content["windows-desktop.md"], /Java[\s\S]*Python[\s\S]*TypeScript[\s\S]*C \/ C\+\+[\s\S]*Rust/);
assert.match(content["linux-headless.md"], /AKA_ALLOW_REMOTE_ADMIN=1[\s\S]*AKA_ADMIN_PASSWORD_HASH/);
assert.doesNotMatch(all, /(?:aka-cli|\bCLI\b|portable|AppImage|Docker 镜像)/i);

console.log(`wiki validation passed (${files.length} pages)`);
