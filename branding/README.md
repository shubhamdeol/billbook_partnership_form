# CashBook Branding Assets

Brand assets extracted from [cashbook.in](https://cashbook.in/)

## Files Included

| File | Description | Usage |
|------|-------------|-------|
| `brand-config.json` | Complete brand configuration | Import for any JS/TS project |
| `brand-constants.ts` | TypeScript constants & theme | React/Next.js projects |
| `brand-variables.css` | CSS custom properties | Import in main CSS file |
| `tailwind-brand.js` | Tailwind CSS theme extension | Extend your tailwind.config.js |

## Quick Start

### CSS Variables
```css
@import './branding/brand-variables.css';

.button {
  background: var(--color-primary);
  font-family: var(--font-primary);
}
```

### TypeScript/React
```tsx
import { COLORS, TYPOGRAPHY, theme } from './branding/brand-constants';

const Button = styled.button`
  background: ${COLORS.primary};
  font-family: ${TYPOGRAPHY.fontFamily.primary};
`;
```

### Tailwind CSS
```js
// tailwind.config.js
import { cashbookTheme } from './branding/tailwind-brand';

export default {
  theme: {
    extend: cashbookTheme
  }
}
```

## Manual Asset Download

The website uses Framer with dynamic loading, so logos and images need to be downloaded manually:

### How to get the logo:
1. Visit [cashbook.in](https://cashbook.in/)
2. Right-click on the logo → "Save image as..."
3. Save to `./branding/assets/logo.png`

### Alternative: Browser DevTools method
1. Open [cashbook.in](https://cashbook.in/)
2. Press `F12` to open DevTools
3. Go to Network tab → Images
4. Refresh the page
5. Download any logo/image assets you need

### Recommended asset folder structure:
```
branding/
├── assets/
│   ├── logo.png
│   ├── logo-white.png
│   ├── icon.png
│   └── app-screenshot.png
├── brand-config.json
├── brand-constants.ts
├── brand-variables.css
├── tailwind-brand.js
└── README.md
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0154e9` | Buttons, links, accents |
| Primary Light | `#e6eefd` | Hover states, backgrounds |
| Background | `#f2f6fe` | Page background |
| Text | `#333333` | Body text |
| Text Secondary | `#666666` | Muted text |
| Success | `#34c759` | Success states |
| Error | `#cc0100` | Error states |

## Typography

- **Primary Font:** Inter (weights: 400-900)
- **Secondary Font:** Poppins (weight: 700, for display)
- **Monospace:** Fragment Mono

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700&display=swap" rel="stylesheet">
```
