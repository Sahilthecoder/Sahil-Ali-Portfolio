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
  <nav aria-label={ariaLabel} className="space-y-3 sm:space-y-4">
    <h3 className="text-base sm:text-lg font-semibold text-foreground">{title}</h3>
    <ul className="space-y-1.5 sm:space-y-2">
      {links.map(({ name, href }) => (
        <motion.li 
          key={href}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Link
            to={href}
            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
          >
            {name}
          </Link>
        </motion.li>
      ))}
    </ul>
  </nav>
);

const SocialIcons: React.FC = () => (
  <div className="flex flex-nowrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 overflow-x-auto w-full py-1">
    {SOCIAL_LINKS.map(({ name, href, icon }) => (
      <motion.a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="flex-shrink-0 text-lg sm:text-xl md:text-2xl text-muted-foreground hover:text-primary transition-colors duration-200 p-1.5 sm:p-2 rounded-full hover:bg-primary/5"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={name}
      >
        {icon}
      </motion.a>
    ))}
  </div>
);

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`
      backdrop-blur-xl bg-gradient-to-r from-white/70 to-white/50 dark:from-gray-900/80 dark:to-gray-800/60
      border-t border-white/30 dark:border-gray-700/50
      pt-12 sm:pt-16 relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
      before:from-primary-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-500 before:ease-out before:pointer-events-none
      ${className}
    `} style={{
      '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0))',
      '--tw-gradient-from': 'hsl(var(--primary) / 0.1)'
    } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-12 gap-8 sm:gap-10">
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <LinkList title="Navigation" links={NAV_LINKS} ariaLabel="Footer navigation" />
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <LinkList title="Legal" links={LEGAL_LINKS} ariaLabel="Legal links" />
          </div>
          <div className="md:col-span-3 space-y-5">
            <h3 className="text-lg font-semibold text-foreground">Let&apos;s Connect</h3>
            <SocialIcons />
            <p className="text-muted-foreground">
              Got a project or idea? Let&apos;s bring it to life together.
            </p>
          </div>
          <div className="hidden md:block md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-primary/5 rounded-xl p-6 h-full"
            >
              <Newsletter className="max-w-full" />
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-sm">
          <p className="mt-3 sm:mt-0">
            Built with{' '}
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              React
            </a>,{' '}
            <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              TypeScript
            </a>, &{' '}
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              Tailwind CSS
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
