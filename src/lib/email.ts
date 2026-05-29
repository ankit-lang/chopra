import { Resend } from 'resend'

// Setup: Get your Resend API key from https://resend.com
// Then set in .env.local:
//   RESEND_API_KEY=re_xxxxxxxxxxxx
//   EMAIL_TO=info@chopras.nl         ← who receives bookings

const resend = new Resend("re_3rsrQsDa_FY83ykfMTMVPiwxeNopPyfZL")

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

  await resend.emails.send({
   from: 'Booking Bot <onboarding@resend.dev>',
    to:  'info@chopras.nl',
    subject: `New Booking – ${subject}`,
    html,
  })
}