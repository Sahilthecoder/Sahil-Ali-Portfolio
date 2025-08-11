import React from 'react';
import ExperienceHero from '@/features/experience/ExperienceHero';
import { ImpactMetrics } from '@/features/experience/ImpactMetrics';
import { ExperienceList } from '@/features/experience/ExperienceCard';
import { SkillsShowcase } from '@/features/experience/SkillsShowcase';
import Divider from '@/components/ui/Divider';

const Experience: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
          <ExperienceHero />
        </div>
        <Divider />
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ImpactMetrics />
        </div>
        <Divider />
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <ExperienceList />
        </div>
        <Divider />
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <SkillsShowcase />
        </div>
    </div>
  );
};
export default Experience;
