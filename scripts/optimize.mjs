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
  
  try {
    let pipeline;
    try {
      pipeline = sharp(inputPath);
    } catch (error) {
      console.warn(`Skipping unsupported image format: ${inputPath}`);
      return null;
    }
    
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
  } catch (error) {
    console.warn(`Error processing ${inputPath}:`, error.message);
    return null;
  }
}

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  const filename = path.basename(file, ext);
  const relativePath = path.relative(IMAGE_DIR, path.dirname(file));
  
  // Skip unsupported files
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    console.warn(`Skipping unsupported file type: ${file}`);
    return null;
  }
  
  try {
    // Create output directory structure
    const outputDir = path.join(process.cwd(), OUTPUT_DIR, relativePath);
    await ensureDir(outputDir);
    
    // Process original size
    const outputPath = path.join(outputDir, `${filename}.webp`);
    const result = await optimizeImage(file, outputPath);
    
    // Skip if optimization failed
    if (!result) {
      return null;
    }
    
    // Process responsive sizes
    const responsiveResults = [];
    for (const width of WIDTHS) {
      const responsiveOutputPath = path.join(outputDir, `${filename}-${width}w.webp`);
      await optimizeImage(file, responsiveOutputPath, width);
      responsiveResults.push({
        width,
        path: path.relative(process.cwd(), responsiveOutputPath)
      });
    }
    
    console.log(`Processed: ${file}`);
    
    return {
      original: path.relative(process.cwd(), file),
      optimized: path.relative(process.cwd(), outputPath),
      responsive: responsiveResults
    };
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('Starting image optimization...');
    
    // Find all image files
    const files = await glob(`${IMAGE_DIR}/**/*.{jpg,jpeg,png,webp}`, { nodir: true });
    
    console.log(`Found ${files.length} images to process`);
    
    // Process all images in parallel
    const results = (await Promise.all(files.map(processImage))).filter(Boolean);
    
    if (results.length === 0) {
      console.warn('No images were processed successfully');
      return;
    }
    
    // Generate a manifest file with optimized image references
    const manifest = {
      generated: new Date().toISOString(),
      images: results.map(result => ({
        original: result.original,
        optimized: result.optimized,
        responsive: result.responsive
      }))
    };
    
    console.log(`Successfully processed ${results.length} of ${files.length} images`);
    if (results.length < files.length) {
      console.warn(`Skipped ${files.length - results.length} files due to errors`);
    }
    
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
