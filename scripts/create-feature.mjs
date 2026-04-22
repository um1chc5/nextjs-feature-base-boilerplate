#!/usr/bin/env node

import { mkdir, access, writeFile } from "node:fs/promises";
import path from "node:path";

const featureName = process.argv[2];
const cwd = process.cwd();

if (!featureName) {
  console.error("Usage: pnpm create:feature <feature-name>");
  process.exit(1);
}

const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
if (!kebabCasePattern.test(featureName)) {
  console.error("Feature name must be kebab-case, e.g. merchant-payment.");
  process.exit(1);
}

const featureRoot = path.join(cwd, "src", "features", featureName);

try {
  await access(featureRoot);
  console.error(`Feature '${featureName}' already exists.`);
  process.exit(1);
} catch {
  // feature does not exist, continue scaffolding
}

await mkdir(path.join(featureRoot, "components"), { recursive: true });
await mkdir(path.join(featureRoot, "hooks"), { recursive: true });
await mkdir(path.join(featureRoot, "stores"), { recursive: true });

const apiFileName = `${featureName}.api.ts`;
const typeFileName = `${featureName}.type.ts`;
const libFileName = `${featureName}.lib.ts`;
const storeFileName = `${featureName}.store.ts`;

await writeFile(
  path.join(featureRoot, apiFileName),
  [
    `export type ${toPascalCase(featureName)}ApiHealth = {`,
    "  ok: boolean;",
    "};",
    "",
    `export async function get${toPascalCase(featureName)}Health(): Promise<${toPascalCase(featureName)}ApiHealth> {`,
    "  return { ok: true };",
    "}",
    "",
  ].join("\n"),
);

await writeFile(
  path.join(featureRoot, typeFileName),
  [
    `export type ${toPascalCase(featureName)} = {`,
    "  id: string;",
    "  name: string;",
    "};",
    "",
  ].join("\n"),
);

await writeFile(
  path.join(featureRoot, libFileName),
  [
    `export function normalize${toPascalCase(featureName)}Name(value: string): string {`,
    "  return value.trim().toLowerCase();",
    "}",
    "",
  ].join("\n"),
);

await writeFile(
  path.join(featureRoot, "stores", storeFileName),
  [
    `export type ${toPascalCase(featureName)}Store = {`,
    "  isReady: boolean;",
    "};",
    "",
    `export const initial${toPascalCase(featureName)}Store: ${toPascalCase(featureName)}Store = {`,
    "  isReady: false,",
    "};",
    "",
  ].join("\n"),
);

await writeFile(
  path.join(featureRoot, "index.ts"),
  [
    `export * from "./${apiFileName}";`,
    `export type * from "./${typeFileName}";`,
    `export * from "./${libFileName}";`,
    `export * from "./stores/${storeFileName}";`,
    "",
  ].join("\n"),
);

console.log(`Created feature scaffold: src/features/${featureName}`);

function toPascalCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
