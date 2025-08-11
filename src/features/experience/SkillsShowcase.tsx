import React from 'react';
import { SkillsMatrix } from '@/features/skills';
import { skills } from '@/data/skills';

export const SkillsShowcase: React.FC = () => {
  return (
    <SkillsMatrix
      skills={skills}
      title="Technical Skills"
      subtitle="A visual representation of my technical expertise across various domains"
    />
  );
};
