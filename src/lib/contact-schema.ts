import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'nameRequired'),
  email: z.string().min(1, 'emailRequired').email('emailInvalid'),
  company: z.string().optional(),
  message: z.string().min(1, 'messageRequired').min(10, 'messageTooShort'),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
  // Timestamp for timing check
  timestamp: z.number(),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Minimum time (ms) between page load and form submission
// to help prevent bot submissions
export const MIN_SUBMIT_TIME = 3000
