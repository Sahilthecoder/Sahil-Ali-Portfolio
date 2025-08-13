import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          contrast: 'hsl(var(--primary-contrast))',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            h2: {
              fontSize: '2.5rem',
              fontWeight: '700',
              lineHeight: '1.2',
              color: 'hsl(var(--foreground))',
              marginBottom: '1.5rem',
              textAlign: 'center',
              '& span': {
                backgroundClip: 'text',
                color: 'transparent',
                backgroundImage: 'linear-gradient(to right, var(--tw-gradient-stops))',
                '&:first-child': {
                  '--tw-gradient-from': 'hsl(var(--primary))',
                  '--tw-gradient-to': 'hsl(var(--primary) / 0.8)',
                  '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
                },
                '&:last-child': {
                  '--tw-gradient-from': 'hsl(var(--foreground))',
                  '--tw-gradient-to': 'hsl(var(--foreground) / 0.8)',
                  '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
                }
              },
              '@media (min-width: 768px)': {
                fontSize: '3.75rem',
              },
            },
            p: {
              fontSize: '1.125rem',
              color: 'hsl(var(--muted-foreground))',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.75',
              textAlign: 'center',
              opacity: '0.8',
              '@media (min-width: 768px)': {
                fontSize: '1.25rem',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
