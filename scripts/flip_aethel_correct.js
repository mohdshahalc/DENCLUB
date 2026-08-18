import sharp from 'sharp';

async function flipAethel() {
  const filePath = 'c:/DENCLUB/src/assets/aethel_flightstep.png';
  
  const flipped = await sharp(filePath)
    .flop() // horizontal mirror
    .png()
    .toBuffer();

  await sharp(flipped).toFile(filePath);
  console.log('Successfully flipped aethel_flightstep.png to match all other shoes!');
}

flipAethel().catch(console.error);
