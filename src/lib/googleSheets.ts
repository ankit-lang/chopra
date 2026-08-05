/**
 * Google Sheets Webhook Logger Helper
 * Automatically appends form submissions to specific Google Sheet tabs:
 * - Contact
 * - Reservation
 * - Order
 * - Vacancy
 */

export async function appendToGoogleSheet(tabName: 'Contact' | 'Reservation' | 'Order' | 'Vacancy', data: Record<string, any>) {
  const webhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    'https://script.google.com/macros/s/AKfycbzwRwOmY1oeUcLuZzFkKI82hPKId7HC-y55Y7OB36GwSVOjTpeZWJhX-YNCAprw4bORLg/exec'

  try {
    const payload = {
      tab: tabName,
      timestamp: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' }),
      ...data
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error(`[GoogleSheets] Failed to log to ${tabName}:`, response.statusText)
    }
  } catch (error) {
    console.error(`[GoogleSheets] Error posting to Google Sheets (${tabName}):`, error)
  }
}
