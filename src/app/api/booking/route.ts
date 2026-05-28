import { NextResponse } from 'next/server'
import { sendBookingEmail } from '@/lib/email'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { payload } = body
    if (!payload) return NextResponse.json({ success: false, error: 'Missing payload' }, { status: 400 })

    // Fire-and-forget: kick off notifications but respond immediately so user stays on page
    ;
    (async () => {
      try {
        await sendBookingEmail('Booking', payload)
      } catch (err) {
        console.error('Failed sending email notification', err)
      }

     
    })()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Server execution error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal processing failed' }, { status: 500 })
  }
}