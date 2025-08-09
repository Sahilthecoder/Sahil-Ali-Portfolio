import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex space-x-10">
      {navItems.map(({ label, path }) => {
        const isActive = location.pathname === path;

        return (
          <motion.div 
            key={path}
            className="group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={path}
              className={`
                relative
                font-medium
                text-foreground/80 dark:text-gray-300
                hover:text-primary dark:hover:text-primary-foreground
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                transition-colors duration-300
                ${isActive ? 'text-primary dark:text-primary-foreground' : ''}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
              <span
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-primary dark:bg-primary-foreground
                  transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
              />
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default Navbar;
