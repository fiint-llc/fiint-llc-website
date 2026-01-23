'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const tCommon = useTranslations('common')

  const sections = [1, 2, 3, 4]

  return (
    <Section className="pt-32">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {tCommon('backToHome')}
          </Button>
        </Link>

        {/* Header */}
        <h1 className="text-display-sm lg:text-display text-foreground mb-4">{t('title')}</h1>
        <p className="text-muted-foreground mb-8">{t('lastUpdated')}</p>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-body-lg text-muted-foreground mb-8">{t('content.intro')}</p>

          {sections.map((num) => (
            <div key={num} className="mb-8">
              <h2 className="text-heading text-foreground mb-3">
                {t(`content.sections.${num}.title`)}
              </h2>
              <p className="text-body text-muted-foreground">
                {t(`content.sections.${num}.content`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
