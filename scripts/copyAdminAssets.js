const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const adminDir = path.join(repoRoot, "static", "admin");
const decapTargetDir = path.join(adminDir, "decap-cms");

function requirePkgFile(pkgName, relPath) {
  const resolved = require.resolve(`${pkgName}/package.json`);
  return path.join(path.dirname(resolved), relPath);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDecapBundle() {
  const decapDistDir = requirePkgFile("decap-cms", "dist");
  ensureDir(decapTargetDir);

  const files = fs.readdirSync(decapDistDir).filter((name) => {
    if (name === "decap-cms.js") return true;
    if (name === "decap-cms.js.LICENSE.txt") return true;
    if (/\.decap-cms\.js$/.test(name)) return true;
    if (/\.decap-cms\.js\.LICENSE\.txt$/.test(name)) return true;
    return false;
  });

  if (files.length === 0) {
    throw new Error(`No decap-cms dist files found in ${decapDistDir}`);
  }

  for (const name of files) {
    copyFile(path.join(decapDistDir, name), path.join(decapTargetDir, name));
  }

  return files.length;
}

function copyJsYaml() {
  const src = requirePkgFile("js-yaml", "dist/js-yaml.min.js");
  const dest = path.join(adminDir, "js-yaml.min.js");
  copyFile(src, dest);
}

const decapCount = copyDecapBundle();
copyJsYaml();

console.log(
  `Copied ${decapCount} decap-cms files to ${path.relative(repoRoot, decapTargetDir)} and js-yaml.min.js to ${path.relative(repoRoot, adminDir)}`,
);
