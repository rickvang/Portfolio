import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const target = resolve(import.meta.dirname, "..", ".data", "dev-fixtures.json");
await rm(target, { force: true });
console.log(`Reset deterministic fixtures at ${target}`);
