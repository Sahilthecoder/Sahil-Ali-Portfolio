'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import Navbar from './Navbar';
import LazyImage from '../LazyImage';

interface HeaderProps {
  onMenuToggle: () => void;
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isScrolled = false }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-md bg-white/80 dark:bg-gray-900/80
        transition-all duration-300 ease-out
        ${isScrolled ? 'py-0 shadow-lg' : 'py-2 sm:py-3'}
        border-b border-gray-200/80 dark:border-gray-800/80
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo & Title - Clickable area for home */}
          <a 
            href="/" 
            className="flex items-center space-x-3 sm:space-x-4 group"
            aria-label="Go to home"
          >
            <div className="relative">
              <LazyImage
                src="/Sahil-Ali-Portfolio/favicon/favicon-192x192.png"
                alt="Logo"
                width={48}
                height={48}
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-md shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -inset-1 bg-primary/20 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white select-none leading-tight">
                Sahil Ali
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium select-none">
                Data Generalist
              </p>
            </div>
          </a>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Navbar />
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              aria-label="Toggle navigation menu"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95"
              title="Open navigation menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
