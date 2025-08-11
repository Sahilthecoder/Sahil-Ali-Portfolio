import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FiAward, FiCalendar, FiExternalLink, FiMapPin } from 'react-icons/fi';

import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { ThemeCard } from '@/components/ui/ThemeCard';
import educationData from '@/data/educationData';

interface EducationItem {
  id: string;
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  degree?: string;
  gpa?: string;
  achievements?: string[];
  logo?: string;
  institutionUrl?: string;
}

interface EducationSectionProps {
  education?: EducationItem[];
  title?: string;
  className?: string;
  useDefaultData?: boolean;
}

// Import the Education type from experience.types
import type { Education } from '@/types/experience.types';

// Alias the Education type for clarity
interface EducationDataItem extends Omit<Education, 'description'> {
  description: string | string[];
  gpa?: string;
  achievements?: string[];
  logo?: string;
}

// Map the education data to match the EducationItem interface
const mapEducationData = (data: EducationDataItem[]): EducationItem[] => {
  return data.map((edu) => {
    // Extract start and end years from the period string
    const periodMatch = edu.period.match(/(\d{4})/g);
    const startDate = periodMatch ? periodMatch[0] : '';
    const endDate = periodMatch && periodMatch[1] ? periodMatch[1] : 'Present';

    // Handle description which could be a string or array of strings
    const description = Array.isArray(edu.description) ? edu.description : [edu.description];

    // Create the base education item
    const educationItem: EducationItem = {
      id: edu.id,
      institution: edu.institution,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: startDate,
      endDate: endDate,
      location: edu.location || '',
      description: description as string[],
    };

    // Add optional fields if they exist
    if (edu.degree) educationItem.degree = edu.degree;
    if (edu.institutionUrl) educationItem.institutionUrl = edu.institutionUrl;
    if ('gpa' in edu) educationItem.gpa = edu.gpa;
    if ('achievements' in edu) educationItem.achievements = edu.achievements;
    if ('logo' in edu) educationItem.logo = edu.logo;

    return educationItem;
  });
};

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  title = 'Education',
  className = '',
  useDefaultData = true,
}) => {
  // Use provided education data or default to the imported data
  const displayEducation = education || (useDefaultData ? mapEducationData(educationData) : []);
  const ref = useRef<HTMLDivElement>(null);

  if (!displayEducation || displayEducation.length === 0) {
    return null;
  }

  return (
    <AnimatedSection className={`py-10 sm:py-14 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle="My academic background and professional certifications"
          className="mb-8 sm:mb-10"
        />

        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {displayEducation.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  },
                },
              }}
              className="h-full"
            >
              <motion.div
                className="h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                }}
              >
                <ThemeCard 
                  className="h-full flex flex-col bg-background/50 
                  border border-border/20 
                  shadow-[0_4px_0px_0px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.05)] 
                  dark:shadow-[0_4px_0px_0px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2)]
                  hover:shadow-[0_8px_0px_0px_rgba(59,130,246,0.4),0_4px_12px_rgba(59,130,246,0.1)] 
                  dark:hover:shadow-[0_8px_0px_0px_rgba(59,130,246,0.6),0_4px_12px_rgba(59,130,246,0.2)]
                  transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01]" 
                  variant="outline" 
                  hoverEffect="grow"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                        <h4 className="text-md font-medium text-muted-foreground">{edu.institution}</h4>
                      </div>
                      {edu.institutionUrl && (
                        <a
                          href={edu.institutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Visit ${edu.institution} website`}
                        >
                          <FiExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <FiAward className="h-4 w-4 mr-2 text-primary" />
                        <span>{edu.fieldOfStudy}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <FiCalendar className="h-4 w-4 mr-2 text-primary" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {edu.location && (
                        <div className="flex items-center text-muted-foreground">
                          <FiMapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        {Array.isArray(edu.description) ? (
                          <ul className="space-y-2">
                            {edu.description.map((desc, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{edu.description}</p>
                        )}
                      </div>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">
                          Key Achievements:
                        </h5>
                        <ul className="space-y-1.5 text-sm">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {edu.gpa && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm font-medium text-muted-foreground">
                          GPA: <span className="text-foreground">{edu.gpa}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </ThemeCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default EducationSection;
