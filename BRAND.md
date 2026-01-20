# FI Int LLC Brand Guidelines

## Logo System

### Logo Overview

The FI Int logo is a modern, minimal mark that represents financial intelligence and connectivity. It features:

1. **Abstract "F" Mark** — A stylized letter F with flowing elements
2. **Forest Green Treatment** — Sophisticated RAL7033-inspired green palette
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
<Logo variant="default" />  // Full color (forest green gradient)
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
| `default` | Forest green gradient | Header, hero sections |
| `mono` | Single color (currentColor) | Footers, print, overlays |
| `icon` | Mark only, no wordmark | Favicon, tight spaces |

### Sizes

| Size | Icon | Text | Use Case |
|------|------|------|----------|
| `sm` | 24px | 16px | Compact headers, mobile |
| `md` | 32px | 18px | Default, desktop header |
| `lg` | 40px | 20px | Hero sections, emphasis |

### Color Usage

**Primary (Forest Green - RAL7033 inspired):**
- Hex: `#5a7d5a`
- Use for: Logo, primary CTAs, emphasis
- Tailwind: `primary-500`

**Primary Dark:**
- Hex: `#476447`
- Use for: Gradients, hover states
- Tailwind: `primary-600`

**Secondary (Sage/Olive Green):**
- Hex: `#7a8b63`
- Use for: Secondary elements, supporting visuals
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
| Primary 500 | #5a7d5a | `--color-primary-500` | Main accent (Forest Green) |
| Primary 600 | #476447 | `--color-primary-600` | Hover states, gradients |
| Primary 700 | #3d543d | `--color-primary-700` | Darker accents |
| Secondary 500 | #7a8b63 | `--color-secondary-500` | Secondary accent (Sage/Olive) |
| Secondary 600 | #6a7a54 | `--color-secondary-600` | Secondary hover states |
| Accent 500 | #8fa882 | `--color-accent-500` | Tertiary accent (Light Sage) |
| Neutral 50 | #fafafa | `--color-neutral-50` | Light backgrounds |
| Neutral 900 | #171717 | `--color-neutral-900` | Dark backgrounds |
| Neutral 500 | #737373 | `--color-neutral-500` | Muted text |

**Note:** The color scheme is inspired by RAL7033 (Cement Grey/Green), creating a sophisticated, professional forest green palette.

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
