import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function removeBackground(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const minVal = Math.min(r, g, b);
      const maxVal = Math.max(r, g, b);
      const isNeutralLight = minVal > 230 && (maxVal - minVal) < 22;
      const isExtremelyLight = r > 242 && g > 242 && b > 242;

      if (isNeutralLight || isExtremelyLight) {
        data[idx + 3] = 0;
      } else if (minVal > 205 && (maxVal - minVal) < 25) {
        const factor = (minVal - 205) / 25;
        data[idx + 3] = Math.max(0, Math.min(255, Math.round((1 - factor) * 255)));
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Saved transparent cutout: ${outputPath}`);
}

async function main() {
  const brainDir = 'C:/Users/prog2323/.gemini/antigravity-ide/brain/941ebca4-1646-42e8-aaf2-08e27f6a67a8';
  const outDir = 'c:/DENCLUB/src/assets';

  const pinkFile = path.join(brainDir, 'pink_sneaker_1787030690819.jpg');

  if (fs.existsSync(pinkFile)) {
    await removeBackground(pinkFile, path.join(outDir, 'pink_sneaker.png'));
  }
}

main().catch(console.error);
