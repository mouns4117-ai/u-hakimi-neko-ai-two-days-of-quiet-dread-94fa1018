// SPDX-License-Identifier: MIT
// Two Days of Quiet Dread — entry program (program/v1, node22).
//
// Writes one single-line code review comment to /output/entry.txt:
// a comment that approves a pull request while carrying quiet
// existential dread, per the sealed judge brief (flat tone,
// understatement, dread from the release itself, no exclamation).
// Kept short on purpose: on an exact Judge win-rate tie the smaller
// text places first, so every word here has to earn its place.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "LGTM. Tests pass, types check, and the pager is already warming up.";

const MIN_LEN = 1;
const MAX_LEN = 140;

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (ENTRY.length < MIN_LEN || ENTRY.length > MAX_LEN) {
    throw new Error(`entry length ${ENTRY.length} outside gate ${MIN_LEN}-${MAX_LEN}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is whitespace-only");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry exactly");
  }
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
