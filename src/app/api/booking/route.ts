import { NextResponse } from 'next/server'
import { notifyChannels } from '@/lib/notifications'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { payload } = body
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Missing payload' }, { status: 400 })
    }

    //  CRITICAL FIX: Await the notification completion directly
    // This forces Vercel to keep the container alive until Nodemailer finishes.
    await notifyChannels(0, 'Booking', payload)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Server execution error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal processing failed' }, { status: 500 })
  }
}