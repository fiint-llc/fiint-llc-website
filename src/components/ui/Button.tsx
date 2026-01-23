import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary - Vibrant gradient with glow effect
        default:
          'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:from-primary-700 hover:to-primary-600 active:scale-[0.98]',
        // Destructive
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        // Secondary - Cyan/teal for growth actions
        secondary:
          'bg-gradient-to-r from-secondary-600 to-secondary-500 text-white shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/30 hover:from-secondary-700 hover:to-secondary-600 active:scale-[0.98]',
        // Outline - Refined bordered style with hover fill
        outline:
          'border-2 border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
        // Ghost - Minimal, subtle hover
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // Link - Inline text style
        link: 'text-primary underline-offset-4 hover:underline',
        // Glass - For dark overlays with premium feel
        glass:
          'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
