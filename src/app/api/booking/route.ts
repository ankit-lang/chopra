import { NextResponse } from 'next/server'
import { notifyChannels } from '@/lib/notifications'
import { appendToGoogleSheet } from '@/lib/googleSheets'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { payload, type } = body
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Missing payload' }, { status: 400 })
    }

    const typeStr = String(type || payload.type || 'Booking')
    const tabName = typeStr.toLowerCase().includes('reservation') || typeStr.toLowerCase().includes('table') ? 'Reservation' : 'Contact'

    await notifyChannels(0, typeStr, payload)
    await appendToGoogleSheet(tabName, payload)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Server execution error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal processing failed' }, { status: 500 })
  }
}