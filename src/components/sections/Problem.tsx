'use client'

import { useTranslations } from 'next-intl'
import { Database, Layers, Clock } from 'lucide-react'
import { Section, SectionHeader } from '../layout/Section'

const icons = [Database, Layers, Clock]

export function ProblemSection() {
  const t = useTranslations('problem')

  const points = icons.map((icon, index) => ({
    key: String(index + 1),
    icon,
  }))

  return (
    <Section sectionId="problem">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid md:grid-cols-3 gap-6 stagger-children">
        {points.map(({ key, icon: Icon }) => (
          <div key={key} className="card-elevated p-8 group">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 transition-colors group-hover:bg-primary-500/10">
              <Icon className="h-7 w-7 text-muted-foreground group-hover:text-primary-600 transition-colors" />
            </div>
            <h3 className="text-heading-sm text-foreground mb-3">{t(`points.${key}.title`)}</h3>
            <p className="text-body text-muted-foreground leading-relaxed">
              {t(`points.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
