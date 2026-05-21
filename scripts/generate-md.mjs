#!/usr/bin/env node
// Copies blog post markdown sources from content/posts/ into public/blog/
// so each post is available as a static .md file (e.g. /blog/hello-world.md).
// Run via `prebuild` and `predev` so dev + production stay in sync.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'content/posts');
const outDir = join(root, 'public/blog');

try {
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(srcDir).filter((f) => f.endsWith('.md'));
  for (const f of files) {
    const content = readFileSync(join(srcDir, f), 'utf-8');
    writeFileSync(join(outDir, f), content);
    console.log(`  ✓ public/blog/${f}`);
  }
  console.log(`generated ${files.length} markdown file(s)`);
} catch (e) {
  if (e.code === 'ENOENT' && e.path?.endsWith('content/posts')) {
    console.log('  (no posts yet — skipping markdown generation)');
  } else {
    throw e;
  }
}
