'use client';

import { useTranslations } from 'next-intl';
import { Target, Users, Key, Lightbulb } from 'lucide-react';
import { Section, SectionHeader } from '../layout/Section';

const pointIcons = [Target, Users, Key, Lightbulb];

export function WhyUsSection() {
  const t = useTranslations('whyUs');

  const points = pointIcons.map((icon, index) => ({
    key: String(index + 1),
    icon,
  }));

  return (
    <Section sectionId="about" gradient>
      <SectionHeader
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {points.map(({ key, icon: Icon }, index) => (
          <div
            key={key}
            className="flex gap-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary-500/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-secondary-500" />
            </div>
            <div>
              <h3 className="text-heading-sm text-foreground mb-1">
                {t(`points.${key}.title`)}
              </h3>
              <p className="text-body text-muted-foreground">
                {t(`points.${key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
