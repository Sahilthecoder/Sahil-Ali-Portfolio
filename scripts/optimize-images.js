const { promisify } = require('util');
const { resolve } = require('path');
const { readdir, mkdir, stat } = require('fs').promises;
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const CONFIG = {
  quality: 80,
  maxWidth: 2000,
  srcDir: resolve(__dirname, '../public'),
  distDir: resolve(__dirname, '../public/optimized'),
  formats: [
    { suffix: '@2x', scale: 2 },
    { suffix: '', scale: 1 },
  ],
};

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else if (['.jpg', '.jpeg', '.png'].some(ext => dirent.name.toLowerCase().endsWith(ext))) {
      yield res;
    }
  }
}

async function processImage(filePath) {
  const relativePath = filePath.replace(CONFIG.srcDir, '').replace(/\\/g, '/');
  const fileName = relativePath.split('/').pop();
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  const ext = fileName.split('.').pop().toLowerCase();
  
  for (const { suffix, scale } of CONFIG.formats) {
    const outputPath = resolve(
      CONFIG.distDir,
      relativePath
        .split('/')
        .map((part, i, arr) => (i === arr.length - 1 ? `${baseName}${suffix}.webp` : part))
        .join('/')
    );

    await mkdir(outputPath.replace(/\/[^\/]+$/, ''), { recursive: true });
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    const width = Math.min(metadata.width * scale, CONFIG.maxWidth);
    
    await image
      .resize(width, Math.round((width / metadata.width) * metadata.height), {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);
      
    console.log(`Created: ${outputPath}`);
  }
}

async function optimizeExistingWebp() {
  await imagemin([`${CONFIG.distDir}/**/*.webp`], {
    destination: CONFIG.distDir,
    plugins: [
      imageminWebp({
        quality: CONFIG.quality,
        method: 6,
      }),
    ],
  });
}

async function main() {
  console.log('Starting image optimization...');
  
  for await (const file of getFiles(CONFIG.srcDir)) {
    try {
      await processImage(file);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  await optimizeExistingWebp();
  console.log('Image optimization complete!');
}

main().catch(console.error);
