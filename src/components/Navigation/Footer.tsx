import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaWhatsapp, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Newsletter from '@/components/Newsletter';

type LinkItem = { name: string; href: string };
type SocialLink = { name: string; href: string; icon: React.ReactNode };

const NAV_LINKS: LinkItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const LEGAL_LINKS: LinkItem[] = [
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: 'https://github.com/sahilthecoder', icon: <FaGithub /> },
  { name: 'WhatsApp', href: 'https://wa.me/919875771550', icon: <FaWhatsapp /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sahil-ali-714867242', icon: <FaLinkedin /> },
  { name: 'Email', href: 'mailto:sahilkhan36985@gmail.com', icon: <FaEnvelope /> },
];

// Reusable link list
const LinkList: React.FC<{ title: string; links: LinkItem[]; ariaLabel: string }> = ({ title, links, ariaLabel }) => (
  <nav aria-label={ariaLabel} className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <ul className="space-y-2">
      {links.map(({ name, href }) => (
        <li key={href}>
          <Link
            to={href}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const SocialIcons: React.FC = () => (
  <div className="flex space-x-5">
    {SOCIAL_LINKS.map(({ name, href, icon }) => (
      <motion.a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="text-2xl text-muted-foreground hover:text-primary transition-colors duration-200"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
      </motion.a>
    ))}
  </div>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top newsletter section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary/5 rounded-2xl p-8 mb-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-3 text-foreground">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to get updates on my latest projects, insights, and resources — directly to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <Newsletter />
          </div>
        </motion.section>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12">
          <div className="md:col-span-3">
            <LinkList title="Navigation" links={NAV_LINKS} ariaLabel="Footer navigation" />
          </div>
          <div className="md:col-span-2">
            <LinkList title="Legal" links={LEGAL_LINKS} ariaLabel="Legal links" />
          </div>
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-lg font-semibold text-foreground">Let’s Connect</h3>
            <SocialIcons />
            <p className="text-muted-foreground">
              Got a project or idea? Let’s bring it to life together.
            </p>
            <a
              href="mailto:sahilkhan36985@gmail.com"
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              Get in touch
            </a>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-foreground">About Me</h3>
            <p className="text-muted-foreground">
              I’m a data analyst & developer passionate about turning data into actionable insights and building creative tech solutions.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Sahil Ali. All rights reserved.</p>
          <p className="mt-3 sm:mt-0">
            Built with <span className="text-primary font-semibold">React</span>,{' '}
            <span className="text-primary font-semibold">TypeScript</span>, &{' '}
            <span className="text-primary font-semibold">Tailwind CSS</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
