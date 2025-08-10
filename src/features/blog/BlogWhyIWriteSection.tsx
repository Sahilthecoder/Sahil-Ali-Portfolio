import React from 'react';
import { FiBookOpen, FiTool, FiZap } from 'react-icons/fi';

export const BlogWhyIWriteSection = () => (
  <section className="py-12 md:py-16 bg-background">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="bg-card rounded-xl p-8 md:p-10 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-foreground">Why I Write</h2>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            I believe in the power of shared knowledge. Through my writing, I aim to bridge the gap between complex technical concepts and practical, actionable insights.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              <div key={index} className="bg-muted/30 rounded-lg p-5 border border-border">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <p className="text-muted-foreground">
            Whether you&apos;re a data professional, business leader, or tech enthusiast, I hope my writing helps you on your journey. Let&apos;s learn and grow together in this exciting field of data and AI.
          </p>
        </div>
      </div>
    </div>
  </section>
);
