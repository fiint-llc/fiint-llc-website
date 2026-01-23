'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { MessageSquare, Clock, Layers, Sparkles } from 'lucide-react'
import { Section, SectionHeader } from '../layout/Section'
import { Button } from '../ui/Button'

const factorIcons = [Layers, Clock, Sparkles]

export function PricingSection() {
  const t = useTranslations('pricing')

  const factors = factorIcons.map((icon, index) => ({
    key: String(index + 1),
    icon,
  }))

  return (
    <Section sectionId="pricing">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          description={t('description')}
          align="center"
        />

        {/* Pricing factors */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 mb-12">
          {factors.map(({ key, icon: Icon }) => (
            <div key={key} className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-heading-sm text-foreground mb-2">{t(`factors.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`factors.${key}.description`)}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-border">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="h-6 w-6 text-primary-500" />
            <h3 className="text-heading text-foreground">{t('cta.title')}</h3>
          </div>
          <p className="text-body text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <Link href="#contact">
            <Button size="lg">{t('cta.button')}</Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}
