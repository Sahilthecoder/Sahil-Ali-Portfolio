'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiLock } from 'react-icons/fi';

import certificationsData from '@/data/certifications';
import type { Education } from '@/types/experience.types';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { ThemeCard } from '@/components/ui/ThemeCard';
import LazyImage from '@/components/LazyImage';
import { PasswordModal } from '@/components/ui/PasswordModal';
import { usePasswordProtection } from '@/contexts/PasswordProtectionContext';

type CertificationData = Omit<Education, 'degree'> & {
  credentialUrl?: string;
};
const CertificationsGrid = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { isAuthenticated } = usePasswordProtection();
  
  // Process certifications data
  const certifications = useMemo<CertificationData[]>(() => 
    certificationsData as CertificationData[]
  , [certificationsData]);

  const handleImageClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowPasswordModal(true);
    }
  };

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
                    {isAuthenticated ? (
                      <LazyImage
                        src={cert.imageUrl}
                        alt={`${cert.fieldOfStudy} certificate`}
                        className="w-full h-auto max-h-80 object-contain rounded-lg"
                      />
                    ) : (
                      <div 
                        className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                        onClick={handleImageClick}
                      >
                        <div className="bg-white/10 dark:bg-black/20 p-4 rounded-full mb-3">
                          <FiLock className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Click to view certificate
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Authentication required
                        </p>
                      </div>
                    )}
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
      
      {showPasswordModal && (
        <PasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </AnimatedSection>
  );
};

export default CertificationsGrid;
