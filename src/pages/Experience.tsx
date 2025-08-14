import React from 'react';
import ExperienceHero from '@/features/experience/ExperienceHero';
import { ImpactMetrics } from '@/features/experience/ImpactMetrics';
import { ExperienceList } from '@/features/experience/ExperienceCard';
import { SkillsShowcase } from '@/features/experience/SkillsShowcase';
import Divider from '@/components/ui/Divider';

const Experience: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="overflow-hidden">
        <ExperienceHero />
      </div>
      
      <Divider />
      
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        <ImpactMetrics />
      </div>
      
      <Divider />
      
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            Professional Journey
          </h2>
          <ExperienceList />
        </div>
      </div>
      
      <Divider />
      
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        <SkillsShowcase />
      </div>
    </div>
  );
};
export default Experience;
