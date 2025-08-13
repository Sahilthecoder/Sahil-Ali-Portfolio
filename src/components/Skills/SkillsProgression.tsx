import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const SkillsProgression = () => {
  const progressions = [
    {
      title: 'HTML / SCSS Focused',
      stats: '50.7% HTML, 25.4% SCSS, 18.6% CSS, 5.3% JS',
      tech: ['HTML5', 'SCSS & CSS3', 'Minimal JS'],
      strengths: [
        'Mastery of semantic HTML',
        'Strong layout & styling skills',
        'Pixel-perfect designs'
      ],
      useCase: 'Static websites, landing pages, portfolio showcases',
      description: 'Foundation builder — You know your fundamentals and can structure clean, accessible markup'
    },
    {
      title: 'JavaScript Dominant',
      stats: '86.7% JS, 8.4% CSS, 3.3% TS, 1.6% HTML',
      tech: ['JavaScript ES6+', 'CSS3', 'TypeScript basics'],
      strengths: [
        'Interactive UI/UX',
        'DOM manipulation',
        'API integrations'
      ],
      useCase: 'Single-page apps, interactive dashboards, feature-rich UIs',
      description: 'Problem solver — You can think in logic, implement interactivity, and handle dynamic data'
    },
    {
      title: 'TypeScript Professional',
      stats: '98% TS, 1.2% HTML, 0.8% Other',
      tech: ['TypeScript', 'React/Next.js', 'Minimal HTML overhead'],
      strengths: [
        'Type safety & scalability',
        'Component-based architecture',
        'Modern development practices'
      ],
      useCase: 'Enterprise-grade apps, production-ready projects, SaaS dashboards',
      description: 'Scalable thinker — You build for maintainability, collaboration, and long-term growth'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          📊 Portfolio Evolution & Skill Progression
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {progressions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {index + 1}️⃣ {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{item.stats}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Tech Stack:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {item.tech.map((tech, i) => (
                          <li key={i} className="text-sm">{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Strengths:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {item.strengths.map((strength, i) => (
                          <li key={i} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Ideal For:</h3>
                      <p className="text-sm">{item.useCase}</p>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <div className="text-sm p-4 bg-muted/50 rounded-lg">
                    <p className="italic">"{item.description}"</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-primary/10 p-6 rounded-xl border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">📈 Key Highlights</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Skill Growth:</strong> Clear transition from static HTML/CSS → Dynamic JS → Scalable TypeScript.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Versatility:</strong> Able to work on projects of any scale — from small static sites to complex apps.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Modern Readiness:</strong> Current stack (TypeScript-heavy) aligns perfectly with 2025 industry standards.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsProgression;
