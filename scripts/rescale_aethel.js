import sharp from 'sharp';

async function rescaleAethel() {
  const filePath = 'c:/DENCLUB/src/assets/aethel_flightstep.png';

  const metadata = await sharp(filePath).metadata();
  const targetWidth = Math.round(metadata.width * 0.86);
  const targetHeight = Math.round(metadata.height * 0.86);

  const resized = await sharp(filePath)
    .resize(targetWidth, targetHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3'
    })
    .extend({
      top: Math.round((metadata.height - targetHeight) / 2),
      bottom: Math.round((metadata.height - targetHeight) / 2),
      left: Math.round((metadata.width - targetWidth) / 2),
      right: Math.round((metadata.width - targetWidth) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  await sharp(resized).toFile(filePath);
  console.log('Successfully scaled down aethel_flightstep.png by 14% to match neighbors perfectly!');
}

rescaleAethel().catch(console.error);
