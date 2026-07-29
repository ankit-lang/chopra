import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@chopras.nl',
    pass: 'hagfztaegpmxvzni',
  },
} as any)

const ADMIN_EMAIL = 'info@chopras.nl'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const email = (formData.get('email') as string) || ''
    const education = formData.get('education') as string
    const interest = formData.get('interest') as string
    const jobTitle = formData.get('jobTitle') as string
    const resumeFile = formData.get('resume') as File | null

    if (!fullName || !phone || !jobTitle) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const emailHtmlBody = `
      <h2>New Job Application: ${jobTitle}</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      <p><strong>Education:</strong> ${education || 'Not provided'}</p>
      <p><strong>Area of Interest:</strong> ${interest || 'Not provided'}</p>
    `

    const mailOptions: any = {
      from: '"Chopras Careers" <info@chopras.nl>',
      to: ADMIN_EMAIL,
      subject: `New Application for ${jobTitle} - ${fullName}`,
      html: emailHtmlBody,
    }

    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      mailOptions.attachments = [
        {
          filename: resumeFile.name,
          content: buffer,
        }
      ]
    }

    let mailDelivered = false
    let whatsappDelivered = false

    try {
      await transporter.sendMail(mailOptions)
      mailDelivered = true
    } catch (mailError) {
      console.error('Mail not delivered:', mailError)
    }

    // ==========================================
    // WHATSAPP LEAD PIPELINE
    // ==========================================
    try {
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

      const whatsappData: Record<string, any> = {
        serviceType: 'Chopras Job Application',
        fullName: fullName,
        phone: phone,
        message: `Date: ${currentDate} | Position: ${jobTitle} | Education: ${education || 'Not provided'} | Interest: ${interest || 'Not provided'}`,
      }

      if (email) whatsappData.email = email

      const whatsappResponse = await fetch('https://whatsapp-0gwb.onrender.com/api/v1/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(whatsappData),
      })

      if (whatsappResponse.ok) {
        whatsappDelivered = true
      } else {
        console.error('WhatsApp not delivered', {
          status: whatsappResponse.status,
          statusText: whatsappResponse.statusText,
        })
      }
    } catch (waErr) {
      console.error('WhatsApp not delivered:', waErr)
    }

    return NextResponse.json({
      success: true,
      mailDelivered,
      whatsappDelivered,
      message: 'Application submitted successfully',
    })
  } catch (error) {
    console.error('Vacancy application error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    )
  }
}
