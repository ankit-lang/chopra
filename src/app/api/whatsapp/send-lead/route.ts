import { NextResponse } from 'next/server'
import { sendGreenApiSelfMessage, formatLeadToWhatsAppMessage } from '@/lib/greenApi'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    let messageText = ''
    if (typeof body === 'string') {
      messageText = body
    } else if (body.message && Object.keys(body).length === 1) {
      messageText = body.message
    } else {
      messageText = formatLeadToWhatsAppMessage(body)
    }

    const result = await sendGreenApiSelfMessage(messageText)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send WhatsApp message via Green API', details: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (error: any) {
    console.error('[API send-lead] Error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
