'use client';

import { useTranslations } from 'next-intl';
import { Section, SectionHeader } from '../layout/Section';

export function SolutionSection() {
  const t = useTranslations('solution');

  return (
    <Section gradient>
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          description={t('description')}
        />
      </div>
    </Section>
  );
}
