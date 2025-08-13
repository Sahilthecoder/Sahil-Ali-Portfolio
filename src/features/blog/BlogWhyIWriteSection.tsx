import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiTool, FiZap } from 'react-icons/fi';

export const BlogWhyIWriteSection = () => (
  <section className="py-10 sm:py-14 bg-background">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div 
        className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border hover:shadow-md transition-all duration-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-5">
          <div className="w-1 h-7 bg-primary rounded-full mr-3"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Why I Write</h2>
        </div>
        
        <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-5 sm:mb-6">
            I believe in the power of shared knowledge. Through my writing, I aim to bridge the gap between complex technical concepts and practical, actionable insights.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {[
              {
                icon: <FiBookOpen className="w-8 h-8 text-primary" />,
                title: 'Demystify',
                description: 'Breaking down complex data concepts into understandable insights'
              },
              {
                icon: <FiTool className="w-8 h-8 text-primary" />,
                title: 'Empower',
                description: 'Providing practical tools and techniques for real-world challenges'
              },
              {
                icon: <FiZap className="w-8 h-8 text-primary" />,
                title: 'Inspire',
                description: 'Encouraging continuous learning and growth in data & AI'
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-muted/30 rounded-lg p-4 sm:p-5 border border-border hover:shadow-sm transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <p className="text-muted-foreground mt-2 sm:mt-3">
            Whether you&apos;re a data professional, business leader, or tech enthusiast, I hope my writing helps you on your journey. Let&apos;s learn and grow together in this exciting field of data and AI.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);
