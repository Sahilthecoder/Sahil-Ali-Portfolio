import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink, FiLinkedin, FiGithub } from 'react-icons/fi';

const MiniBio = () => (
  <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start space-x-4">
      <img
        src="/Sahil-Ali-Portfolio/images/profile/profile-300w.webp"
        alt="Sahil Ali"
        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
        width={64}
        height={64}
        srcSet="/Sahil-Ali-Portfolio/images/profile/profile-300w.webp 300w"
        sizes="(max-width: 640px) 150px, 300px"
      />
      <div>
        <h3 className="font-medium text-foreground">Sahil Ali</h3>
        <p className="text-sm text-muted-foreground">Data Analyst & AI Generalist</p>
      </div>
    </div>
    <p className="mt-4 text-sm text-muted-foreground">
      Helping businesses make data-driven decisions through analytics and AI solutions.
    </p>
    <a
      href="https://linkedin.com/in/sahil-ali-714867242/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
    >
      Connect on LinkedIn <FiExternalLink className="ml-1.5" size={14} />
    </a>
  </div>
);

const QuickLinks = () => (
  <div className="bg-primary/5 rounded-xl p-6 border border-border">
    <h3 className="font-medium text-foreground mb-3 flex items-center">
      <FiArrowRight className="mr-2 text-primary" /> Want to know more about me?
    </h3>
    <div className="flex flex-wrap gap-3">
      <Link 
        href="/about" 
        className="px-4 py-2 bg-card rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors flex items-center border border-border hover:border-primary/30"
      >
        About Me <FiExternalLink className="ml-1.5 opacity-70" size={14} />
      </Link>
      <Link 
        href="/experience" 
        className="px-4 py-2 bg-card rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors flex items-center border border-border hover:border-primary/30"
      >
        Experience <FiExternalLink className="ml-1.5 opacity-70" size={14} />
      </Link>
      <a 
        href="https://linkedin.com/in/sahil-ali-714867242/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="px-4 py-2 bg-card rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors flex items-center border border-border hover:border-primary/30"
      >
        Resume <FiExternalLink className="ml-1.5 opacity-70" size={14} />
      </a>
    </div>
  </div>
);

export const BlogBioSection = () => (
  <section className="py-12 md:py-16 bg-background">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6">
        <MiniBio />
        <QuickLinks />
      </div>
    </div>
  </section>
);
