import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(here, "entry.png");
const dest = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
const srcBytes = statSync(src).size;
const destBytes = statSync(dest).size;
if (srcBytes !== destBytes) {
  throw new Error(
    `Byte count mismatch: source ${srcBytes} bytes, copy ${destBytes} bytes`,
  );
}
console.log(`Copied entry.png to ${dest} (${destBytes} bytes, verified)`);
