import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const srcPath = resolve(here, "entry.png");
const dstPath = resolve(outDir, "entry.png");

const bytes = readFileSync(srcPath);
if (bytes.byteLength === 0 || bytes.byteLength > 1048576) {
  throw new Error(`Invalid entry.png byte size: ${bytes.byteLength}`);
}

const isPng =
  bytes[0] === 0x89 &&
  bytes[1] === 0x50 &&
  bytes[2] === 0x4e &&
  bytes[3] === 0x47;
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
if (!isPng && !isJpeg) {
  throw new Error("entry.png must begin with a valid PNG or JPEG header");
}
if (isPng) {
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > 1024 || height > 1024) {
    throw new Error(`Dimensions ${width}x${height} exceed 1024x1024 limit`);
  }
}

mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, dstPath);
