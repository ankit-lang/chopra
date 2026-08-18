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