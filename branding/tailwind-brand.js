/**
 * CashBook Brand - Tailwind CSS Configuration
 * Source: https://cashbook.in/
 *
 * Usage: Import and spread into your tailwind.config.js
 *
 * import { cashbookTheme } from './branding/tailwind-brand'
 *
 * module.exports = {
 *   theme: {
 *     extend: cashbookTheme
 *   }
 * }
 */

export const cashbookTheme = {
  colors: {
    primary: {
      DEFAULT: '#0154e9',
      light: '#e6eefd',
    },
    background: {
      DEFAULT: '#f2f6fe',
      alt: '#f4f4f7',
    },
    text: {
      DEFAULT: '#333333',
      secondary: '#666666',
      dark: '#000000',
    },
    border: '#e5e5e5',
    success: '#34c759',
    error: '#cc0100',
  },
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    display: ['Poppins', 'Inter', 'sans-serif'],
    mono: ['Fragment Mono', 'Fira Code', 'monospace'],
  },
  fontSize: {
    xs: ['12px', { lineHeight: '1.5' }],
    sm: ['14px', { lineHeight: '1.5' }],
    base: ['16px', { lineHeight: '1.6' }],
    lg: ['18px', { lineHeight: '1.6' }],
    xl: ['20px', { lineHeight: '1.5' }],
    '2xl': ['24px', { lineHeight: '1.4' }],
    '3xl': ['30px', { lineHeight: '1.3' }],
    '4xl': ['36px', { lineHeight: '1.2' }],
    '5xl': ['48px', { lineHeight: '1.1' }],
  },
  borderRadius: {
    sm: '4px',
    DEFAULT: '8px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  boxShadow: {
    card: '0 4px 20px rgba(1, 84, 233, 0.1)',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

export default cashbookTheme;
