import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processImage(sourcePath, hub, slug) {
  try {
    if (!fs.existsSync(sourcePath)) {
      console.error(`Source file not found: ${sourcePath}`);
      process.exit(1);
    }

    const targetDir = path.join(__dirname, 'public', 'images', 'articles', hub, slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, 'cover.webp');

    await sharp(sourcePath)
      .webp({ quality: 85 })
      .toFile(targetPath);

    console.log(`Successfully processed and saved to ${targetPath}`);
  } catch (error) {
    console.error(`Failed to process image: ${error.message}`);
    process.exit(1);
  }
}

const sourcePath = process.argv[2];
const hub = process.argv[3];
const slug = process.argv[4];

if (!sourcePath || !hub || !slug) {
  console.error("Usage: node process_image.js <source_path> <hub> <slug>");
  process.exit(1);
}

processImage(sourcePath, hub, slug);
