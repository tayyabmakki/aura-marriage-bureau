import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const SRC_LOGO = path.join(ROOT_DIR, 'assets', 'logo.png');

async function buildFavicons() {
  console.log('Generating luxury favicons for Aura Marriage Bureau...');

  if (!fs.existsSync(SRC_LOGO)) {
    throw new Error(`Source logo not found at: ${SRC_LOGO}`);
  }

  // 1. Extract the core logo boundary (961x424 from 1254x1254)
  const logo = sharp(SRC_LOGO).extract({ left: 141, top: 421, width: 961, height: 424 });
  const logoBuffer = await logo.resize(430, null, { fit: 'inside' }).toBuffer();
  const logoMeta = await sharp(logoBuffer).metadata();

  // 2. SVG Luxury Circle Backdrop: Dark gradient with gold ring
  const circleSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#191510"/>
          <stop offset="65%" stop-color="#0e0c0a"/>
          <stop offset="100%" stop-color="#050403"/>
        </radialGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ecd290"/>
          <stop offset="50%" stop-color="#d4af61"/>
          <stop offset="100%" stop-color="#b88a35"/>
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="248" fill="url(#bg)" stroke="url(#goldBorder)" stroke-width="14"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="rgba(212,175,97,0.35)" stroke-width="2.5"/>
    </svg>
  `);

  const top = Math.round((512 - (logoMeta.height || 0)) / 2);
  const left = Math.round((512 - (logoMeta.width || 0)) / 2);

  // 3. Composite logo onto the 512x512 badge
  const badge512Buffer = await sharp(circleSvg)
    .composite([{ input: logoBuffer, top, left }])
    .png()
    .toBuffer();

  const publicDir = path.join(ROOT_DIR, 'public');
  const appDir = path.join(ROOT_DIR, 'app');

  // 4. Output various PNG sizes
  await sharp(badge512Buffer).resize(512, 512).toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(badge512Buffer).resize(192, 192).toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(badge512Buffer).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(badge512Buffer).resize(180, 180).toFile(path.join(appDir, 'apple-icon.png'));
  await sharp(badge512Buffer).resize(48, 48).toFile(path.join(publicDir, 'icon-48.png'));
  await sharp(badge512Buffer).resize(32, 32).toFile(path.join(publicDir, 'icon.png'));
  await sharp(badge512Buffer).resize(32, 32).toFile(path.join(appDir, 'icon.png'));

  // 5. Build proper multi-size ICO file containing 32x32 and 16x16 PNG frames
  const png32 = await sharp(badge512Buffer).resize(32, 32).png().toBuffer();
  const png16 = await sharp(badge512Buffer).resize(16, 16).png().toBuffer();

  // ICO header for 2 images
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(2, 4); // Number of images = 2

  // Directory entries (16 bytes each)
  const offset1 = 6 + 16 * 2;
  const offset2 = offset1 + png16.length;

  // Entry 1: 16x16
  const entry1 = Buffer.alloc(16);
  entry1.writeUInt8(16, 0); // Width
  entry1.writeUInt8(16, 1); // Height
  entry1.writeUInt8(0, 2);  // Palette
  entry1.writeUInt8(0, 3);  // Reserved
  entry1.writeUInt16LE(1, 4);  // Color planes
  entry1.writeUInt16LE(32, 6); // Bits per pixel
  entry1.writeUInt32LE(png16.length, 8); // Size of image data
  entry1.writeUInt32LE(offset1, 12);     // Offset of image data

  // Entry 2: 32x32
  const entry2 = Buffer.alloc(16);
  entry2.writeUInt8(32, 0); // Width
  entry2.writeUInt8(32, 1); // Height
  entry2.writeUInt8(0, 2);  // Palette
  entry2.writeUInt8(0, 3);  // Reserved
  entry2.writeUInt16LE(1, 4);  // Color planes
  entry2.writeUInt16LE(32, 6); // Bits per pixel
  entry2.writeUInt32LE(png32.length, 8); // Size of image data
  entry2.writeUInt32LE(offset2, 12);     // Offset of image data

  const icoBuffer = Buffer.concat([header, entry1, entry2, png16, png32]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('✓ Successfully created:');
  console.log('  - public/favicon.ico & app/favicon.ico (Multi-size 16x16 + 32x32 ICO)');
  console.log('  - public/icon.png & app/icon.png (32x32)');
  console.log('  - public/icon-48.png (48x48)');
  console.log('  - public/icon-192.png (192x192)');
  console.log('  - public/icon-512.png (512x512)');
  console.log('  - public/apple-touch-icon.png & app/apple-icon.png (180x180)');
}

buildFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});

