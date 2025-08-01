#!/bin/bash

# Email Setup Script for Space Portfolio
echo "🚀 Setting up email for your portfolio contact form..."
echo

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
    echo "Current email configuration:"
    echo
    grep -E "EMAIL_|EMAILJS_" .env.local 2>/dev/null || echo "No email configuration found in .env.local"
    echo
else
    echo "📝 Creating .env.local file..."
    touch .env.local
fi

echo "Choose your email setup option:"
echo "1. Gmail (Server-side with Nodemailer) - Recommended"
echo "2. EmailJS (Client-side)"
echo "3. Demo mode (No actual emails sent)"
echo
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo
        echo "📧 Setting up Gmail with Nodemailer..."
        echo
        echo "You'll need:"
        echo "1. A Gmail account with 2-factor authentication enabled"
        echo "2. An App Password generated from your Google Account"
        echo
        echo "Steps to get App Password:"
        echo "1. Go to myaccount.google.com"
        echo "2. Security → 2-Step Verification → App passwords"
        echo "3. Select 'Mail' and your device"
        echo "4. Copy the 16-character password"
        echo
        read -p "Enter your Gmail address: " gmail_user
        read -p "Enter your Gmail App Password (16 characters): " gmail_pass
        
        # Add to .env.local
        echo "# Email Configuration (Gmail)" >> .env.local
        echo "EMAIL_USER=$gmail_user" >> .env.local
        echo "EMAIL_PASS=$gmail_pass" >> .env.local
        echo
        echo "✅ Gmail configuration added to .env.local"
        ;;
    2)
        echo
        echo "📧 Setting up EmailJS..."
        echo
        echo "You'll need to:"
        echo "1. Go to emailjs.com and create a free account"
        echo "2. Create an email service (Gmail, Outlook, etc.)"
        echo "3. Create an email template"
        echo "4. Get your Service ID, Template ID, and Public Key"
        echo
        read -p "Enter your EmailJS Service ID: " service_id
        read -p "Enter your EmailJS Template ID: " template_id
        read -p "Enter your EmailJS Public Key: " public_key
        
        # Add to .env.local
        echo "# EmailJS Configuration" >> .env.local
        echo "NEXT_PUBLIC_EMAILJS_SERVICE_ID=$service_id" >> .env.local
        echo "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=$template_id" >> .env.local
        echo "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=$public_key" >> .env.local
        echo
        echo "✅ EmailJS configuration added to .env.local"
        ;;
    3)
        echo
        echo "🔧 Demo mode selected"
        echo "Your contact form will work but emails will only be logged to the console."
        echo "This is perfect for development and testing!"
        echo
        echo "# Demo Mode - No email configuration needed" >> .env.local
        echo "# EMAIL_USER=your-email@gmail.com" >> .env.local
        echo "# EMAIL_PASS=your-app-password" >> .env.local
        echo
        echo "✅ Demo mode configured"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo
echo "🎉 Email setup complete!"
echo
echo "Next steps:"
echo "1. Restart your development server: npm run dev"
echo "2. Test the contact form"
echo "3. Check the terminal/console for email logs"
echo
echo "For detailed setup instructions, see EMAIL_SETUP.md"
