import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import https from 'https';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create directories if they don't exist
const dirs = [
  'public/images/portraits',
  'public/images/placeholders'
];

dirs.forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Placeholder images to download
const images = [
  {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
    dest: 'public/images/portraits/portrait1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603415526960-f8fbdc7a2f5b?w=400&h=400&fit=crop&crop=faces',
    dest: 'public/images/portraits/portrait2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    dest: 'public/images/placeholders/code.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1543269664-7e6d8a8352ac?w=800&h=600&fit=crop',
    dest: 'public/images/placeholders/workspace.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    dest: 'public/images/placeholders/default.jpg'
  }
];

// Function to download and optimize an image
async function downloadAndOptimizeImage(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url}...`);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`Failed to download ${url}: Status ${response.statusCode}`);
        return reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      
      response.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          
          // Optimize the image using sharp
          const optimized = await sharp(buffer)
            .jpeg({ quality: 80, progressive: true })
            .toBuffer();
          
          // Save the optimized image
          writeFileSync(dest, optimized);
          console.log(`Saved ${dest}`);
          resolve(dest);
        } catch (error) {
          console.error(`Error processing ${dest}:`, error);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error(`Error downloading ${url}:`, error);
      reject(error);
    });
  });
}

// Download all images
async function downloadAll() {
  console.log('Starting to download placeholder images...');
  
  try {
    for (const image of images) {
      await downloadAndOptimizeImage(image.url, image.dest);
    }
    console.log('All images downloaded and optimized successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

// Create a symlink for the default placeholder
downloadAll().then(async () => {
  try {
    // Create a symlink for the default placeholder
    const defaultPortrait = join(__dirname, '../public/images/portraits/portrait1.jpg');
    const placeholderDest = join(__dirname, '../public/images/portraits/placeholder.jpg');
    
    if (existsSync(defaultPortrait) && !existsSync(placeholderDest)) {
      // Copy the file instead of creating a symlink for better compatibility
      const defaultImage = await sharp(defaultPortrait).toBuffer();
      await sharp(defaultImage).toFile(placeholderDest);
      console.log('Created placeholder.jpg symlink');
    }
  } catch (error) {
    console.error('Error creating symlink:', error);
  }
});
