import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BASE_URL = 'https://sahilthecoder.github.io/Sahil_Ali-Portfolio';
const PAGES = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.9', changefreq: 'weekly' },
  { url: '/projects', priority: '0.9', changefreq: 'weekly' },
  { url: '/experience', priority: '0.9', changefreq: 'weekly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  // Add more pages as needed
];

// Current date in ISO format
const currentDate = new Date().toISOString();

// Generate sitemap XML
function generateSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${PAGES.map(page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link 
      rel="alternate" 
      hreflang="en" 
      href="${BASE_URL}${page.url}" />
    <xhtml:link 
      rel="alternate" 
      hreflang="x-default" 
      href="${BASE_URL}${page.url}" />
  </url>`).join('')}
</urlset>`;
}

// Main function
async function main() {
  try {
    const sitemap = generateSitemap();
    const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
    
    // Ensure directory exists
    await mkdir(dirname(outputPath), { recursive: true });
    
    // Write sitemap to file
    await writeFile(outputPath, sitemap, 'utf8');
    
    console.log('Sitemap generated successfully!');
    console.log(`Location: ${outputPath}`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
main();
