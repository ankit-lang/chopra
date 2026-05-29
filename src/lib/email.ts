import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendBookingEmail(subject: string, payload: Record<string, any>) {
  const customerEmail = payload.email || payload.customerEmail
  const gmailUser = process.env.GMAIL_USER
  
  const lines = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600;text-transform:capitalize">${k}</td><td style="padding:4px 0">${v}</td></tr>`)
    .join('')

  const html = `
    <h2 style="margin-bottom:16px">📅 New Booking: ${subject}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${lines}
    </table>
  `

  // Send to customer email
  if (customerEmail) {
    await transporter.sendMail({
      from: gmailUser,
      to: customerEmail,
      subject: `Booking Confirmation - ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })}`,
      html,
    })
  }

  // Send to restaurant admin
  await transporter.sendMail({
    from: gmailUser,
    to: gmailUser,
    subject: `New Booking - ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })}`,
    html,
  })
}