import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

const IMAGE_DIR = 'public/images';
const OUTPUT_DIR = 'public/optimized-images';
const QUALITY = 80;
const WIDTHS = [640, 768, 1024, 1280, 1536];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function optimizeImage(inputPath, outputPath, width) {
  const ext = path.extname(inputPath).toLowerCase();
  const isWebP = ext === '.webp';
  
  let pipeline = sharp(inputPath);
  
  // Resize if width is specified
  if (width) {
    pipeline = pipeline.resize(width);
  }
  
  // Convert to WebP if not already
  if (!isWebP) {
    return pipeline.webp({ quality: QUALITY }).toFile(outputPath);
  }
  
  // If it's already WebP, just optimize it
  return pipeline.toFile(outputPath);
}

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  const filename = path.basename(file, ext);
  const relativePath = path.relative(IMAGE_DIR, path.dirname(file));
  
  // Create output directory structure
  const outputDir = path.join(process.cwd(), OUTPUT_DIR, relativePath);
  await ensureDir(outputDir);
  
  // Process original size
  const outputPath = path.join(outputDir, `${filename}.webp`);
  await optimizeImage(file, outputPath);
  
  // Process responsive sizes
  for (const width of WIDTHS) {
    const responsiveOutputPath = path.join(outputDir, `${filename}-${width}w.webp`);
    await optimizeImage(file, responsiveOutputPath, width);
  }
  
  console.log(`Processed: ${file}`);
  
  // Return the original and optimized paths for reference
  return {
    original: path.relative(process.cwd(), file),
    optimized: path.relative(process.cwd(), outputPath),
    responsive: WIDTHS.map(width => ({
      width,
      path: path.relative(process.cwd(), path.join(outputDir, `${filename}-${width}w.webp`))
    }))
  };
}

async function main() {
  try {
    console.log('Starting image optimization...');
    
    // Find all image files
    const files = await glob(`${IMAGE_DIR}/**/*.{jpg,jpeg,png,webp}`, { nodir: true });
    
    console.log(`Found ${files.length} images to process`);
    
    // Process all images in parallel
    const results = await Promise.all(files.map(processImage));
    
    // Generate a manifest file with optimized image references
    const manifest = {
      generated: new Date().toISOString(),
      images: results.map(result => ({
        original: result.original,
        optimized: result.optimized,
        responsive: result.responsive
      }))
    };
    
    // Write manifest file
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('Image optimization complete!');
    console.log(`Processed ${results.length} images`);
    
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

main();
