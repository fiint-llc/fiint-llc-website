'use client'

import { useTranslations } from 'next-intl'
import { Database, Layers, Clock } from 'lucide-react'
import { Section, SectionHeader } from '../layout/Section'

const icons = [Database, Layers, Clock]
const colors = ['primary', 'secondary', 'accent'] as const

export function ProblemSection() {
  const t = useTranslations('problem')

  const points = [
    { key: '1', icon: icons[0], color: colors[0] },
    { key: '2', icon: icons[1], color: colors[1] },
    { key: '3', icon: icons[2], color: colors[2] },
  ]

  const colorClasses = {
    primary: {
      bg: 'bg-red-500/10 dark:bg-red-500/20',
      icon: 'text-red-500',
      hover: 'group-hover:bg-red-500/15 dark:group-hover:bg-red-500/25',
    },
    secondary: {
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      icon: 'text-orange-500',
      hover: 'group-hover:bg-orange-500/15 dark:group-hover:bg-orange-500/25',
    },
    accent: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      icon: 'text-amber-500',
      hover: 'group-hover:bg-amber-500/15 dark:group-hover:bg-amber-500/25',
    },
  }

  return (
    <Section sectionId="problem" className="bg-mesh-clean relative">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid md:grid-cols-3 gap-6 stagger-children">
        {points.map(({ key, icon: Icon, color }) => {
          const classes = colorClasses[color]
          return (
            <div key={key} className="card-elevated p-8 group">
              <div
                className={`w-14 h-14 rounded-2xl ${classes.bg} ${classes.hover} flex items-center justify-center mb-6 transition-colors`}
              >
                <Icon className={`h-7 w-7 ${classes.icon}`} />
              </div>
              <h3 className="text-heading-sm text-foreground mb-3">{t(`points.${key}.title`)}</h3>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t(`points.${key}.description`)}
              </p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
