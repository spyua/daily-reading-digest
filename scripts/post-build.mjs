// scripts/post-build.mjs
// Runs after `next build` (output: export) to add extensions to static
// files so GitHub Pages serves them with the correct Content-Type.

import fs from 'node:fs';
import path from 'node:path';

function renameWithExtension(dir, ext) {
  if (!fs.existsSync(dir)) {
    console.log(`[post-build] ${dir} not found, skipping`);
    return 0;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let renamed = 0;
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (e.name.endsWith(ext)) continue;
    const from = path.join(dir, e.name);
    const to = path.join(dir, `${e.name}${ext}`);
    fs.renameSync(from, to);
    renamed += 1;
    console.log(`[post-build] ${dir} — renamed ${e.name} → ${e.name}${ext}`);
  }
  return renamed;
}

const ogCount = renameWithExtension(path.resolve('out/og'), '.png');
const apiCount = renameWithExtension(path.resolve('out/api'), '.json');

console.log(`[post-build] total renamed: ${ogCount} OG images, ${apiCount} API files`);

// Create .nojekyll so GitHub Pages doesn't run Jekyll (which would ignore
// files starting with _, including _next/ where our JS/CSS lives).
const nojekyll = path.resolve('out/.nojekyll');
if (!fs.existsSync(nojekyll)) {
  fs.writeFileSync(nojekyll, '');
  console.log('[post-build] created out/.nojekyll');
}
