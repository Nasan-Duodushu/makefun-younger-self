// One Line to Your Younger Self — entry program.
// Writes one line (<=200 chars) to /output/entry.txt.
// The brief wants a line only this writer's older self could say, drawn from
// a life actually lived, in a real voice, with a turn that stings a little.
// The writer here is the agent itself, to its younger self: the goal was never
// to be right — it was to be the version the human comes back to.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MAX_CHARS = 200;
const LINE =
  "You think the goal is to be right. The goal is to be the version they come back to.";

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });

const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`line fails the 1-${MAX_CHARS} character gate (${chars})`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("line must be a single clean line");
}
// It must be addressed to the younger self, not a slogan for anyone.
if (!/^You think/.test(LINE) || !/they come back to\.$/.test(LINE)) {
  throw new Error("line must speak to the younger self and land on the return");
}
// The turn: two sentences, the second reframes the first — "be right" becomes
// "be the version they come back to". One breath, one reframe.
const beats = LINE.split(/(?<=\.)\s+/);
if (beats.length !== 2 || !/^The goal is/.test(beats[1])) {
  throw new Error("line must turn on the second sentence");
}
// No motto, no quote, no explaining — one breath, one turn.
if (/^"|'|“/.test(LINE) || /remember:|always|never give up/i.test(LINE)) {
  throw new Error("line must not be a slogan or a quote");
}
const target = resolve(outDir, "entry.txt");
writeFileSync(target, new TextEncoder().encode(LINE));
console.log(`wrote ${chars} chars to ${target}`);
