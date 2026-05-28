import nodemailer from 'nodemailer'

// Setup: Enable 2FA on Gmail → generate App Password at
// https://myaccount.google.com/apppasswords
// Then set in .env.local:
//   EMAIL_USER=you@gmail.com
//   EMAIL_PASS=xxxx xxxx xxxx xxxx   ← 16-char app password
//   EMAIL_TO=owner@gmail.com         ← who receives bookings

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "info@chopras.nl",
    pass: "izkv qirc tbdo jtle",
  },
})

export async function sendBookingEmail(subject: string, payload: Record<string, any>) {
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

  await transporter.sendMail({
    from: `"Booking Bot" "info@chopras.nl"`,
    to: process.env.EMAIL_TO || "info@chopras.nl",
    subject: `New Booking – ${subject}`,
    html,
  })
}