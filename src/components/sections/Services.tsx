'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, Link2, Zap, FileText, LineChart, Code2 } from 'lucide-react';
import { Section, SectionHeader } from '../layout/Section';

const serviceIcons = [BarChart3, Link2, Zap, FileText, LineChart, Code2];

export function ServicesSection() {
  const t = useTranslations('services');

  const services = serviceIcons.map((icon, index) => ({
    key: String(index + 1),
    icon,
  }));

  return (
    <Section sectionId="services" className="bg-circuit relative">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {services.map(({ key, icon: Icon }) => (
          <div key={key} className="card-elevated p-8 group">
            <div className="w-14 h-14 rounded-2xl icon-container-primary mb-6">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="text-heading-sm text-foreground mb-3">{t(`items.${key}.title`)}</h3>
            <p className="text-body text-muted-foreground leading-relaxed">
              {t(`items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
