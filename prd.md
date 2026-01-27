# CashBook Onboarding Waitlist Page - Build Prompt

You are a Senior Full-Stack Engineer. Build a high-conversion, mobile-responsive onboarding waitlist page for **CashBook** - a UPI wallet for Business Expenses.

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

### Step 2: Onboarding Form

After the user clicks the CTA, transition (smooth scroll or page transition) to the waitlist form:

#### Form Layout

- Centered card UI with subtle shadow
- Clean, minimal design following CashBook branding
- Large touch targets (minimum 48px height) for mobile-friendliness
- Progress indicator if using multi-step form (optional)

#### Form Fields

| Field           | Type         | Validation                      | Notes                               |
| --------------- | ------------ | ------------------------------- | ----------------------------------- |
| Full Name       | Text input   | Required, min 2 chars           | Placeholder: "Enter your full name" |
| Phone Number    | Tel input    | Required, +91 prefix, 10 digits | Auto-prefix with +91, numeric only  |
| Business Type   | Radio/Select | Required                        | See options below                   |
| Annual Turnover | Radio/Select | Required                        | See options below                   |

**Business Type Options:**

- Sole Proprietorship
- LLP / Partnership
- Private Limited
- Unregistered Business

**Annual Turnover Options:**

- Less than ₹50 Lakhs
- ₹50 Lakhs - ₹2 Crores
- ₹2 Crores - ₹5 Crores
- Above ₹5 Crores

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

- Height: 48px minimum
- Border: 1px solid #e5e5e5
- Border radius: 8px
- Focus state: Border color #0154e9, subtle shadow
- Error state: Border color #cc0100, error message below

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

## 7. Responsive Design

### Breakpoints

- Mobile: < 810px
- Desktop: ≥ 810px

### Mobile Considerations

- Single column layout
- Full-width inputs and buttons
- Touch-friendly spacing (min 8px between interactive elements)
- Lottie animation scales appropriately
- Form fits within viewport without horizontal scroll

---

## 8. Deliverables

Create the following files:

1. **`db/schema.ts`** - Drizzle schema with enums and waitlist table
2. **`app/actions/waitlist.ts`** - Server Action with Zod validation
3. **`app/page.tsx`** - Main page component with:
   - Feature showcase section with Lottie
   - Onboarding form section
   - Success state
4. **`components/`** - Reusable components:
   - `FeatureShowcase.tsx` - Lottie animation section
   - `WaitlistForm.tsx` - Form component
   - `SuccessMessage.tsx` - Post-submission state
5. **`tailwind.config.ts`** - Extended with CashBook brand theme

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
  /assets          → Logo files (add manually)
  brand-config.json
  brand-constants.ts
  brand-variables.css
  tailwind-brand.js

/lottie
  IssueWallet.lottie → Feature showcase animation

/db
  schema.ts        → [CREATE] Drizzle schema

/app
  page.tsx         → [CREATE] Main page
  /actions
    waitlist.ts    → [CREATE] Server action

/components        → [CREATE] UI components
```
