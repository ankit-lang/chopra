import { sendBookingEmail } from './email'
import { sendWhatsAppMessage } from './whatsapp'
import { markNotified, getBookingById } from './db'

async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 1000) {
  let lastErr: any
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, delayMs * (i + 1)))
    }
  }
  throw lastErr
}

export async function notifyChannels(id: number, type: string, payload: any) {
  // Email
  try {
    await retry(() => sendBookingEmail(type, payload))
    markNotified(id, 'email')
  } catch (err) {
    console.error('Failed sending email notification', err)
  }

  // WhatsApp message formatting
  const phone = payload.phone || payload.phoneNumber || payload.tel || payload.phone_number
  if (phone) {
    const formattedPhone = phone.replace(/\D/g, '')
    const msgLines = []
    msgLines.push(`New ${type} received`)
    if (payload.fullName || payload.name) msgLines.push(`Name: ${payload.fullName || payload.name}`)
    if (formattedPhone) msgLines.push(`Phone: +${formattedPhone}`)
    if (payload.email) msgLines.push(`Email: ${payload.email}`)
    if (payload.date || payload.eventDate) msgLines.push(`Date: ${payload.date || payload.eventDate}`)
    if (payload.time) msgLines.push(`Time: ${payload.time}`)
    if (payload.persons || payload.guestCount) msgLines.push(`Guests: ${payload.persons || payload.guestCount}`)
    if (payload.message || payload.notes) msgLines.push(`Notes: ${payload.message || payload.notes}`)

    const message = msgLines.join('\n')

    try {
      await retry(() => sendWhatsAppMessage(process.env.NOTIFY_WHATSAPP_NUMBER || '31630645930', message))
      markNotified(id, 'whatsapp')
    } catch (err) {
      console.error('Failed sending whatsapp notification', err)
    }
  } else {
    console.warn('No phone provided in payload; skipping WhatsApp notification')
  }
}
