import AboutHero from '@/features/about/AboutHero';
import PersonalStory from '@/features/about/PersonalStory';
import SkillShowCase from '@/features/about/SkillShowCase';
import CertificationGrid from '@/features/about/CertificationGrid';
import EducationSection from '@/features/about/EducationSection';
import AboutSection from '@/features/about/AboutSection';
import Divider from '@/components/ui/Divider';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <Divider />
      <PersonalStory />
      <Divider />
      <SkillShowCase />
      <Divider />
      <CertificationGrid />
      <Divider />
      <EducationSection />
      <Divider />
      <AboutSection />
    </div>
  );
};

export default About;
