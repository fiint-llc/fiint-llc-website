import { NextResponse } from 'next/server';
import { contactSchema, MIN_SUBMIT_TIME } from '@/lib/contact-schema';

// Simple in-memory rate limiting (serverless-safe for basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
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

// Clean up old entries periodically
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

    // Parse and validate request body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, message, website, timestamp } = result.data;

    // Anti-spam: Check honeypot field
    if (website && website.length > 0) {
      // Silently accept (likely bot) but don't send email
      return NextResponse.json({ success: true });
    }

    // Anti-spam: Check submission timing
    const submissionTime = Date.now() - timestamp;
    if (submissionTime < MIN_SUBMIT_TIME) {
      // Silently accept (likely bot) but don't send email
      return NextResponse.json({ success: true });
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log('Contact form submission (SMTP not configured):', {
        name,
        email,
        company,
        message: message.substring(0, 100) + '...',
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
New contact form submission from FI Int website:

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
IP: ${ip}
    `.trim();

    ['CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL'].forEach((name) => {
      if (!process.env[name]) {
        throw new Error(`${name} env variable is not set`);
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[FI Int Contact] New message from ${name}`,
      text: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
