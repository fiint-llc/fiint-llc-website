'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '../layout/Section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordion'

export function FAQSection() {
  const t = useTranslations('faq')

  // Build FAQ items from translations
  const faqItems = [1, 2, 3, 4, 5, 6].map((num) => ({
    question: t(`items.${num}.question`),
    answer: t(`items.${num}.answer`),
    value: `item-${num}`,
  }))

  return (
    <Section sectionId="faq">
      <div className="max-w-3xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} />

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
