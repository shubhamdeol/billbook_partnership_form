# CashBook Onboarding Waitlist Page - Project Context

This document provides context for building a high-conversion onboarding waitlist page for **CashBook** - a UPI wallet for Business Expenses.

## Critical: Mobile-First Design

**The majority of users will access this onboarding page on mobile devices.** All design decisions must prioritize mobile experience:
- Design for mobile first, then adapt for desktop
- Ensure touch-friendly interactions (large tap targets, adequate spacing)
- Optimize for one-handed mobile usage
- Test all features on mobile viewports before desktop

---

## Project Context

CashBook is a fintech product that provides UPI-based expense management for businesses. This onboarding page serves as a waitlist signup that:

1. First showcases the product features through an animated walkthrough
2. Then collects user information for the waitlist

---

## 1. Tech Stack

- **Framework:** Next.js (App Router)
- **Runtime:** Bun
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **Animation:** Dot Lottie (for feature showcase)
- **Icons:** lucide-react
- **Validation:** Zod

---

## 2. Branding (MUST USE)

All branding assets are provided in the `/branding` folder. You MUST use these consistently:

### Colors (from `branding/brand-config.json`)

```
Primary Blue:      #0154e9  → Buttons, CTAs, links, highlights
Primary Light:     #e6eefd  → Hover states, light backgrounds
Background:        #f2f6fe  → Page background
Background Alt:    #f4f4f7  → Card backgrounds, sections
White:             #ffffff  → Cards, inputs
Text Primary:      #333333  → Headings, body text
Text Secondary:    #666666  → Subtitles, placeholders
Border:            #e5e5e5  → Input borders, dividers
Success:           #34c759  → Success states, confirmations
Error:             #cc0100  → Validation errors
```

### Typography

- **Primary Font:** Inter (weights: 400, 500, 600, 700)
- **Display Font:** Poppins (weight: 700) - for main headings
- Import from Google Fonts or use `next/font/google`

### Styling Resources

- Use `branding/brand-variables.css` for CSS custom properties
- Use `branding/brand-constants.ts` for TypeScript constants
- Use `branding/tailwind-brand.js` to extend Tailwind config

### Logo & Assets

- Logo files are in `branding/assets/` folder
- Display the CashBook logo prominently in the header

---

## 3. Page Structure & Flow

### Overview

The onboarding page follows a 3-section flow designed for maximum conversion:

```
┌─────────────────────────────────────────────────────────┐
│  SECTION 1: Feature Showcase (Lottie Animation)         │
│  → Shows product value, builds interest                 │
│  → CTA: "Join the Waitlist"                            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  SECTION 2: Testimonials (Social Proof)                 │
│  → Real customer quotes from YoloBus, Janitri, etc.    │
│  → Builds trust before asking for information          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  SECTION 3: Multi-Step Form (4 steps, 1 field each)    │
│  Step 1: Name → Step 2: Phone → Step 3: Business Type  │
│  → Step 4: Turnover → Success!                         │
└─────────────────────────────────────────────────────────┘
```

---

### Step 1: Feature Showcase (Lottie Animation)

**IMPORTANT:** Before showing the onboarding form, display an animated product walkthrough.

- Use the Lottie file at `lottie/IssueWallet.lottie`
- This animation demonstrates the app's features and user flow
- Display it in a visually engaging, full-width section
- Include a "Get Started" or "Join Waitlist" CTA button below
- User clicks the CTA to proceed to the form

**Implementation:**

```tsx
// Use @lottiefiles/dotlottie-react or lottie-react package
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

<DotLottieReact src="/lottie/IssueWallet.lottie" loop autoplay />;
```

### Step 2: Testimonials Section (Social Proof)

**IMPORTANT:** Display customer testimonials to build trust and increase conversion before the form.

#### Layout (Mobile-First)
- **Mobile (default):** Horizontal scrollable carousel with snap points for smooth swiping
- **Desktop:** Grid layout (2 columns)
- Each testimonial card includes:
  - Company logo or initials placeholder
  - Customer quote
  - Customer name
  - Title & Company name

#### Testimonials Data

```typescript
const testimonials = [
  {
    id: 1,
    name: "Sanjay Jadoun",
    title: "Founder",
    company: "YoloBus",
    quote: "We were losing money to cash leaks with no real-time spending data. CashBook channels fuel and toll payments through manager wallets, letting us track spend per kilometre. We've cut waste by 30% and plugged leaks fast with auditable digital payments."
  },
  {
    id: 2,
    name: "Arun Agarwal",
    title: "Founder",
    company: "Janitri",
    quote: "In our clinical trials, administrative work is a distraction. CashBook lets our clinicians buy consumables via UPI while finance auto-tags each cost to the right study. Our admin time is halved, so we stay focused on protecting mothers and babies, not chasing receipts."
  },
  {
    id: 3,
    name: "Suchita Choudhury",
    title: "CEO",
    company: "ISIT",
    quote: "CashBook UPI lets our site teams scan a QR and pay carpenters or suppliers in seconds. Every receipt lands on our dashboard, so finance and project leads see all spending as it happens. It has meant faster payouts and much cleaner books for us."
  },
  {
    id: 4,
    name: "Yagyarth Srivastava",
    title: "HR Lead",
    company: "Zingbus",
    quote: "Our route managers need to pay for hotels and supplies on the go. CashBook UPI puts spending power in their hands, and our finance team sees every rupee live. Reconciliation that took days now takes just minutes, keeping our buses rolling."
  }
];
```

#### Testimonial Card Styling
- Background: White (#ffffff)
- Border radius: 12px
- Shadow: `0 2px 12px rgba(0, 0, 0, 0.08)`
- Padding: 24px
- Quote text: #333333, font-style italic, line-height 1.6
- Quote icon: Large opening quote mark in #e6eefd (primary light)
- Name: #333333, font-weight 600
- Title & Company: #666666, font-size smaller

---

### Step 3: Multi-Step Onboarding Form

**IMPORTANT:** Use a step-by-step wizard approach - ONE field per step for higher completion rates.

After testimonials, the user proceeds to a multi-step form wizard:

#### Form Structure (4 Steps)

```
Step 1 → Step 2 → Step 3 → Step 4 → Success
[Name]   [Phone]  [Business] [Turnover]  [Done!]
```

#### Progress Indicator
- Display step progress at the top: "Step 1 of 4"
- Visual progress bar showing completion percentage
- Steps should be numbered with current step highlighted in primary blue

#### Step 1: Full Name
- Large, friendly heading: "Let's get started! What's your name?"
- Single text input field
- Placeholder: "Enter your full name"
- Validation: Required, minimum 2 characters
- Button: "Continue" →

#### Step 2: Phone Number
- Heading: "Great, {name}! What's your phone number?"
- Phone input with +91 prefix (auto-filled, non-editable)
- Only allow 10 digits after prefix
- Validation: Required, exactly 10 digits
- Button: "Continue" →
- Back button: ← "Back"

#### Step 3: Business Type
- Heading: "What type of business do you run?"
- Display as large, tappable cards (not dropdown)
- One selection required
- Options displayed as selectable cards:

| Option | Icon (lucide-react) |
|--------|---------------------|
| Sole Proprietorship | `User` |
| LLP / Partnership | `Users` |
| Private Limited | `Building2` |
| Unregistered Business | `Store` |

- Button: "Continue" →
- Back button: ← "Back"

#### Step 4: Annual Turnover
- Heading: "What's your annual business turnover?"
- Display as large, tappable cards
- One selection required
- Options displayed as selectable cards:

| Option | Description |
|--------|-------------|
| Less than ₹50 Lakhs | "Small business" |
| ₹50 Lakhs - ₹2 Crores | "Growing business" |
| ₹2 Crores - ₹5 Crores | "Established business" |
| Above ₹5 Crores | "Large enterprise" |

- Button: "Join Waitlist" (Primary CTA, submit form)
- Back button: ← "Back"

#### Step Navigation Logic
```typescript
// Form state management
interface FormState {
  currentStep: 1 | 2 | 3 | 4;
  data: {
    name: string;
    phone: string;
    businessType: string | null;
    turnoverRange: string | null;
  };
  errors: Record<string, string>;
}

// Only allow forward navigation if current step is valid
// Allow backward navigation anytime
// Submit only on final step
```

#### Animation Between Steps
- Use smooth slide transitions (left/right)
- Fade in/out for content
- Consider using Framer Motion or CSS transitions

#### Selection Card Styling
- Unselected: White background, #e5e5e5 border
- Selected: #e6eefd background, #0154e9 border (2px)
- Hover (desktop): Slight scale (1.02) and shadow increase
- Active/Tap (mobile): Brief scale animation for feedback
- Icon color: #0154e9 when selected, #666666 when unselected
- Minimum height: 56px for easy mobile tapping
- Full-width cards on mobile, stacked vertically

---

## 4. Database Schema (Drizzle ORM)

Create a schema file with the following structure:

```typescript
// db/schema.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const businessTypeEnum = pgEnum("business_type", [
  "sole_proprietorship",
  "llp_partnership",
  "private_limited",
  "unregistered",
]);

export const turnoverRangeEnum = pgEnum("turnover_range", [
  "below_50l",
  "50l_to_2cr",
  "2cr_to_5cr",
  "above_5cr",
]);

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull().unique(),
  businessType: businessTypeEnum("business_type").notNull(),
  turnoverRange: turnoverRangeEnum("turnover_range").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

---

## 5. Server Action

Create a Next.js Server Action for form submission:

```typescript
// app/actions/waitlist.ts
"use server";

import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+91[0-9]{10}$/, "Enter a valid 10-digit Indian phone number"),
  businessType: z.enum([
    "sole_proprietorship",
    "llp_partnership",
    "private_limited",
    "unregistered",
  ]),
  turnoverRange: z.enum(["below_50l", "50l_to_2cr", "2cr_to_5cr", "above_5cr"]),
});

export async function submitWaitlist(formData: FormData) {
  // Validate with Zod
  // Insert into database using Drizzle
  // Return success/error response
}
```

---

## 6. UI/UX Requirements

### Feature Showcase Section

- Full viewport height or prominent placement
- Lottie animation centered with adequate padding
- Headline: "Simplify Your Business Expenses"
- Subheadline: "UPI wallet designed for businesses like yours"
- CTA Button: "Join the Waitlist" (Primary blue, prominent)

### Form Section

- White card on light background (#f2f6fe)
- Card shadow: `0 4px 20px rgba(1, 84, 233, 0.1)`
- Border radius: 16px
- Padding: 32px (desktop), 24px (mobile)
- Form title: "Join the Waitlist"
- Subtitle: "Be among the first to experience CashBook"

### Input Styling

- Height: 48px minimum (ensures touch-friendly target on mobile)
- Border: 1px solid #e5e5e5
- Border radius: 8px
- Focus state: Border color #0154e9, subtle shadow
- Error state: Border color #cc0100, error message below
- Font size: 16px minimum (prevents auto-zoom on iOS)
- Use appropriate input types (tel for phone, text for name) for mobile keyboards

### Button Styling

- Primary: Background #0154e9, white text, bold
- Hover: Slightly darker shade
- Height: 48-56px
- Full width on mobile
- Border radius: 8px

### Success State

After successful submission:

- Animated checkmark (can use Lottie or CSS animation)
- Message: "You're on the list!"
- Subtext: "We'll notify you when CashBook launches"
- Option to share on social media (optional)

---

## 7. Responsive Design (Mobile-First)

**IMPORTANT:** Most users will access this page on mobile. Build mobile-first, then enhance for desktop.

### Breakpoints

- Mobile (default): < 810px - **Primary target**
- Desktop: ≥ 810px

### Mobile-First Requirements

- **Single column layout** - optimized for vertical scrolling
- **Full-width inputs and buttons** - easy to tap with thumb
- **Large touch targets** - minimum 44px height for all interactive elements
- **Touch-friendly spacing** - minimum 12px between interactive elements
- **Thumb-zone friendly** - place primary actions within easy thumb reach
- **Lottie animation** - scales appropriately, doesn't slow down mobile devices
- **Form fits within viewport** - no horizontal scroll
- **Fast loading** - optimize assets for mobile networks
- **Readable text** - minimum 16px font size for body text (prevents iOS zoom on input focus)

---

## 8. Deliverables

Create the following files:

1. **`db/schema.ts`** - Drizzle schema with enums and waitlist table
2. **`app/actions/waitlist.ts`** - Server Action with Zod validation
3. **`app/page.tsx`** - Main page component orchestrating all sections
4. **`components/`** - Reusable components:
   - `FeatureShowcase.tsx` - Lottie animation hero section
   - `Testimonials.tsx` - Customer testimonials carousel/grid
   - `TestimonialCard.tsx` - Individual testimonial card
   - `MultiStepForm.tsx` - Form wizard container with state management
   - `FormSteps/`
     - `StepName.tsx` - Step 1: Name input
     - `StepPhone.tsx` - Step 2: Phone input
     - `StepBusinessType.tsx` - Step 3: Business type selection
     - `StepTurnover.tsx` - Step 4: Turnover selection
   - `ProgressBar.tsx` - Step progress indicator
   - `SelectionCard.tsx` - Reusable selectable card component
   - `SuccessMessage.tsx` - Post-submission success state
5. **`tailwind.config.ts`** - Extended with CashBook brand theme
6. **`lib/testimonials.ts`** - Testimonials data

---

## 9. Additional Notes

- Ensure all text is accessible (WCAG AA contrast ratios)
- Add proper meta tags for SEO (title, description, OG tags)
- Use semantic HTML elements
- Handle loading states during form submission
- Implement proper error handling and display user-friendly messages
- Consider adding subtle micro-interactions for better UX

---

## Quick Reference: File Paths

```
/branding
  /assets              → Logo files (add manually)
  brand-config.json
  brand-constants.ts
  brand-variables.css
  tailwind-brand.js

/lottie
  IssueWallet.lottie   → Feature showcase animation

/db
  schema.ts            → [CREATE] Drizzle schema

/lib
  testimonials.ts      → [CREATE] Testimonials data

/app
  page.tsx             → [CREATE] Main page
  /actions
    waitlist.ts        → [CREATE] Server action

/components
  FeatureShowcase.tsx  → [CREATE] Lottie hero section
  Testimonials.tsx     → [CREATE] Testimonials section
  TestimonialCard.tsx  → [CREATE] Single testimonial card
  MultiStepForm.tsx    → [CREATE] Form wizard container
  ProgressBar.tsx      → [CREATE] Step progress indicator
  SelectionCard.tsx    → [CREATE] Selectable option card
  SuccessMessage.tsx   → [CREATE] Success state
  /FormSteps
    StepName.tsx       → [CREATE] Step 1
    StepPhone.tsx      → [CREATE] Step 2
    StepBusinessType.tsx → [CREATE] Step 3
    StepTurnover.tsx   → [CREATE] Step 4
```
