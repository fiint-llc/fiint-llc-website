import { NextResponse } from 'next/server';
import {
  careerApplicationSchema,
  MIN_SUBMIT_TIME,
  MAX_CV_SIZE,
  ALLOWED_CV_TYPES,
} from '@/lib/careers-schema';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '3', 10);
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Cleanup rate limit map occasionally
    if (Math.random() < 0.1) {
      cleanupRateLimitMap();
    }

    // Parse multipart form data
    const formData = await request.formData();

    // Extract fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const jobId = formData.get('jobId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const website = formData.get('website') as string;
    const timestamp = parseInt(formData.get('timestamp') as string, 10);
    const cvFile = formData.get('cv') as File | null;

    // Validate with schema
    const result = careerApplicationSchema.safeParse({
      firstName,
      lastName,
      email,
      message,
      jobId,
      jobTitle,
      website,
      timestamp,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Anti-spam: Check honeypot field
    if (website && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    // Anti-spam: Check submission timing
    const submissionTime = Date.now() - timestamp;
    if (submissionTime < MIN_SUBMIT_TIME) {
      return NextResponse.json({ success: true });
    }

    // Validate CV file if provided
    let cvBuffer: Buffer | null = null;
    let cvFilename: string | null = null;

    if (cvFile && cvFile.size > 0) {
      // Check file size
      if (cvFile.size > MAX_CV_SIZE) {
        return NextResponse.json(
          { error: 'CV file is too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }

      // Check file type
      if (!ALLOWED_CV_TYPES.includes(cvFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload a PDF or Word document.' },
          { status: 400 }
        );
      }

      cvBuffer = Buffer.from(await cvFile.arrayBuffer());
      cvFilename = cvFile.name;
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log('Career application submission (SMTP not configured):', {
        firstName,
        lastName,
        email,
        jobId,
        jobTitle,
        hasCV: !!cvBuffer,
        message: message?.substring(0, 100),
      });
      return NextResponse.json({ success: true });
    }

    // Only import nodemailer when SMTP is configured
    const nodemailer = await import('nodemailer');

    // Create SMTP transporter
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const emailContent = `
New job application from FI Int website:

Position: ${jobTitle}
Job ID: ${jobId}

Applicant Details:
Name: ${firstName} ${lastName}
Email: ${email}

${message ? `Cover Letter / Message:\n${message}\n` : ''}
---
Submitted at: ${new Date().toISOString()}
IP: ${ip}
CV Attached: ${cvBuffer ? 'Yes' : 'No'}
    `.trim();

    // Build email options
    const mailOptions = {
      from: process.env.CONTACT_FROM_EMAIL || 'noreply@fiint.com',
      to: process.env.CAREERS_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'careers@fiint.com',
      replyTo: email,
      subject: `[FI Int Careers] Application for ${jobTitle} from ${firstName} ${lastName}`,
      text: emailContent,
      attachments: undefined as { filename: string; content: Buffer }[] | undefined,
    };

    // Attach CV if provided
    if (cvBuffer && cvFilename) {
      mailOptions.attachments = [
        {
          filename: cvFilename,
          content: cvBuffer,
        },
      ];
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
