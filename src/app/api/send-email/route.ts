import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 emails per 15 minutes per IP

  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Sanitize input to prevent XSS and injection
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before sending another message.' },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Additional validation
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (sanitizedSubject.length < 3 || sanitizedSubject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be between 3 and 200 characters' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('📧 DEMO MODE: Email configuration not found');
      console.log('Email would be sent with the following details:');
      console.log('From:', sanitizedName, '<' + sanitizedEmail + '>');
      console.log('Subject:', sanitizedSubject);
      console.log('Message:', sanitizedMessage);
      console.log('To: parakrama.22@cse.mrt.ac.lk');
      console.log('Client IP:', clientIP);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { 
          message: 'Message received successfully (Demo Mode)', 
          mode: 'demo',
          note: 'Email configuration not set up. Check EMAIL_SETUP.md for instructions.'
        },
        { status: 200 }
      );
    }

    // Create transporter using Gmail (you can change this to other providers)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // SECURITY: Only send email TO YOU with the contact details
    // DO NOT send auto-reply to prevent email spoofing
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER, // Always use your own email as sender
      to: 'parakrama.22@cse.mrt.ac.lk', // Your email where you want to receive messages
      replyTo: sanitizedEmail, // Set reply-to so you can easily respond
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404; font-weight: bold;">
              ⚠️ SECURITY NOTE: This email is from your contact form. The sender's email is set as reply-to.
            </p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Client IP:</strong> ${clientIP}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${sanitizedMessage}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
            <p style="margin: 0; color: #065f46;">
              <strong>To reply:</strong> Simply click reply to this email, and it will be sent to ${sanitizedEmail}
            </p>
          </div>
          
          <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
            <p>This message was sent from your portfolio contact form.</p>
          </footer>
        </div>
      `,
    };    // REMOVED AUTO-REPLY FUNCTIONALITY TO PREVENT EMAIL SPOOFING
    // Auto-replies can be abused to send emails to innocent people
    // Instead, users will see a success message on the website

    // Send only the notification email to you
    await transporter.sendMail(mailOptionsToYou);

    return NextResponse.json(
      { 
        message: 'Message sent successfully! I will get back to you soon.',
        note: 'For security reasons, no auto-reply email is sent. You will receive a personal response.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
