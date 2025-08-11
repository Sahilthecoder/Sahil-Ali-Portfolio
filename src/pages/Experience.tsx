import React, { lazy, Suspense } from 'react';
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiTrendingUp,
} from 'react-icons/fi';
import { experiences as workExperiences } from '../data/experience';
import { skills } from '../data/skills';
import { ImpactMetrics } from '../features/experience/ImpactMetrics';
import { SkillsMatrix } from '../features/skills';
import type { Experience } from '../features/experience/ExperienceCard';

// Lazy load components
const ExperienceSection = lazy(() => import('../features/experience/ExperienceSection'));
const ExperienceHeroSection = lazy(() => import('../features/experience/ExperienceHero'));

interface ExperiencePageProps {
  className?: string;
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleError = (event: Event) => {
    if (event instanceof ErrorEvent) {
      setError(event.error?.message ?? 'An unexpected error occurred');
    } else if (event instanceof PromiseRejectionEvent) {
      setError(event.reason?.message ?? 'A promise was rejected');
    } else {
      setError('An unknown error occurred');
    }
    setHasError(true);
  };

  React.useEffect(() => {
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="relative dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/70" />
        <div className="relative z-10 text-center px-4 py-20 max-w-lg mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">{error}</p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
            }}
            className="inline-flex items-center px-8 py-3 rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const Experience: React.FC<ExperiencePageProps> = ({ className = '' }) => {
  // Format experiences data to match Experience type
  const formattedExperiences = workExperiences.map<Experience>((exp) => ({
    id: exp.id,
    role: exp.role,
    company: exp.company,
    period: exp.period,
    description: exp.description || [],
    technologies: exp.technologies || [],
    // Convert string[] achievements to the expected object format
    achievements: (exp.achievements || []).map(achievement => ({
      title: achievement
    })),
    logo: exp.logo || '', // Empty string will trigger text-based fallback in ExperienceCard
    companyUrl: exp.companyUrl || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || undefined,
    isCurrent: exp.isCurrent || false,
    location: exp.location,
  }));

  const impactMetrics = [
    {
      id: '1',
      value: '4+',
      label: 'Years of Experience',
      description: 'Building scalable web applications',
      icon: <FiBriefcase className="h-6 w-6" />,
    },
    {
      id: '2',
      value: '15+',
      label: 'Projects Completed',
      description: 'For clients across various industries',
      icon: <FiCode className="h-6 w-6" />,
    },
    {
      id: '3',
      value: '20+',
      label: 'Technologies',
description: 'In my development stack',
      icon: <FiTrendingUp className="h-6 w-6" />,
    },
    {
      id: '4',
      value: '8+',
      label: 'Awards Won',
      description: 'For technical excellence',
      icon: <FiAward className="h-6 w-6" />,
    },
    {
      id: '5',
      value: '100%',
      label: 'Client Satisfaction',
      description: 'Consistently positive feedback',
      icon: <FiBookOpen className="h-6 w-6" />,
    },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground ${className}`}>
      <Suspense
        fallback={
          <div className="relative dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/70" />
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 relative">
              <FiBriefcase className="absolute inset-0 h-8 w-8 m-auto" />
            </div>
          </div>
        }
      >
        <div className="relative">
          <ErrorBoundary>
            <ExperienceHeroSection />
          </ErrorBoundary>

          <main className="container mx-auto px-4 max-w-7xl">
            <section className="pt-8 pb-12">
              <ImpactMetrics
                metrics={impactMetrics}
                title="By The Numbers"
                description="Key metrics that highlight my professional journey and impact"
              />
            </section>

            <section id="experience-timeline" className="py-8 border-t border-border/50">
              <ErrorBoundary>
                <ExperienceSection
                  experiences={formattedExperiences}
                  title="Work Experience"
                  subtitle="My professional work history and key contributions"
                  showAchievements={false}
                />
              </ErrorBoundary>
            </section>

            <section id="experience-timeline" className="py-8 border-t border-border/50">
              <ErrorBoundary>
                <SkillsMatrix
                  skills={skills}
                  title="Technical Skills"
                  subtitle="A visual representation of my technical expertise across various domains"
                />
              </ErrorBoundary>
            </section>
          </main>
        </div>
      </Suspense>
    </div>
  );
};

export default Experience;
