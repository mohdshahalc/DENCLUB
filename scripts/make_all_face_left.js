import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function flipImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('Not found:', filePath);
    return;
  }
  const flipped = await sharp(filePath)
    .flop() // horizontal mirror
    .png()
    .toBuffer();

  await sharp(flipped).toFile(filePath);
  console.log('Successfully flipped to face left (like green shoe):', filePath);
}

async function main() {
  const assetsDir = 'c:/DENCLUB/src/assets';
  
  // Flip solar_sneaker, cobalt_runner, and aethel_flightstep so ALL shoes face the same direction as volt_sneaker (green shoe)
  await flipImage(path.join(assetsDir, 'solar_sneaker.png'));
  await flipImage(path.join(assetsDir, 'cobalt_runner.png'));
  await flipImage(path.join(assetsDir, 'aethel_flightstep.png'));
}

main().catch(console.error);
