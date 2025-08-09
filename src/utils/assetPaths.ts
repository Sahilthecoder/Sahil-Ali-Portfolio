/**
 * Utility function to get the correct path for static assets
 * Handles both development and production environments
 */

export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In production, assets are served from the base URL
  if (import.meta.env.PROD) {
    return `/${cleanPath}`;
  }
  
  // In development, use the path as is
  return `/${cleanPath}`;
};

// Project image paths
export const projectImages = {
  zomato: {
    cover: '/images/projects/Zomto_Project1/Project1_Cover.webp',
    // Add other images for this project
  },
  bansal: {
    cover: '/images/projects/Bansal_Project2/Project2_Cover.webp',
    // Add other images for this project
  },
  retail: {
    cover: '/images/projects/RetailCashFlow_Project4/Project4_Cover.webp',
    // Add other images for this project
  },
  // Add other projects
};

// Other static assets
export const assets = {
  profile: '/images/profile/profile.webp',
  favicon: '/favicon/android-chrome-192x192.png',
  // Add other static assets
};
