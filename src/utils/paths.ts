// Utility function to handle GitHub Pages base path
export const getPath = (path: string): string => {
  // In development, use the path as is
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // In production, prepend the base path
  const basePath = '/Sahil-Ali-Portfolio';
  
  // Ensure there's exactly one slash between basePath and path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
};
