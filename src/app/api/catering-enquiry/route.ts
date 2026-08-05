import { NextRequest } from 'next/server'
import { sendBookingEmail } from '@/lib/email'
import { appendToGoogleSheet } from '@/lib/googleSheets'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, eventType, eventDate, guestCount } = body

    if (!name || !email || !eventType || !eventDate || !guestCount) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendBookingEmail(`Catering Enquiry - ${eventType}`, body)
    await appendToGoogleSheet('Contact', body)

    return Response.json({ success: true })
  } catch {
    return Response.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
