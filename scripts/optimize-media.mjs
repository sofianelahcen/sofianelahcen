import { execFile } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);

const SOURCE = "assets/media-src";
const OUTPUT = "public/media";
const MAX_EDGE = 2400;
const WEBP_QUALITY = 80;
const VIDEO_MAX_EDGE = 1440;
const VIDEO_CRF = 28;

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".m4v"]);

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function optimizeImage(from, to) {
  await sharp(from)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toFile(to);
}

async function optimizeVideo(from, to) {
  await run("ffmpeg", [
    "-y",
    "-i", from,
    "-an",
    "-vf", `scale='min(${VIDEO_MAX_EDGE},iw)':'min(${VIDEO_MAX_EDGE},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", String(VIDEO_CRF),
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    to,
  ]);
}

async function posterFrame(from, to) {
  const frame = path.join(path.dirname(to), `.poster-${path.basename(to)}.png`);
  await run("ffmpeg", ["-y", "-i", from, "-frames:v", "1", "-q:v", "2", frame]);
  await optimizeImage(frame, to);
  await run("rm", ["-f", frame]);
}

async function main() {
  await mkdir(OUTPUT, { recursive: true });
  const entries = (await readdir(SOURCE)).filter(
    (name) => !name.startsWith("."),
  );

  let before = 0;
  let after = 0;

  for (const name of entries.sort()) {
    const from = path.join(SOURCE, name);
    const ext = path.extname(name).toLowerCase();
    const base = path.basename(name, path.extname(name));
    const sourceSize = (await stat(from)).size;
    before += sourceSize;

    if (IMAGE_EXT.has(ext)) {
      const to = path.join(OUTPUT, `${base}.webp`);
      await optimizeImage(from, to);
      const size = (await stat(to)).size;
      after += size;
      console.log(`image  ${name} → ${base}.webp  ${kb(sourceSize)} → ${kb(size)}`);
      continue;
    }

    if (VIDEO_EXT.has(ext)) {
      const to = path.join(OUTPUT, `${base}.mp4`);
      await optimizeVideo(from, to);
      const size = (await stat(to)).size;
      after += size;

      const poster = path.join(OUTPUT, `${base}-poster.webp`);
      await posterFrame(from, poster);
      const posterSize = (await stat(poster)).size;
      after += posterSize;

      console.log(
        `video  ${name} → ${base}.mp4  ${kb(sourceSize)} → ${kb(size)} (+ poster ${kb(posterSize)})`,
      );
      continue;
    }

    console.log(`skip   ${name}`);
  }

  console.log(`\ntotal  ${kb(before)} → ${kb(after)}`);
}

await main();
