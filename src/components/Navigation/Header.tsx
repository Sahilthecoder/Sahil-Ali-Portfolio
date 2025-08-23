'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import LazyImage from '../LazyImage';

interface HeaderProps {
  onMenuToggle: () => void;
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isScrolled = false }) => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl bg-gradient-to-r from-white/70 to-white/50 dark:from-gray-900/80 dark:to-gray-800/60
        transition-all duration-500 ease-out
        ${isScrolled ? 'py-0 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/30' : 'py-2'}
        border-b border-white/30 dark:border-gray-700/50
        before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
        before:from-primary-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-500 before:ease-out before:pointer-events-none
      `}
      style={{
        '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0))',
        '--tw-gradient-from': 'hsl(var(--primary) / 0.1)'
      } as React.CSSProperties}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo & Title */}
          <motion.div
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => navigate('/')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/');
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label="Go to home page"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{ 
                rotate: isHovered ? 5 : 0,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <LazyImage
                src="/Sahil-Ali-Portfolio/logo/logo192.webp"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain rounded-md shadow-sm"
              />
            </motion.div>
            <div className="transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary-300">
              <motion.h1 
                className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white select-none leading-tight"
                animate={{ 
                  color: isHovered ? 'var(--primary)' : undefined 
                }}
                transition={{ duration: 0.2 }}
              >
                Sahil Ali
              </motion.h1>
              <motion.p 
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium select-none"
                animate={{ 
                  x: isHovered ? 2 : 0,
                  opacity: isHovered ? 0.8 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                AI Generalist
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex space-x-8">
            <Navbar />
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              whileHover={{ scale: 1.05, rotate: 15 }}
              whileTap={{ scale: 0.95, rotate: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 180, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {theme === 'dark' ? (
                    <FiSun className="w-5 h-5" />
                  ) : (
                    <FiMoon className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={onMenuToggle}
              aria-label="Toggle menu"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors"
              title="Open menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 90 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <FiMenu className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;