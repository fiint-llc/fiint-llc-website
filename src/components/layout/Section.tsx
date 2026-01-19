import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Whether to use gradient background */
  gradient?: boolean;
  /** Use warm cream background */
  warm?: boolean;
  /** Container size variant */
  containerSize?: 'default' | 'narrow' | 'wide';
  /** Optional ID for anchor links */
  sectionId?: string;
}

/**
 * Section component for consistent vertical rhythm
 * and spacing across the site. Part of the design system.
 */
export function Section({
  children,
  className,
  gradient = false,
  warm = false,
  containerSize = 'default',
  sectionId,
  ...props
}: SectionProps) {
  return (
    <section
      id={sectionId}
      className={cn(
        'py-16 lg:py-24',
        gradient && 'gradient-bg',
        warm && 'bg-warm-cream',
        className
      )}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

/**
 * Section header with optional label, title, and description
 * Provides consistent styling for section introductions
 */
export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' && 'text-center mx-auto max-w-2xl'
      )}
    >
      {label && (
        <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide mb-2 block">
          {label}
        </span>
      )}
      <h2 className="text-display-sm lg:text-display text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-body-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
