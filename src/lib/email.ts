import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user:  'info@chopras.nl',
    pass: 'hagfztaegpmxvzni',
  },
})

export async function sendBookingEmail(subject: string, payload: Record<string, any>) {
  const customerEmail = payload.email || payload.customerEmail || payload.customer_email
  const customerName = payload.fullName || payload.name || payload.customer_name || 'Valued Customer'
  const gmailUser = process.env.GMAIL_USER || 'info@chopras.nl'
  const adminEmails = ['info@chopras.nl', 'choprasstreetfood@gmail.com']
  
  const lines = Object.entries(payload)
    .filter(([k, v]) => v !== undefined && v !== null && v !== '' && typeof v !== 'object')
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:600;text-transform:capitalize;color:#06068a;">${k.replace(/([A-Z])/g, ' $1')}</td><td style="padding:6px 0;color:#1a1a1a;">${v}</td></tr>`)
    .join('')

  const dateStr = payload.date || payload.eventDate
  const timeStr = payload.time || payload.eventTime || '18:00'
  let calendarHtml = ''

  if (dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number)
    const [hours, minutes] = timeStr.split(':').map(Number)
    if (year && month && day && !isNaN(hours) && !isNaN(minutes)) {
      const startDateObj = new Date(year, month - 1, day, hours, minutes)
      const endDateObj = new Date(year, month - 1, day, hours + 2, minutes)
      const toIsoCompact = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      const datesParam = `${toIsoCompact(startDateObj)}/${toIsoCompact(endDateObj)}`
      const persons = payload.persons || payload.numGuests || payload.guests || '2'
      const title = `Table Reservation: ${customerName} (${persons} Persons)`
      const location = 'Chopras Indian Restaurant, Leyweg 986, 2545 GV Den Haag'
      const details = `Reservation Details:\nName: ${customerName}\nGuests: ${persons}\nPhone: ${payload.phone || 'N/A'}\nEmail: ${customerEmail || 'N/A'}`

      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${datesParam}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
      const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&startdt=${startDateObj.toISOString()}&enddt=${endDateObj.toISOString()}&body=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`

      calendarHtml = `
        <div style="margin:20px 0;padding:16px;background:#f0f4ff;border-radius:8px;border:1px solid #c7d2fe;text-align:center;">
          <p style="margin:0 0 12px 0;font-weight:bold;color:#06068a;font-size:14px;">📅 Add Reservation to Calendar</p>
          <a href="${googleUrl}" target="_blank" style="display:inline-block;background:#4285F4;color:#ffffff;padding:8px 16px;margin:4px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">
            Add to Google Calendar
          </a>
          <a href="${outlookUrl}" target="_blank" style="display:inline-block;background:#0078D4;color:#ffffff;padding:8px 16px;margin:4px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">
            Add to Outlook Calendar
          </a>
        </div>
      `
    }
  }

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
      <div style="background:#06068a;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h1 style="color:#ffffff;margin:0;font-size:22px;">Chopras Indian Restaurant</h1>
        <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">New Submission: ${subject}</p>
      </div>
      <div style="padding:32px;background:#ffffff;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
        <h2 style="color:#06068a;font-size:18px;margin-top:0;">Details:</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;background:#F7F8FC;padding:16px;border-radius:8px;">
          ${lines}
        </table>
        ${calendarHtml}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#888;font-size:12px;">Chopras Indian Restaurant · Leyweg 986, Den Haag · +31 6 30645930</p>
      </div>
    </div>
  `

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
      <div style="background:#06068a;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h1 style="color:#ffffff;margin:0;font-size:22px;">Chopras Indian Restaurant</h1>
        <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">${subject}</p>
      </div>
      <div style="padding:32px;background:#ffffff;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
        <h2 style="color:#06068a;font-size:18px;margin-top:0;">Thank you, ${customerName}!</h2>
        <p style="color:#555;line-height:1.6;">We have received your enquiry. Our team will get back to you shortly.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;background:#F7F8FC;padding:16px;border-radius:8px;">
          ${lines}
        </table>
        ${calendarHtml}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#888;font-size:12px;">Chopras Indian Restaurant · Leyweg 986, Den Haag · +31 6 30645930</p>
      </div>
    </div>
  `

  const emailPromises = []
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })

  // 1. Queue email to customer
  if (customerEmail) {
    emailPromises.push(
      transporter.sendMail({
        from: `"Chopras Indian Restaurant" <${gmailUser}>`,
        to: customerEmail,
        replyTo: 'info@chopras.nl',
        subject: `Enquiry Confirmation - ${subject} [${timestamp}]`,
        html: customerHtml,
      }).catch(err => console.error('[Nodemailer] Customer email error:', err))
    )
  }

  // 2. Queue email to restaurant admins (info@chopras.nl & choprasstreetfood@gmail.com)
  emailPromises.push(
    transporter.sendMail({
      from: `"Chopras Website" <${gmailUser}>`,
      to: adminEmails, 
      subject: `New Request [${subject}] - ${timestamp}`,
      html: adminHtml,
    }).catch(err => console.error('[Nodemailer] Admin email error:', err))
  )

  await Promise.all(emailPromises)
}