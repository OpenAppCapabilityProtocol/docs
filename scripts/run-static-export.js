#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const { spawn } = require("node:child_process");

const mode = process.argv[2];

const commands = {
  export:
    'tinacms build --local --skip-cloud-checks --skip-search-index -c "next build"',
  cloudflare:
    'tinacms build --local --skip-cloud-checks --skip-search-index -c "next build && npx pagefind --site out --output-subdir pagefind"',
};

const command = commands[mode];

if (!command) {
  console.error(
    `Unknown static export mode "${mode}". Use one of: ${Object.keys(commands).join(", ")}.`
  );
  process.exit(1);
}

const projectRoot = process.cwd();
const appApiDir = path.join(projectRoot, "src", "app", "api");
const backupRoot = path.join(projectRoot, ".static-export-route-backup");

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function collectRouteFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectRouteFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name === "route.ts") {
      files.push(fullPath);
    }
  }

  return files;
}

async function moveRouteFilesOut() {
  if (!(await pathExists(appApiDir))) return [];

  const routeFiles = await collectRouteFiles(appApiDir);

  await fs.rm(backupRoot, { recursive: true, force: true });

  for (const routeFile of routeFiles) {
    const relativePath = path.relative(projectRoot, routeFile);
    const backupPath = path.join(backupRoot, relativePath);
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.rename(routeFile, backupPath);
  }

  return routeFiles.map((routeFile) => path.relative(projectRoot, routeFile));
}

async function restoreRouteFiles(relativePaths) {
  for (const relativePath of relativePaths) {
    const backupPath = path.join(backupRoot, relativePath);
    const targetPath = path.join(projectRoot, relativePath);

    if (!(await pathExists(backupPath))) continue;

    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.rename(backupPath, targetPath);
  }

  await fs.rm(backupRoot, { recursive: true, force: true });
}

async function run() {
  const movedRouteFiles = await moveRouteFilesOut();
  let exitCode = 1;

  try {
    const child = spawn(command, {
      cwd: projectRoot,
      env: {
        ...process.env,
        NODE_ENV: "production",
        EXPORT_MODE: "static",
        UNOPTIMIZED_IMAGES: "true",
        NEXT_PUBLIC_STATIC_EXPORT: "true",
        ...(mode === "cloudflare"
          ? { NEXT_PUBLIC_PAGEFIND_PATH: "/pagefind" }
          : {}),
      },
      shell: true,
      stdio: "inherit",
    });

    exitCode = await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("exit", resolve);
    });
  } finally {
    await restoreRouteFiles(movedRouteFiles);
  }

  process.exit(exitCode ?? 1);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
