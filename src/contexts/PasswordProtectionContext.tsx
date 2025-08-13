'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type PasswordProtectionContextType = {
  isAuthenticated: boolean;
  verifyPassword: (password: string) => boolean;
  lockCertificates: () => void;
};

const PasswordProtectionContext = createContext<PasswordProtectionContextType | undefined>(undefined);

export const PasswordProtectionProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Read from environment variable
  const CORRECT_PASSWORD = import.meta.env.VITE_PASSWORD_PROTECT_KEY || '';

  const verifyPassword = (password: string) => {
    const isCorrect = password === CORRECT_PASSWORD;
    if (isCorrect) {
      setIsAuthenticated(true);
      sessionStorage.setItem('certificateAuth', 'true');
    }
    return isCorrect;
  };

  const lockCertificates = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('certificateAuth');
  };

  // Load session storage state on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('certificateAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <PasswordProtectionContext.Provider value={{ isAuthenticated, verifyPassword, lockCertificates }}>
      {children}
    </PasswordProtectionContext.Provider>
  );
};

export const usePasswordProtection = () => {
  const context = useContext(PasswordProtectionContext);
  if (!context) {
    throw new Error('usePasswordProtection must be used within a PasswordProtectionProvider');
  }
  return context;
};
