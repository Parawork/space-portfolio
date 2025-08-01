# Email Setup Guide for Contact Form

Your contact form now supports email functionality! Here are two options to set up email sending:

## Option 1: Server-side Email with Nodemailer (Recommended)

### 1. Gmail Setup
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

### 2. Environment Variables
Create a `.env.local` file in your project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 3. Alternative Email Providers
You can also use other providers by modifying the transporter in `/src/app/api/send-email/route.ts`:

#### Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

#### Custom SMTP:
```javascript
const transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Option 2: Client-side Email with EmailJS

### 1. EmailJS Setup
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your Service ID, Template ID, and Public Key

### 2. Environment Variables
Add to your `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key
```

### 3. Switch to EmailJS
To use EmailJS instead of the server-side API, modify the contact form:

```javascript
// In the handleSubmit function, change:
await sendEmail(formData as ContactFormData);
// To:
await sendEmail(formData as ContactFormData, true); // true enables EmailJS
```

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email inbox for the notification
5. The sender should receive an auto-reply

## Features Included

✅ **Email Notification**: You receive an email when someone submits the form
✅ **Auto-reply**: Sender gets a confirmation email
✅ **Beautiful HTML Templates**: Professional-looking emails
✅ **Terminal Feedback**: Real-time updates in the terminal UI
✅ **Error Handling**: Graceful error handling with user feedback
✅ **Form Validation**: Required field validation
✅ **Responsive Design**: Works on all devices

## Troubleshooting

### Common Issues:

1. **"Authentication failed"**: Check your app password and email
2. **"Service unavailable"**: Verify your email service configuration
3. **"Environment variables missing"**: Ensure `.env.local` is in project root
4. **Emails not sending**: Check console for error messages

### Debug Mode:
To enable debug logging, add to your `.env.local`:
```env
DEBUG=nodemailer:*
```

## Security Notes

- Never commit your `.env.local` file to version control
- Use app passwords instead of regular passwords
- Consider rate limiting for production use
- Validate and sanitize form inputs

## Production Deployment

When deploying to Vercel, Netlify, or other platforms:
1. Add environment variables in the platform's dashboard
2. Ensure your email provider allows connections from the deployment platform
3. Consider using a dedicated email service like SendGrid for high volume

Your contact form is now ready to send real emails! 🚀
