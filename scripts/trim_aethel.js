import sharp from 'sharp';
import path from 'path';

async function trimShoe() {
  const filePath = 'c:/DENCLUB/src/assets/aethel_flightstep.png';
  
  // Trim transparent borders and pad slightly to square 1:1
  const trimmed = await sharp(filePath)
    .trim()
    .toBuffer({ resolveWithObject: true });

  const maxDim = Math.max(trimmed.info.width, trimmed.info.height);

  await sharp(trimmed.data)
    .resize({
      width: Math.round(trimmed.info.width * 1.35),
      height: Math.round(trimmed.info.height * 1.35),
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile('c:/DENCLUB/src/assets/aethel_flightstep.png');

  console.log('Successfully trimmed and scaled aethel_flightstep.png to match all other shoes!');
}

trimShoe().catch(console.error);
