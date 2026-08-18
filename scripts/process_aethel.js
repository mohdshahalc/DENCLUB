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
      const isNeutralLight = minVal > 235 && (maxVal - minVal) < 18;
      const isExtremelyLight = r > 245 && g > 245 && b > 245;

      if (isNeutralLight || isExtremelyLight) {
        data[idx + 3] = 0;
      } else if (minVal > 215 && (maxVal - minVal) < 22) {
        const factor = (minVal - 215) / 30;
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
  const input = 'C:/Users/prog2323/.gemini/antigravity-ide/brain/941ebca4-1646-42e8-aaf2-08e27f6a67a8/.user_uploaded/media_1787031694089.png';
  const output = 'c:/DENCLUB/src/assets/aethel_flightstep.png';

  if (fs.existsSync(input)) {
    await removeBackground(input, output);
  } else {
    console.error('File not found: ' + input);
  }
}

main().catch(console.error);
