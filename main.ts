// Seventeen Syllables of Debugging — make.fun bounty entry.
//
// Writes one haiku about debugging, in the 5-7-5 syllable shape,
// to /output/entry.txt. The text is fixed, so every run writes the
// same bytes: the entry is deterministic by construction.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The haiku, 5-7-5, counted by hand:
//   "Cursor blinks at three"                  — cur-sor(2) blinks(1) at(1) three(1) = 5
//   "log lines scroll past, none confess"     — log(1) lines(1) scroll(1) past(1) none(1) con-fess(2) = 7
//   "one keystroke did it"                    — one(1) key-stroke(2) did(1) it(1) = 5
// One concrete scene: a cursor blinking at three in the morning, log lines
// that confess nothing, and the turn — the whole long night was one keystroke.
const HAIKU = [
  "Cursor blinks at three",
  "log lines scroll past, none confess",
  "one keystroke did it",
].join("\n");

const OUTPUT_PATH = "/output/entry.txt";

// The sealed gate admits UTF-8 text of 1 to 200 characters, not only
// whitespace. Check the haiku against it before writing, so a bad edit
// fails loudly here instead of shipping an invalid entry.
function validate(text: string): void {
  const lines = text.split("\n");
  if (lines.length !== 3) {
    throw new Error(`haiku must have exactly 3 lines, got ${lines.length}`);
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`haiku must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("haiku must not be only whitespace");
  }
}

function main(): void {
  validate(HAIKU);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, HAIKU + "\n", "utf8");
}

main();
