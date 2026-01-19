'use client';

import { useTranslations } from 'next-intl';
import { Code2, Server, Cloud } from 'lucide-react';
import { Section, SectionHeader } from '../layout/Section';

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  cloud: Cloud,
};

const categoryColors = {
  frontend: 'bg-primary-500/10 text-primary-600',
  backend: 'bg-secondary-500/10 text-secondary-600',
  cloud: 'bg-accent-500/10 text-accent-600',
};

export function TechnologiesSection() {
  const t = useTranslations('technologies');

  const categories = ['frontend', 'backend', 'cloud'] as const;

  return (
    <Section sectionId="technologies" warm>
      <SectionHeader
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category];
          const colorClass = categoryColors[category];
          const items = t.raw(`categories.${category}.items`) as string[];

          return (
            <div
              key={category}
              className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="text-heading-sm text-foreground mb-3">
                {t(`categories.${category}.title`)}
              </h3>

              {/* Tech list */}
              <div className="flex flex-wrap gap-4">
                {items.map((tech: string) => (
                  <span
                    key={tech}
                    className="py-1.5 text-sm rounded-full bg-muted text-muted-foreground font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="py-1.5 text-sm text-muted-foreground/60 italic block">
                {t('andMore')}
              </span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
