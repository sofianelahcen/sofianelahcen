import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import process from "node:process";

import { readFileSync } from "node:fs";
import os from "node:os";

function cliToken() {
  try {
    const cfg = JSON.parse(
      readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8"),
    );
    return cfg.authToken || null;
  } catch {
    return null;
  }
}

const token = process.env.SANITY_WRITE_TOKEN || cliToken();
if (!token) {
  console.error(
    "No Sanity token. Either run `npx sanity login` in studio/, or:\n" +
      "  SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs",
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "p6dw26nk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const seedUrl = pathToFileURL(
  path.join(process.cwd(), "lib/content-seed.mjs"),
).href;
const { selectedWorks, archiveProjects, settings } = await import(seedUrl);

const uploaded = new Map();

async function uploadAsset(localPath) {
  if (uploaded.has(localPath)) return uploaded.get(localPath);
  const abs = path.join(process.cwd(), "public", localPath.replace(/^\//, ""));
  const body = await readFile(abs);
  const filename = path.basename(abs);
  const isVideo = /\.(mp4|webm|mov)$/i.test(filename);
  const asset = await client.assets.upload(isVideo ? "file" : "image", body, {
    filename,
  });
  uploaded.set(localPath, asset._id);
  console.log(`  uploaded ${filename} -> ${asset._id}`);
  return asset._id;
}

const key = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

async function mediaMember(item) {
  if (item.kind === "video") {
    const fileId = await uploadAsset(item.src);
    const posterId = item.poster ? await uploadAsset(item.poster) : null;
    return {
      _type: "videoItem",
      _key: key(),
      file: { _type: "file", asset: { _type: "reference", _ref: fileId } },
      ...(posterId
        ? {
            poster: {
              _type: "image",
              asset: { _type: "reference", _ref: posterId },
            },
          }
        : {}),
      aspectWidth: item.width,
      aspectHeight: item.height,
      alt: item.alt,
    };
  }

  const imageId = await uploadAsset(item.src);
  return {
    _type: "imageItem",
    _key: key(),
    image: { _type: "image", asset: { _type: "reference", _ref: imageId } },
    alt: item.alt,
  };
}

const LEXO = "0|hzzzzz:";
const rank = (index) => `${LEXO}${String(index).padStart(6, "0")}`;

async function seedDocuments(list, type) {
  const docs = [];
  for (const [index, entry] of list.entries()) {
    console.log(`${type}: ${entry.title}`);
    const members = [];
    for (const item of entry.items) members.push(await mediaMember(item));
    docs.push({
      _id: `${type}-${entry.id}`,
      _type: type,
      title: entry.title,
      year: entry.year,
      credits: entry.credits,
      media: members,
      orderRank: rank(index),
    });
  }
  return docs;
}

console.log("Uploading assets and building documents…");
const projectDocs = await seedDocuments(selectedWorks, "project");
const archiveDocs = await seedDocuments(archiveProjects, "archiveProject");

const settingsDoc = { _id: "siteSettings", _type: "siteSettings", ...settings };

const tx = client.transaction();
for (const doc of [settingsDoc, ...projectDocs, ...archiveDocs]) {
  tx.createOrReplace(doc);
}
await tx.commit();

console.log(
  `\nDone. ${projectDocs.length} selected works, ${archiveDocs.length} archive projects, ` +
    `${uploaded.size} assets.`,
);
