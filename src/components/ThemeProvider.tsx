'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

type Attribute = 'class' | 'data-theme' | Array<'class' | 'data-theme'>;

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
}

interface ThemeContextValue {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  systemTheme: string | undefined;
  resolvedTheme: string | undefined;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = true,
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      {...props}
    >
      {mounted ? (
        <ThemeContextProvider>{children}</ThemeContextProvider>
      ) : (
        // Fallback UI while mounting to avoid flicker
        <div style={{ visibility: 'hidden' }}>{children}</div>
      )}
    </NextThemesProvider>
  );
}

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming theme context easily
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
