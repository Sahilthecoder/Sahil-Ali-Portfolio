// Utility function to handle paths in the application
// Note: The base path is now handled by BrowserRouter's basename
// This function is kept for consistency and future use
// but doesn't add the base path to prevent duplication
export const getPath = (path: string): string => {
  // Ensure the path starts with a single slash
  return path.startsWith('/') ? path : `/${path}`;
};
