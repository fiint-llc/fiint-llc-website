'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import {
  openPositions,
  type JobPosition,
  careerApplicationSchema,
  type CareerApplicationData,
  MAX_CV_SIZE,
  ALLOWED_CV_TYPES,
  MIN_SUBMIT_TIME,
} from '@/lib/careers-schema'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function JobCard({ job, onApply }: { job: JobPosition; onApply: (job: JobPosition) => void }) {
  const t = useTranslations('careers.positions')
  const tCommon = useTranslations('careers')

  return (
    <Card className="p-6 lg:p-8 hover:border-primary-500/30 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-heading text-foreground mb-3">{t(job.titleKey)}</h3>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {t(job.locationKey)}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {t(job.typeKey)}
            </div>
          </div>

          <p className="text-body text-muted-foreground mb-4">{t(job.descriptionKey)}</p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              {tCommon('requirements')}
            </h4>
            <ul className="space-y-1">
              {job.requirementsKeys.map((key, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2 leading-5"
                >
                  <span className="text-primary-500">•</span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {job.niceToHaveKeys && job.niceToHaveKeys.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {tCommon('niceToHave')}
              </h4>
              <ul className="space-y-1">
                {job.niceToHaveKeys.map((key, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2 leading-5"
                  >
                    <span className="text-secondary-500">•</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:ml-8 lg:flex-shrink-0">
          <Button onClick={() => onApply(job)} className="gap-2">
            <Briefcase className="h-4 w-4" />
            {tCommon('applyNow')}
          </Button>
        </div>
      </div>
    </Card>
  )
}

function ApplicationModal({ job, onClose }: { job: JobPosition; onClose: () => void }) {
  const t = useTranslations('careers')
  const tPositions = useTranslations('careers.positions')
  const tValidation = useTranslations('careers.form.validation')

  const [status, setStatus] = React.useState<FormStatus>('idle')
  const [cvFile, setCvFile] = React.useState<File | null>(null)
  const [cvError, setCvError] = React.useState<string | null>(null)
  const [pageLoadTime] = React.useState(() => Date.now())
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerApplicationData>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      jobId: job.id,
      jobTitle: tPositions(job.titleKey),
      website: '',
      timestamp: pageLoadTime,
    },
  })

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setCvError(null)

    if (!file) {
      setCvFile(null)
      return
    }

    if (file.size > MAX_CV_SIZE) {
      setCvError(tValidation('cvTooLarge'))
      setCvFile(null)
      return
    }

    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      setCvError(tValidation('cvInvalidType'))
      setCvFile(null)
      return
    }

    setCvFile(file)
  }

  const onSubmit = async (data: CareerApplicationData) => {
    // Update timestamp
    data.timestamp = pageLoadTime

    // Client-side timing check
    // eslint-disable-next-line react-hooks/purity
    if (Date.now() - pageLoadTime < MIN_SUBMIT_TIME) {
      setStatus('success')
      reset()
      return
    }

    setStatus('submitting')

    try {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email)
      formData.append('message', data.message || '')
      formData.append('jobId', data.jobId)
      formData.append('jobTitle', data.jobTitle)
      formData.append('website', data.website || '')
      formData.append('timestamp', String(pageLoadTime))

      if (cvFile) {
        formData.append('cv', cvFile)
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
        reset()
        setCvFile(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const getErrorMessage = (field: keyof CareerApplicationData) => {
    const error = errors[field]
    if (!error?.message) return null
    return tValidation(error.message as Parameters<typeof tValidation>[0])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-border text-foreground"
        style={{ backgroundColor: 'hsl(var(--card))' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 border-b border-border px-6 py-4 flex items-center justify-between z-10"
          style={{ backgroundColor: 'hsl(var(--card))' }}
        >
          <div>
            <h2 className="text-heading text-foreground">{t('form.title')}</h2>
            <p className="text-sm text-muted-foreground">{tPositions(job.titleKey)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-heading text-foreground mb-2">{t('form.success.title')}</h3>
              <p className="text-body text-muted-foreground mb-6">
                {t('form.success.description')}
              </p>
              <Button variant="outline" onClick={onClose}>
                {t('form.success.close')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t('form.error.title')}</p>
                    <p className="text-sm opacity-80">{t('form.error.description')}</p>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName">{t('form.firstName')}</Label>
                  <Input
                    id="firstName"
                    placeholder={t('form.firstNamePlaceholder')}
                    {...register('firstName')}
                    className={cn('mt-1.5', errors.firstName && 'border-red-500')}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{getErrorMessage('firstName')}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName">{t('form.lastName')}</Label>
                  <Input
                    id="lastName"
                    placeholder={t('form.lastNamePlaceholder')}
                    {...register('lastName')}
                    className={cn('mt-1.5', errors.lastName && 'border-red-500')}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">{getErrorMessage('lastName')}</p>
                  )}
                </div>
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

              {/* CV Upload */}
              <div>
                <Label>{t('form.cv')}</Label>
                <div className="mt-1.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-describedby="cv-help"
                  />

                  {cvFile ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50">
                      <FileText className="h-5 w-5 text-primary-500" />
                      <span className="flex-1 text-sm truncate">{cvFile.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCvFile(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        'w-full p-4 rounded-lg border-2 border-dashed transition-colors',
                        'hover:border-primary-500/50 hover:bg-muted/50',
                        cvError ? 'border-red-500' : 'border-border'
                      )}
                    >
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="h-6 w-6" />
                        <span className="text-sm">{t('form.cvUpload')}</span>
                      </div>
                    </button>
                  )}

                  {cvError && <p className="text-xs text-red-500 mt-1">{cvError}</p>}
                  <p id="cv-help" className="text-xs text-muted-foreground mt-1">
                    {t('form.cvHelp')}
                  </p>
                </div>
              </div>

              {/* Message (optional) */}
              <div>
                <Label htmlFor="message">{t('form.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('form.messagePlaceholder')}
                  rows={4}
                  {...register('message')}
                  className="mt-1.5"
                />
              </div>

              {/* Hidden fields */}
              <input type="hidden" {...register('jobId')} />
              <input type="hidden" {...register('jobTitle')} />
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
      </div>
    </div>
  )
}

export default function CareersPage() {
  const t = useTranslations('careers')
  const tCommon = useTranslations('common')

  const [selectedJob, setSelectedJob] = React.useState<JobPosition | null>(null)

  return (
    <>
      <Section className="pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="h-4 w-4" />
              {tCommon('backToHome')}
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              {t('label')}
            </span>
            <h1 className="text-display-sm lg:text-display text-foreground mb-4">{t('title')}</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl">{t('description')}</p>
          </div>

          {/* Open Positions */}
          {openPositions.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-subheading text-foreground">{t('openPositions')}</h2>
              {openPositions.map((job) => (
                <JobCard key={job.id} job={job} onApply={setSelectedJob} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">{t('noPositions')}</p>
            </Card>
          )}

          {/* General application note */}
          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
            <h3 className="text-subheading text-foreground mb-2">
              {t('generalApplication.title')}
            </h3>
            <p className="text-body text-muted-foreground">{t('generalApplication.description')}</p>
          </div>
        </div>
      </Section>

      {/* Application Modal */}
      {selectedJob && <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>
  )
}
