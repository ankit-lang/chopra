
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
  const adminEmail = 'info@chopras.nl' // Your actual business inbox
  
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

  const emailPromises = []
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })

  // 1. Queue email to customer
  if (customerEmail) {
    emailPromises.push(
      transporter.sendMail({
        from: `"Chopras Booking" <${gmailUser}>`,
        to: customerEmail,
        replyTo: adminEmail, // If customer hits reply, it goes to your business mail
        subject: `Booking Confirmation - ${timestamp}`,
        html,
      })
    )
  }

  // 2. Queue email to restaurant admin (info@chopras.nl)
  emailPromises.push(
    transporter.sendMail({
      from: `"System Alert" <${gmailUser}>`,
      to: adminEmail, 
      subject: `New Booking [${subject}] - ${timestamp}`,
      html,
    })
  )

  // CRITICAL FOR VERCEL: Wait for ALL emails to finish processing 
  // before letting the serverless container spin down.
  await Promise.all(emailPromises)
}