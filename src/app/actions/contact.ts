'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormResult {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  formData: ContactFormData
): Promise<ContactFormResult> {
  const { name, email, message } = formData

  // Validate inputs
  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required' }
  }

  if (!email.includes('@')) {
    return { success: false, error: 'Invalid email address' }
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <contact@junghard.com>',
      to: process.env.CONTACT_EMAIL || 'hello@junghard.com',
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}
