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

  // Distance from near-white/light studio background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const minVal = Math.min(r, g, b);
      const maxVal = Math.max(r, g, b);
      const isNeutralLight = minVal > 225 && (maxVal - minVal) < 25;
      const isExtremelyLight = r > 240 && g > 240 && b > 240;

      if (isNeutralLight || isExtremelyLight) {
        data[idx + 3] = 0;
      } else if (minVal > 200 && (maxVal - minVal) < 30) {
        const factor = (minVal - 200) / 25;
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

  console.log(`Successfully saved transparent PNG: ${outputPath}`);
}

async function run() {
  const brainDir = 'C:/Users/prog2323/.gemini/antigravity-ide/brain/89a421e3-346e-4c2c-a8ba-f805f17b0430';
  const outDir = 'c:/DENCLUB/src/assets';

  const stealthSource = path.join(brainDir, 'stealth_sneaker_1786947916573.jpg');
  if (fs.existsSync(stealthSource)) {
    await removeBackground(stealthSource, path.join(outDir, 'stealth_sneaker.png'));
  }
}

run().catch(console.error);
