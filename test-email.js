// Quick test for email functionality
// Run this with: node test-email.js

const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com", 
    subject: "Test Message",
    message: "This is a test message to verify email functionality."
  };

  try {
    console.log('🧪 Testing contact form email functionality...');
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('📧 Response:', result);
    
    if (response.ok) {
      console.log('✅ Email test successful!');
      if (result.mode === 'demo') {
        console.log('🔧 Running in demo mode - check console for email details');
      }
    } else {
      console.log('❌ Email test failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Email test error:', error.message);
  }
};

testContactForm();
