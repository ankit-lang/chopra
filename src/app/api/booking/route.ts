import { NextResponse } from 'next/server'
import { notifyChannels } from '@/lib/notifications'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { payload } = body
    if (!payload) return NextResponse.json({ success: false, error: 'Missing payload' }, { status: 400 })

    // Fire-and-forget: send email notification but respond immediately
    ;(async () => {
      try {
        await notifyChannels(0, 'Booking', payload)
      } catch (err) {
        console.error('Failed sending notifications', err)
      }
    })()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Server execution error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal processing failed' }, { status: 500 })
  }
}