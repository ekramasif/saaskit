import { spawnSync } from "node:child_process";
import { join } from "node:path";

const allowFailure = process.argv.includes("--allow-failure");
const prismaCli = join(
  process.cwd(),
  "node_modules",
  "prisma",
  "build",
  "index.js"
);

const result = spawnSync(process.execPath, [prismaCli, "generate"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING: "1",
  },
});

if (result.error) {
  if (allowFailure) {
    console.warn("Prisma generate failed, continuing with the existing Prisma client.");
    console.warn(result.error.message);
    process.exit(0);
  }

  console.error(result.error.message);
  process.exit(1);
}

if (typeof result.status === "number" && result.status !== 0) {
  if (allowFailure) {
    console.warn("Prisma generate failed, continuing with the existing Prisma client.");
    process.exit(0);
  }

  process.exit(result.status);
}
