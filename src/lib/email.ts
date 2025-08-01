export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Send email using server-side API route
export const sendEmail = async (formData: ContactFormData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API email error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send email via API');
  }
};


