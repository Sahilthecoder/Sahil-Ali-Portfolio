import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { get } from 'https';

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

// Function to download a file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url}...`);
    
    const file = createWriteStream(dest);
    
    get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`Failed to download ${url}: Status ${response.statusCode}`);
        return reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${dest}`);
        resolve(dest);
      });
      
      file.on('error', (err) => {
        console.error(`Error saving ${dest}:`, err);
        reject(err);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err);
      reject(err);
    });
  });
}

// Images to download
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

// Download all images
async function downloadAll() {
  console.log('Starting to download placeholder images...');
  
  try {
    for (const image of images) {
      await downloadFile(image.url, image.dest);
    }
    
    // Create a copy of the first portrait as the default placeholder
    const defaultPortrait = 'public/images/portraits/portrait1.jpg';
    const placeholderDest = 'public/images/portraits/placeholder.jpg';
    
    if (existsSync(defaultPortrait) && !existsSync(placeholderDest)) {
      const { default: fs } = await import('fs/promises');
      await fs.copyFile(defaultPortrait, placeholderDest);
      console.log('Created placeholder.jpg');
    }
    
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

// Run the download
downloadAll();
