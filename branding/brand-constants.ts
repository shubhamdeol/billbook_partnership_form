/**
 * CashBook Brand Constants
 * Source: https://cashbook.in/
 */

export const BRAND = {
  name: 'CashBook',
  tagline: 'UPI wallet for Business Expenses',
  website: 'https://cashbook.in/',
} as const;

export const COLORS = {
  primary: '#0154e9',
  primaryLight: '#e6eefd',
  background: '#f2f6fe',
  backgroundAlt: '#f4f4f7',
  white: '#ffffff',
  dark: '#000000',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e5e5e5',
  success: '#34c759',
  error: '#cc0100',
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monospace: "'Fragment Mono', 'Fira Code', monospace",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
} as const;

export const SPACING = {
  sectionPadding: '80px',
  contentMaxWidth: '1280px',
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
} as const;

export const BREAKPOINTS = {
  mobile: '810px',
  desktop: '1280px',
} as const;

// Theme object for styled-components or emotion
export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  breakpoints: BREAKPOINTS,
} as const;

export type Theme = typeof theme;
