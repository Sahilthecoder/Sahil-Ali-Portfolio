import React from 'react';
import Divider from '@/components/ui/Divider';
import HomeHeroSection from '../features/home/HomeHeroSection';
import AboutMeSection from '../features/home/AboutMeSection';
import SkillsSection from '../features/home/SkillSection';
import StatsSection from '../features/home/StatsSection';
import ProjectSection from '../features/home/ProjectSection';
import TestimonialSection from '../features/home/TestimonialSection';
import ContactSection from '../features/home/ContactSection';

const Home: React.FC = () => {
  return (
    <main className="w-full" aria-label="Home page main content">
      <HomeHeroSection />
      <Divider />
      <AboutMeSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <StatsSection />
      <Divider />
      <ProjectSection />
      <Divider />
      <TestimonialSection />
      <Divider />
      <ContactSection />
    </main>
  );
};

export default Home;
