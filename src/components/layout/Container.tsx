import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide';
}

/**
 * Container component for consistent max-width and padding
 * across all sections. Part of the design system.
 */
export function Container({ children, className, size = 'default', ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        {
          'max-w-content': size === 'default',
          'max-w-prose': size === 'narrow',
          'max-w-7xl': size === 'wide',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
