import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { useBlogAnimation } from './hooks/useBlogAnimation';

export const BlogPortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Interactive dashboard for real-time business insights using React and D3.js',
      tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      projectUrl: '#',
    },
    {
      id: 2,
      title: 'Inventory Optimization System',
      description: 'Machine learning model to predict optimal stock levels and reduce waste',
      tags: ['Python', 'Scikit-learn', 'FastAPI', 'PostgreSQL'],
      projectUrl: '#',
    },
    {
      id: 3,
      title: 'Data Visualization Library',
      description: 'Custom React components for creating beautiful, interactive data visualizations',
      tags: ['TypeScript', 'React', 'D3.js', 'Storybook'],
      projectUrl: '#',
    },
  ];

  const { fadeInUp, staggerContainer, hoverScale } = useBlogAnimation();

  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Featured Projects
        </motion.h2>
        <motion.div 
          className="space-y-4 sm:space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="group relative p-4 sm:p-5 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors duration-200"
              variants={fadeInUp}
              whileHover={hoverScale}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 flex items-center">
                    {project.title}
                    <a 
                      href={project.projectUrl}
                      className="ml-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`View ${project.title}`}
                    >
                      <FiExternalLink size={18} />
                    </a>
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm sm:text-base">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-accent/30 text-foreground/80 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
