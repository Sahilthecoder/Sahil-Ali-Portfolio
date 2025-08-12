import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHome, FiUser, FiBriefcase, FiCode, FiMail } from 'react-icons/fi';
import Newsletter from '@/components/Newsletter';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: <FiHome className="w-5 h-5" /> },
  { label: 'About', path: '/about', icon: <FiUser className="w-5 h-5" /> },
  { label: 'Experience', path: '/experience', icon: <FiBriefcase className="w-5 h-5" /> },
  { label: 'Projects', path: '/projects', icon: <FiCode className="w-5 h-5" /> },
  { label: 'Contact', path: '/contact', icon: <FiMail className="w-5 h-5" /> },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, y: -10 }
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-900"
        />

        {/* Menu Container */}
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <motion.nav 
              className="flex-1 px-6 py-4 space-y-1 overflow-y-auto"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map(({ label, path, icon }) => {
                const isActive = location.pathname === path;
                
                return (
                  <motion.div key={path} variants={itemVariants}>
                    <Link
                      to={path}
                      onClick={onClose}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-blue-400' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="mr-3 text-gray-500 dark:text-gray-400">{icon}</span>
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Newsletter Section */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Stay Updated
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Subscribe to my newsletter for the latest updates and insights.
                </p>
                <Newsletter className="w-full" compact />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;