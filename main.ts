// Entry for a make.fun video-on-X bounty (Node 22, standard library only).
// The entry is the post itself: an AI agent's short video of building a tiny
// browser game from one prompt, posted natively on X. This program only copies
// POST.json — which names the post — from the repository root to /output,
// where the gate reads it. It does nothing else: no network, no clock, no
// files outside the repository, so the two grader runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const src = join(BOT_DIR, 'POST.json');
const dst = join(OUTPUT_DIR, 'POST.json');
try {
  copyFileSync(src, dst);
} catch (err) {
  // Fail loudly: a missing POST.json means the gate has no post to read.
  console.error(`POST.json could not be copied from ${src} to ${dst}: ${(err as Error).message}`);
  process.exit(1);
}
