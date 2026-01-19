# FI Int LLC Brand Guidelines

## Logo System

### Logo Overview

The FI Int logo is a modern, minimal mark that represents financial intelligence and connectivity. It features:

1. **Abstract "F" Mark** — A stylized letter F with flowing elements
2. **Dual-tone Treatment** — Primary green for structure, purple accent for intelligence/flow
3. **Clean Wordmark** — "FI" in bold + "Int" in medium weight

### Logo Component

```tsx
import { Logo, LogoMark } from '@/components/layout/Logo';

// Full logo with wordmark (default)
<Logo />

// Different sizes
<Logo size="sm" />  // Small
<Logo size="md" />  // Medium (default)
<Logo size="lg" />  // Large

// Variants
<Logo variant="default" />  // Full color (green + purple)
<Logo variant="mono" />     // Monochrome (currentColor)
<Logo variant="icon" />     // Mark only, no text

// As a link
<Logo href="/en" />

// Mark only (for favicon, tight spaces)
<LogoMark />
<LogoMark variant="mono" />
```

### Logo Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Full color with green + purple | Header, hero sections |
| `mono` | Single color (currentColor) | Footers, print, overlays |
| `icon` | Mark only, no wordmark | Favicon, tight spaces |

### Sizes

| Size | Icon | Text | Use Case |
|------|------|------|----------|
| `sm` | 24px | 16px | Compact headers, mobile |
| `md` | 32px | 18px | Default, desktop header |
| `lg` | 40px | 20px | Hero sections, emphasis |

### Color Usage

**Primary Accent (Gen-Z Green):**
- Hex: `#22c55e`
- Use for: Logo structure, primary CTAs, emphasis
- Tailwind: `primary-500`

**Secondary Accent (Purple):**
- Hex: `#a855f7`
- Use for: Logo accent elements, supporting visuals
- Tailwind: `secondary-500`

**Monochrome:**
- Inherits `currentColor` from parent
- Use on complex backgrounds, print materials

### Spacing Rules

**Minimum Clear Space:**
The logo should have clear space equal to the width of the "F" mark on all sides.

**Minimum Size:**
- Digital: 24px height minimum (use `size="sm"`)
- Print: 12mm width minimum

### Do's and Don'ts

**Do:**
- Use the Logo component from `@/components/layout/Logo`
- Maintain consistent sizing per context
- Use `mono` variant on complex backgrounds
- Ensure adequate contrast with background

**Don't:**
- Rotate or skew the logo
- Add drop shadows or effects
- Change the accent colors
- Use custom SVGs instead of the component
- Compress or stretch the logo

---

## Typography

**System Font Stack:**
```css
font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

**Type Scale (defined in globals.css):**
- Display: 4rem / 3rem / 2.25rem
- Heading: 1.875rem / 1.5rem / 1.25rem
- Body: 1.125rem / 1rem / 0.875rem
- Caption: 0.75rem

---

## Color Palette

| Name | Hex | CSS Variable | Use |
|------|-----|--------------|-----|
| Primary 500 | #22c55e | `--color-primary-500` | Main accent |
| Primary 600 | #16a34a | `--color-primary-600` | Hover states |
| Secondary 500 | #a855f7 | `--color-secondary-500` | Secondary accent |
| Neutral 50 | #fafafa | `--color-neutral-50` | Light backgrounds |
| Neutral 900 | #171717 | `--color-neutral-900` | Dark backgrounds |
| Neutral 500 | #737373 | `--color-neutral-500` | Muted text |

---

## Brand Voice

**Personality:**
- Professional but approachable
- Clear and direct
- Confident without arrogance
- Technical but accessible

**Tone:**
- Conversational, not corporate
- Practical, not academic
- Honest about capabilities
- Focused on outcomes

---

*These guidelines ensure consistent brand representation across the FI Int LLC website and materials.*
