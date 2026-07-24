import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@chopras.nl',
    pass: 'qhbilfenlwtpetgz',
  },
} as any)

const ADMIN_EMAIL = 'info@chopras.nl'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
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

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Vacancy application error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    )
  }
}
