'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import LazyImage from '@/components/LazyImage';

import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { ThemeCard } from '@/components/ui/ThemeCard';
import certificationsData from '@/data/certifications';

type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  imageUrl?: string;
  tags: string[];
};

const CertificationsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const certifications: Certification[] = certificationsData.map((cert) => ({
    id: cert.id,
    title: cert.fieldOfStudy || 'Professional Certification',
    issuer: cert.institution,
    issueDate: cert.period?.split('–')[0]?.trim() || '',
    credentialUrl: cert.institutionUrl,
    imageUrl: cert.imageUrl || '/images/certifications/default-cert.jpg',
    tags: ['professional', 'certification', cert.fieldOfStudy?.toLowerCase().includes('warehouse') ? 'warehouse' : '']
      .filter(Boolean) as string[]
  }));

  const allTags = ['all', ...new Set(certifications.flatMap(cert => cert.tags))];
  const filteredCerts = activeFilter === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.tags.includes(activeFilter));

  return (
    <AnimatedSection className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Certifications"
          subtitle="Professional credentials and achievements"
        />

        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(tag === 'all' ? 'all' : tag)}
              className="capitalize"
            >
              {tag.replace('-', ' ')}
            </Button>
          ))}
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCerts.map(cert => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ThemeCard className="h-full" variant="elevated">
                {cert.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <LazyImage
                      src={cert.imageUrl}
                      alt={`${cert.title} certificate`}
                      className="w-full h-auto max-h-80 object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <FiAward className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Issued:</span>
                      <span>April 2022</span>
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

        {filteredCerts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <FiAward className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-2 text-lg font-medium">No certifications found</h3>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setActiveFilter('all')}
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default CertificationsGrid;
