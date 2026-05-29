import { sendBookingEmail } from './email'
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
  // Email notification with retry
  try {
    await retry(() => sendBookingEmail(type, payload))

  } catch (err) {
    console.error('Failed sending email notification', err)
  }
}
