// Simple email notification service using Resend API

const RESEND_API_URL = 'https://api.resend.com/emails'

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from?: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const defaultFrom = process.env.CONTACT_EMAIL_TO || 'info@chopras.nl'

  if (!apiKey) {
    console.warn('Resend API key not configured, skipping email send')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: from || defaultFrom,
        to: [to],
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
      return { success: false, error: 'Failed to send email' }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'Email service error' }
  }
}

export async function sendReservationNotification(
  reservation: {
    fullName: string
    email: string
    phone: string
    date: string
    time: string
    persons: string
    foundVia?: string
    dob?: string
    notes?: string
  }
): Promise<{ success: boolean; error?: string }> {
  const ownerEmail = process.env.CONTACT_EMAIL_TO || 'info@chopras.nl'

  // Send notification to restaurant owner
  const ownerHtml = `
    <h2>New Reservation Received</h2>
    <p><strong>Name:</strong> ${reservation.fullName}</p>
    <p><strong>Phone:</strong> ${reservation.phone}</p>
    <p><strong>Email:</strong> ${reservation.email}</p>
    <p><strong>Date:</strong> ${reservation.date}</p>
    <p><strong>Time:</strong> ${reservation.time}</p>
    <p><strong>Persons:</strong> ${reservation.persons}</p>
    ${reservation.foundVia ? `<p><strong>Found via:</strong> ${reservation.foundVia}</p>` : ''}
    ${reservation.dob ? `<p><strong>DOB:</strong> ${reservation.dob}</p>` : ''}
    ${reservation.notes ? `<p><strong>Notes:</strong> ${reservation.notes}</p>` : ''}
    <p><em>Sent from Chopras website reservation form</em></p>
  `

  const ownerResult = await sendEmail(
    ownerEmail,
    `New Reservation: ${reservation.fullName} - ${reservation.date}`,
    ownerHtml
  )

  // Send confirmation to customer
  const customerHtml = `
    <h2>Reservation Confirmation</h2>
    <p>Dear ${reservation.fullName},</p>
    <p>Thank you for your reservation at <strong>Chopras Indian Restaurant</strong>.</p>
    <p>We have received your booking for:</p>
    <ul>
      <li><strong>Date:</strong> ${reservation.date}</li>
      <li><strong>Time:</strong> ${reservation.time}</li>
      <li><strong>Persons:</strong> ${reservation.persons}</li>
    </ul>
    <p>We will confirm your reservation shortly via phone or WhatsApp.</p>
    <p><strong>Chopras Indian Restaurant</strong><br>
    Leyweg 986<br>
    The Netherlands</p>
  `

  const customerResult = await sendEmail(
    reservation.email,
    'Reservation Received - Chopras Indian Restaurant',
    customerHtml
  )

  // Return success if at least one email was sent
  if (ownerResult.success || customerResult.success) {
    return { success: true }
  }

  return { success: false, error: 'Failed to send notifications' }
}
