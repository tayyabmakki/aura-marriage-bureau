import sharp from 'sharp';
import fs from 'fs';

async function makeRoundLogo() {
  const input = 'assets/AURA Marriage Bureau Gold Emblem.png';
  const meta = await sharp(input).metadata();
  console.log('Original Emblem:', meta.width, 'x', meta.height);

  const cx = meta.width / 2;
  const cy = meta.height / 2;
  const r = 582;
  const size = r * 2; // 1164

  // 1. Crop to the bounding square of the golden circle
  const cropped = await sharp(input)
    .extract({
      left: Math.round(cx - r),
      top: Math.round(cy - r),
      width: size,
      height: size,
    })
    .png()
    .toBuffer();

  // 2. Create matching circular mask of size x size
  const maskSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${r}" cy="${r}" r="${r}" fill="#ffffff" />
    </svg>`
  );

  const maskPng = await sharp(maskSvg).png().toBuffer();

  // 3. Composite mask with dest-in so corners outside gold ring become 100% transparent
  const roundLogo = await sharp(cropped)
    .composite([{ input: maskPng, blend: 'dest-in' }])
    .png({ quality: 100 })
    .toBuffer();

  // Save to public/logo.png
  fs.writeFileSync('public/logo.png', roundLogo);
  console.log(`Saved public/logo.png (${size}x${size})`);

  // Save optimized WebP
  const webpBuffer = await sharp(roundLogo).webp({ quality: 95 }).toBuffer();
  fs.writeFileSync('public/images/aura-emblem.webp', webpBuffer);
  fs.writeFileSync('public/images/logo.webp', webpBuffer);
  console.log('Saved public/images/aura-emblem.webp and public/images/logo.webp');
}

makeRoundLogo().catch((err) => {
  console.error(err);
  process.exit(1);
});
