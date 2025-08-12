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
        backdrop-blur-md bg-white/60 dark:bg-gray-900/60
        transition-all duration-300
        ${isScrolled ? 'py-0 shadow-md' : 'py-2'}
        border-b border-gray-200 dark:border-gray-800
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <LazyImage
              src="/Sahil-Ali-Portfolio/logo/logo192.webp"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain rounded-md shadow-sm"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white select-none leading-tight">
                Sahil Ali
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium select-none">
                AI Generalist
              </p>
            </div>
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex space-x-8">
            <Navbar />
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
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
              aria-label="Toggle menu"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors"
              title="Open menu"
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