// Utility function to handle paths in the application
// With HashRouter, we don't need to handle base paths
export const getPath = (path: string): string => {
  // Remove any leading slashes to prevent double slashes
  const cleanPath = path.replace(/^\/+/, '');
  // For HashRouter, we don't need a leading slash
  return cleanPath;
};
