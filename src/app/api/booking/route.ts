import { NextResponse } from 'next/server'
import { notifyChannels } from '@/lib/notifications'
import { appendToGoogleSheet } from '@/lib/googleSheets'
import { sendBookingEmail } from '@/lib/email'
import { createGoogleCalendarEvent } from '@/lib/googleCalendar'
import { isMondayInAmsterdam } from '@/lib/openingHours'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { payload, type } = body
    const data = payload || body

    if (!data) {
      return NextResponse.json({ success: false, error: 'Missing payload' }, { status: 400 })
    }

    const typeStr = String(type || data.type || data.serviceType || 'Booking')
    const tabName = typeStr.toLowerCase().includes('reservation') || typeStr.toLowerCase().includes('table') ? 'Reservation' : 'Contact'

    const reservationDate = data.date || data.eventDate
    if (reservationDate && isMondayInAmsterdam(reservationDate)) {
      return NextResponse.json(
        { success: false, error: 'We are closed on Mondays (Netherlands time). Reservations are unavailable on Mondays.' },
        { status: 400 }
      )
    }

    // 1. Send confirmation & alert emails via Nodemailer
    await sendBookingEmail(typeStr, data)

    // 2. Insert event directly into Google Calendar (if reservation)
    // if (tabName === 'Reservation') {
    //   await createGoogleCalendarEvent(data).catch(err => console.error('[Booking API] createGoogleCalendarEvent error:', err))
    // }

    // 3. Notify channels & append to Google Sheet asynchronously
    // await notifyChannels(0, typeStr, data).catch(err => console.error('[Booking API] notifyChannels error:', err))
    await appendToGoogleSheet(tabName, data).catch(err => console.error('[Booking API] appendToGoogleSheet error:', err))

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Booking API] Server execution error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal processing failed' }, { status: 500 })
  }
}