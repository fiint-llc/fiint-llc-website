'use client';

import { useTranslations } from 'next-intl';
import { Search, PenTool, Rocket } from 'lucide-react';
import { Section, SectionHeader } from '../layout/Section';

const stepIcons = [Search, PenTool, Rocket];

export function HowItWorksSection() {
  const t = useTranslations('howItWorks');

  const steps = stepIcons.map((icon, index) => ({
    key: String(index + 1),
    number: index + 1,
    icon,
  }));

  return (
    <Section sectionId="how-it-works" className="bg-orbs relative">
      <SectionHeader
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map(({ key, number, icon: Icon }, index) => (
          <div
            key={key}
            className="relative text-center"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Connector line (hidden on mobile and last item) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
            )}

            {/* Step number with icon */}
            <div className="relative inline-flex">
              <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 text-primary-500" />
              </div>
              <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center">
                {number}
              </span>
            </div>

            <h3 className="text-heading-sm text-foreground mb-2">
              {t(`steps.${key}.title`)}
            </h3>
            <p className="text-body text-muted-foreground max-w-xs mx-auto">
              {t(`steps.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
