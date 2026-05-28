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

 
}
