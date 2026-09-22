import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "fixtures", "seed.json");
const targetDirectory = resolve(root, ".data");
const target = resolve(targetDirectory, "dev-fixtures.json");

await mkdir(targetDirectory, { recursive: true });
const contents = await readFile(source, "utf8");
await writeFile(target, contents, "utf8");
console.log(`Seeded deterministic fixtures at ${target}`);
