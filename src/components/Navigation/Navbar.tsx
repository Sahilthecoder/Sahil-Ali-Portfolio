import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPath } from '../../utils/paths';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: getPath('/') },
  { label: 'About', path: getPath('/about') },
  { label: 'Experience', path: getPath('/experience') },
  { label: 'Projects', path: getPath('/projects') },
  { label: 'Skills', path: getPath('/skills') },
  { label: 'Blog', path: getPath('/blog') },
  { label: 'Contact', path: getPath('/contact') },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex space-x-6 lg:space-x-8">
      {navItems.map(({ label, path }) => {
        const isActive = location.pathname === path;

        return (
          <motion.div 
            key={path}
            className="group relative"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link
              to={path}
              className={`
                relative block py-2 px-1 sm:px-2
                text-sm sm:text-base font-medium
                text-foreground/80 dark:text-gray-300
                hover:text-primary dark:hover:text-primary-foreground
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
                transition-all duration-200
                ${isActive ? 'text-primary dark:text-primary-foreground font-semibold' : ''}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
              <span
                className={`
                  absolute bottom-1 left-1/2 h-0.5 bg-primary dark:bg-primary-foreground
                  transition-all duration-300 -translate-x-1/2
                  ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}
                  rounded-full
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
