import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const SRC_DIR = fs.existsSync(path.join(ROOT_DIR, 'assets-src'))
  ? path.join(ROOT_DIR, 'assets-src')
  : path.join(ROOT_DIR, 'assets');

const OUT_DIR = path.join(ROOT_DIR, 'public', 'images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Asset Mapping
const ASSET_MAP = [
  { match: /slider1\.webp$/i, name: 'hero-main' },
  { match: /Golden[\s_]?Mehndi[\s_]?Wedding[\s_]?Handclasp/i, name: 'hero-hands' },
  { match: /Golden[\s_]?Bridal[\s_]?Jeweller?y[\s_]?Still[\s_]?Life/i, name: 'serve-pakistan' },
  { match: /Warm[\s_]?Family[\s_]?Moment[\s_]?on[\s_]?the[\s_]?Sofa-3/i, name: 'mosaic-families' },
  { match: /Golden[\s_]?Mehndi[\s_]?Hands[\s_]?in[\s_]?Festive[\s_]?Glow/i, name: 'mosaic-mehndi' },
  { match: /Golden[\s_]?Ceremony[\s_]?Tray[\s_]?with[\s_]?Roses[\s_]?and[\s_]?Dates/i, name: 'mosaic-nikah', squareCrop: true },
  { match: /A[\s_]?Tender[\s_]?Ceremonial[\s_]?Blessing/i, name: 'mosaic-blessing' },
  { match: /Opulent[\s_]?Golden[\s_]?Candlelit[\s_]?Wedding[\s_]?Hall/i, name: 'mosaic-venue' },
  { match: /Golden[\s_-]?Hour[\s_]?Flight[\s_]?Reflections/i, name: 'serve-overseas' },
  { match: /Golden[\s_]?Tea[\s_]?Moment[\s_]?by[\s_]?the[\s_]?Lace[\s_]?Window/i, name: 'serve-second-marriage' },
  { match: /Elegant[\s_]?Night[\s_]?Desk[\s_]?with[\s_]?City[\s_]?Views/i, name: 'serve-professionals' },
  { match: /Luxurious[\s_]?Warmly[\s_]?Lit[\s_]?Executive[\s_]?Office/i, name: 'visit-office' },
  { match: /Golden[\s_]?Dust[\s_]?on[\s_]?Black/i, name: 'fx-gold-dust' },
  { match: /Golden[\s_]?Silk[\s_]?Wave[\s_]?on[\s_]?Black/i, name: 'fx-gold-wave' },
  { match: /Luminous[\s_]?Gold[\s_]?Ribbon[\s_]?on[\s_]?Black/i, name: 'fx-gold-ribbon' },
  { match: /aura-post-AU-049-urdu/i, name: 'sample-post-au-049' },
  { match: /aura-reel-AU-049-urdu-cover/i, name: 'sample-reel-cover-au-049' },
  { match: /^logo\.png$/i, name: 'logo', isLogo: true },
];

const FORBIDDEN_PATTERNS = [
  /Golden[\s_]?Bridal[\s_]?Jewelr?y[\s_]?and[\s_]?Candlelit[\s_]?Elegance/i,
];

const TARGET_WIDTHS = [640, 1080, 1600, 2400];

async function processAll() {
  console.log(`Reading source images from: ${SRC_DIR}`);
  let files = fs.readdirSync(SRC_DIR);

  // Also check root for slider1.webp if not found in SRC_DIR
  const rootSlider = path.join(ROOT_DIR, 'slider1.webp');
  if (fs.existsSync(rootSlider) && !files.some(f => f.toLowerCase().includes('slider1'))) {
    files.push('slider1.webp');
  }

  // Copy MP4 reel videos if present
  const videoFiles = files.filter(f => f.toLowerCase().endsWith('.mp4'));
  const videosOutDir = path.join(ROOT_DIR, 'public', 'videos');
  if (videoFiles.length > 0 && !fs.existsSync(videosOutDir)) {
    fs.mkdirSync(videosOutDir, { recursive: true });
  }
  for (const vf of videoFiles) {
    fs.copyFileSync(path.join(SRC_DIR, vf), path.join(videosOutDir, vf));
    console.log(`[INFO] Copied video asset: ${vf} -> public/videos/`);
  }

  for (const file of files) {
    // Check forbidden
    if (FORBIDDEN_PATTERNS.some(p => p.test(file))) {
      console.warn(`[WARNING] Skipping forbidden asset: ${file} (contains religious text/props)`);
      continue;
    }

    const mapItem = ASSET_MAP.find(m => m.match.test(file));
    if (!mapItem) {
      console.log(`[INFO] No explicit mapping for: ${file}, skipping.`);
      continue;
    }

    const filePath = file === 'slider1.webp' && fs.existsSync(rootSlider)
      ? rootSlider
      : path.join(SRC_DIR, file);

    console.log(`\nProcessing: ${file} -> ${mapItem.name}`);

    try {
      let imageBuffer = fs.readFileSync(filePath);
      let instance = sharp(imageBuffer);
      const metadata = await instance.metadata();
      const origWidth = metadata.width || 1200;
      const origHeight = metadata.height || 800;

      // Handle 1:1 square crop for mosaic-nikah if configured
      if (mapItem.squareCrop) {
        const size = Math.min(origWidth, origHeight, 1239);
        instance = instance.extract({
          left: Math.floor((origWidth - size) / 2),
          top: Math.floor((origHeight - size) / 2),
          width: size,
          height: size,
        });
        imageBuffer = await instance.toBuffer();
      }

      // Generate blur thumbnail (width: 32)
      const blurPath = path.join(OUT_DIR, `${mapItem.name}-blur.webp`);
      await sharp(imageBuffer)
        .resize(32)
        .webp({ quality: 20 })
        .toFile(blurPath);
      console.log(`  Created: ${mapItem.name}-blur.webp`);

      // Generate responsive sizes in AVIF and WebP
      for (const w of TARGET_WIDTHS) {
        if (w > origWidth && w !== 640) {
          continue; // skip widths above source
        }

        const resizeWidth = Math.min(w, origWidth);

        // WebP
        const webpPath = path.join(OUT_DIR, `${mapItem.name}-${w}.webp`);
        await sharp(imageBuffer)
          .resize(resizeWidth)
          .webp({ quality: 82, effort: 4 })
          .toFile(webpPath);

        // AVIF
        const avifPath = path.join(OUT_DIR, `${mapItem.name}-${w}.avif`);
        await sharp(imageBuffer)
          .resize(resizeWidth)
          .avif({ quality: 78, effort: 4 })
          .toFile(avifPath);

        console.log(`  Created: ${mapItem.name}-${w}.webp & .avif`);
      }

      // Also create base fallback .webp
      const baseWebp = path.join(OUT_DIR, `${mapItem.name}.webp`);
      await sharp(imageBuffer)
        .webp({ quality: 85 })
        .toFile(baseWebp);
      console.log(`  Created base: ${mapItem.name}.webp`);

      if (mapItem.isLogo) {
        fs.copyFileSync(filePath, path.join(OUT_DIR, 'logo.png'));
        fs.copyFileSync(filePath, path.join(OUT_DIR, 'aura-logo-transparent.png'));
        fs.copyFileSync(filePath, path.join(ROOT_DIR, 'public', 'logo.png'));
        console.log(`  Copied logo.png and aura-logo-transparent.png`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log('\nAsset processing complete.');
}

processAll();
