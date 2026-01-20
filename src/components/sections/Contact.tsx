'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Section, SectionHeader } from '../layout/Section';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { contactSchema, type ContactFormData, MIN_SUBMIT_TIME } from '@/lib/contact-schema';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const t = useTranslations('contact');
  const tValidation = useTranslations('contact.error.validation');

  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [pageLoadTime] = React.useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      website: '', // Honeypot
      timestamp: pageLoadTime,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Update timestamp
    data.timestamp = pageLoadTime;

    // Client-side timing check
    // eslint-disable-next-line react-hooks/purity
    if (Date.now() - pageLoadTime < MIN_SUBMIT_TIME) {
      // Silently reject (likely bot)
      setStatus('success');
      reset();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Get translated error message
  const getErrorMessage = (field: keyof ContactFormData) => {
    const error = errors[field];
    if (!error?.message) return null;
    return tValidation(error.message as keyof typeof tValidation);
  };

  return (
    <Section sectionId="contact" warm>
      <div className="max-w-2xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

        {status === 'success' ? (
          <div className="text-center py-12 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-heading text-foreground mb-2">{t('success.title')}</h3>
            <p className="text-body text-muted-foreground">{t('success.description')}</p>
            <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
              {t('success.sendAnother')}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {status === 'error' && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('error.title')}</p>
                  <p className="text-sm opacity-80">{t('error.description')}</p>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">{t('form.name')}</Label>
                <Input
                  id="name"
                  placeholder={t('form.namePlaceholder')}
                  {...register('name')}
                  className={cn('mt-1.5', errors.name && 'border-red-500')}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{getErrorMessage('name')}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">{t('form.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('form.emailPlaceholder')}
                  {...register('email')}
                  className={cn('mt-1.5', errors.email && 'border-red-500')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{getErrorMessage('email')}</p>
                )}
              </div>
            </div>

            {/* Company (optional) */}
            <div>
              <Label htmlFor="company">{t('form.company')}</Label>
              <Input
                id="company"
                placeholder={t('form.companyPlaceholder')}
                {...register('company')}
                className="mt-1.5"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">{t('form.message')}</Label>
              <Textarea
                id="message"
                placeholder={t('form.messagePlaceholder')}
                rows={5}
                {...register('message')}
                className={cn('mt-1.5', errors.message && 'border-red-500')}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1">{getErrorMessage('message')}</p>
              )}
            </div>

            {/* Honeypot field - hidden from users */}
            <div className="hidden" aria-hidden="true">
              <Input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t('form.submitting')}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t('form.submit')}
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}
