'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { Section } from '../layout/Section'
import { Button } from '../ui/Button'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <Section className="pt-28 lg:pt-36 pb-20 lg:pb-28 relative overflow-hidden bg-mesh-clean">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-gradient mb-10 animate-fade-up">
          <Sparkles className="w-4 h-4 text-primary-500" aria-hidden="true" />
          <span className="font-medium">{t('tagline')}</span>
        </div>

        {/* Main headline */}
        <h1 className="text-display-sm md:text-display lg:text-display-lg text-foreground mb-8 animate-fade-up animation-delay-100">
          {t('title')}
        </h1>

        {/* Description */}
        <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up animation-delay-200 leading-relaxed">
          {t('description')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
          <Link href="#contact">
            <Button size="lg" className="gap-2 px-8">
              {t('cta.primary')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#services">
            <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm bg-background/50">
              {t('cta.secondary')}
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 animate-bounce">
          <Link
            href="#problem"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary-500 transition-colors group"
            aria-label="Scroll to learn more"
          >
            <span className="text-xs uppercase tracking-widest font-medium opacity-60 group-hover:opacity-100 transition-opacity">
              {t('discover')}
            </span>
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </Section>
  )
}
