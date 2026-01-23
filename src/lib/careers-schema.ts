import { z } from 'zod'

export const careerApplicationSchema = z.object({
  firstName: z.string().min(1, 'firstNameRequired'),
  lastName: z.string().min(1, 'lastNameRequired'),
  email: z.string().min(1, 'emailRequired').email('emailInvalid'),
  message: z.string().optional(),
  jobId: z.string().min(1),
  jobTitle: z.string().min(1),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
  // Timestamp for timing check
  timestamp: z.number(),
})

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>

// Job position type
export interface JobPosition {
  id: string
  titleKey: string
  locationKey: string
  typeKey: string
  descriptionKey: string
  requirementsKeys: string[]
  niceToHaveKeys?: string[]
}

// Open positions - add new jobs here
export const openPositions: JobPosition[] = [
  {
    id: 'senior-backend-engineer',
    titleKey: 'seniorBackendEngineer.title',
    locationKey: 'seniorBackendEngineer.location',
    typeKey: 'seniorBackendEngineer.type',
    descriptionKey: 'seniorBackendEngineer.description',
    requirementsKeys: [
      'seniorBackendEngineer.requirements.1',
      'seniorBackendEngineer.requirements.2',
      'seniorBackendEngineer.requirements.3',
      'seniorBackendEngineer.requirements.4',
      'seniorBackendEngineer.requirements.5',
    ],
    niceToHaveKeys: ['seniorBackendEngineer.niceToHave.1', 'seniorBackendEngineer.niceToHave.2'],
  },
]

// Maximum file size for CV (5MB)
export const MAX_CV_SIZE = 5 * 1024 * 1024

// Allowed file types for CV
export const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Minimum time (ms) between page load and form submission
export const MIN_SUBMIT_TIME = 3000
