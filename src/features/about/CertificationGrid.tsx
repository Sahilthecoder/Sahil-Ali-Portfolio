'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';

import certificationsData from '@/data/certifications';
import type { Education } from '@/types/experience.types';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { ThemeCard } from '@/components/ui/ThemeCard';
import LazyImage from '@/components/LazyImage';


type CertificationData = Omit<Education, 'degree'> & {
  credentialUrl?: string;
};
const CertificationsGrid = () => {
  // Process certifications data
  const certifications = useMemo<CertificationData[]>(
    () => certificationsData as CertificationData[],
    [certificationsData]
  );

  return (
    <AnimatedSection className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Certifications"
          subtitle="Professional credentials and achievements"
          className="mb-8 sm:mb-10"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ThemeCard className="h-full" variant="elevated">
                {cert.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-lg relative group">
                    <a 
                      href={cert.credentialUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <LazyImage
                        src={cert.imageUrl}
                        alt={`${cert.fieldOfStudy} certificate`}
                        className="w-full h-64 object-cover rounded-lg hover:opacity-90 transition-opacity duration-200"
                      />
                    </a>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{cert.fieldOfStudy}</h3>
                      <p className="text-sm text-muted-foreground">{cert.institution}</p>
                    </div>
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <FiAward className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Issued:</span>
                      <span>{cert.period?.split('–')[0]?.trim() || 'N/A'}</span>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <FiExternalLink className="mr-1.5 h-4 w-4" />
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              </ThemeCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CertificationsGrid;
