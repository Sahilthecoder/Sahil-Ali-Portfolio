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

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm text-white text-2xl space-y-10 p-8"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-6 right-6 p-3 text-gray-200 bg-gray-800/90 hover:bg-gray-700 rounded-full border border-gray-600/50 shadow-lg 
                   hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FiX className="w-7 h-7" />
      </button>

      {/* Navigation Links */}
      {navItems.map(({ label, path }) => {
        const isActive = location.pathname === path;

        return (
          <Link
            key={path}
            to={path}
            onClick={onClose}
            className={`
              w-56 text-center rounded-lg py-3 px-6
              transition-colors duration-300
              ${isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'hover:bg-blue-600 hover:text-white'}
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default MobileMenu;