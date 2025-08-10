import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
}

const getPath = (path: string) => `/${path}`;

const navItems: NavItem[] = [
  { label: 'Home', path: getPath('') },
  { label: 'About', path: getPath('about') },
  { label: 'Experience', path: getPath('experience') },
  { label: 'Projects', path: getPath('projects') },
  { label: 'Blog', path: getPath('blog') },
  { label: 'Skills', path: getPath('skills') },
  { label: 'Contact', path: getPath('contact') },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close menu on route change (nice UX)
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm text-white p-4 sm:p-6"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 p-2 text-gray-200 bg-gray-800/90 hover:bg-gray-700 rounded-full border border-gray-600/50 shadow-lg 
                 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FiX className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Navigation Links */}
      <nav className="w-full max-w-md space-y-3 sm:space-y-4">
        {navItems.map(({ label, path }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`
                block w-full text-center rounded-lg py-3 px-4 sm:py-4 sm:px-6
                transition-all duration-300 text-lg sm:text-xl font-medium
                ${isActive
                  ? 'bg-primary text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-white/5 hover:bg-white/10 active:bg-white/15'}
                active:scale-95
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
              {isActive && (
                <span className="block w-1/3 h-0.5 bg-white/80 mx-auto mt-1.5 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileMenu;
