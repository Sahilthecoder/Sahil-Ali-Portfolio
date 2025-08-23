import { WorkExperience } from '@/types/experience.types';

export const calculateTotalExperience = (experiences: WorkExperience[]): number => {
  const now = new Date();
  let totalMonths = 0;

  experiences.forEach(exp => {
    // Skip if startDate is not defined
    if (!exp.startDate) return;
    
    const startDate = new Date(exp.startDate);
    const endDate = exp.endDate ? new Date(exp.endDate) : now;
    
    // Calculate months between start and end dates
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (endDate.getMonth() - startDate.getMonth()) + 1;
    
    // Add to total, ensuring we don't count any negative months (just in case)
    totalMonths += Math.max(0, months);
  });

  // Convert months to years (with 1 decimal place)
  const years = Math.round((totalMonths / 12) * 10) / 10;
  return years;
};

export const getTotalProjects = (): number => {
  // This would come from your projects data
  return 20; // Update this with actual project count
};

export const getTotalClients = (): number => {
  // This would come from your client data
  return 15; // Update this with actual client count
};

export const getTotalTechnologies = (): number => {
  // This would come from your skills data
  return 25; // Update this with actual technology count
};
