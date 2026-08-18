import sharp from 'sharp';
import path from 'path';

async function flipPink() {
  const filePath = 'c:/DENCLUB/src/assets/pink_sneaker.png';
  
  const flipped = await sharp(filePath)
    .flop() // horizontal mirror
    .png()
    .toBuffer();

  await sharp(flipped).toFile(filePath);
  console.log('Successfully flipped pink_sneaker.png to match green shoe alignment!');
}

flipPink().catch(console.error);
