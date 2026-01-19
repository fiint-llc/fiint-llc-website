import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
  variant?: 'default' | 'mono' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * FI Int Logo System (2026 Premium Edition)
 *
 * A bold, distinctive logo that stands out:
 * - Geometric "FI" monogram with modern fintech aesthetic
 * - Vibrant gradient from indigo to cyan
 * - Clean, memorable wordmark
 *
 * Variants:
 * - default: Vibrant gradient
 * - mono: Single color (currentColor)
 * - icon: Mark only, no wordmark
 */
export function Logo({
  className,
  showText = true,
  href,
  variant = 'default',
  size = 'md'
}: LogoProps) {
  const sizes = {
    sm: { icon: 'h-8 w-8', text: 'text-lg', gap: 'gap-2' },
    md: { icon: 'h-10 w-10', text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 'h-12 w-12', text: 'text-2xl', gap: 'gap-3' },
  };

  const { icon: iconSize, text: textSize, gap } = sizes[size];
  const gradientId = React.useId();

  const LogoMark = () => (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconSize}
      aria-hidden="true"
    >
      <defs>
        {variant === 'default' && (
          <>
            {/* Primary gradient - Brand indigo */}
            <linearGradient id={`logo-main-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4347e6" />
              <stop offset="100%" stopColor="#5a67f2" />
            </linearGradient>
            {/* Accent gradient - for dot */}
            <linearGradient id={`logo-accent-${gradientId}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5a67f2" />
              <stop offset="100%" stopColor="#7b8ff8" />
            </linearGradient>
          </>
        )}
      </defs>

      {/* Background shape with rounded corners */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill={variant === 'mono' ? 'currentColor' : `url(#logo-main-${gradientId})`}
        opacity={variant === 'mono' ? 0.1 : 1}
      />

      {/* F letter - bold geometric */}
      <path
        d="M12 12h10v4h-6v6h5v4h-5v10h-4V12z"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
      />

      {/* I letter - with accent dot */}
      <rect
        x="26"
        y="16"
        width="4"
        height="20"
        rx="1"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
      />
      <circle
        cx="28"
        cy="12"
        r="2.5"
        fill={variant === 'mono' ? 'currentColor' : `url(#logo-accent-${gradientId})`}
      />

      {/* Decorative element - data flow indicator */}
      <rect
        x="34"
        y="24"
        width="6"
        height="3"
        rx="1.5"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
        opacity={variant === 'mono' ? 0.5 : 0.7}
      />
      <rect
        x="34"
        y="30"
        width="4"
        height="3"
        rx="1.5"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
        opacity={variant === 'mono' ? 0.3 : 0.5}
      />
    </svg>
  );

  const LogoContent = () => (
    <div className={cn('flex items-center', gap, className)}>
      <LogoMark />

      {showText && variant !== 'icon' && (
        <div className="flex items-baseline">
          <span className={cn(
            'font-display font-bold tracking-tight',
            textSize,
            variant === 'mono' ? 'text-current' : 'text-foreground'
          )}>
            FI
          </span>
          <span className={cn(
            'font-display font-medium tracking-tight',
            textSize,
            variant === 'mono' ? 'text-current opacity-70' : 'text-muted-foreground'
          )}>
            Int
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg transition-all duration-200 hover:opacity-90"
      >
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}

/**
 * Logo Mark Only - for favicon, small spaces, app icons
 */
export function LogoMark({
  className,
  variant = 'default',
  size = 'md'
}: {
  className?: string;
  variant?: 'default' | 'mono';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  const gradientId = React.useId();

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizes[size], className)}
      aria-label="FI Int"
    >
      <defs>
        {variant === 'default' && (
          <>
            <linearGradient id={`mark-main-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4347e6" />
              <stop offset="100%" stopColor="#5a67f2" />
            </linearGradient>
            <linearGradient id={`mark-accent-${gradientId}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5a67f2" />
              <stop offset="100%" stopColor="#7b8ff8" />
            </linearGradient>
          </>
        )}
      </defs>

      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill={variant === 'mono' ? 'currentColor' : `url(#mark-main-${gradientId})`}
        opacity={variant === 'mono' ? 0.1 : 1}
      />

      <path
        d="M12 12h10v4h-6v6h5v4h-5v10h-4V12z"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
      />

      <rect
        x="26"
        y="16"
        width="4"
        height="20"
        rx="1"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
      />
      <circle
        cx="28"
        cy="12"
        r="2.5"
        fill={variant === 'mono' ? 'currentColor' : `url(#mark-accent-${gradientId})`}
      />

      <rect
        x="34"
        y="24"
        width="6"
        height="3"
        rx="1.5"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
        opacity={variant === 'mono' ? 0.5 : 0.7}
      />
      <rect
        x="34"
        y="30"
        width="4"
        height="3"
        rx="1.5"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
        opacity={variant === 'mono' ? 0.3 : 0.5}
      />
    </svg>
  );
}
