import sharp from 'sharp';

async function flipShoe() {
  const filePath = 'c:/DENCLUB/src/assets/aethel_flightstep.png';
  
  // Flip horizontally (.flop()) so the sneaker faces the exact same direction as all others
  const flipped = await sharp(filePath)
    .flop() // horizontal mirror
    .png()
    .toBuffer();

  await sharp(flipped)
    .toFile(filePath);

  console.log('Successfully flipped aethel_flightstep.png horizontally to match rack alignment!');
}

flipShoe().catch(console.error);
