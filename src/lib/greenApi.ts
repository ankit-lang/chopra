/**
 * Helper module for sending WhatsApp self-messages via Green API.
 * https://console.green-api.com
 */

export interface GreenApiLeadData {
  formType?: string
  serviceType?: string
  fullName?: string
  name?: string
  email?: string
  phone?: string
  eventDate?: string
  date?: string
  eventTime?: string
  time?: string
  numGuests?: string | number
  guests?: string | number
  persons?: string | number
  venue?: string
  eventType?: string
  cateringType?: string
  vegNonVeg?: string
  additionalNotes?: string
  notes?: string
  message?: string
  dietaryRequirements?: string
  foundVia?: string
  [key: string]: any
}

export async function sendGreenApiSelfMessage(messageText: string): Promise<{ success: boolean; data?: any; error?: any }> {
  const primaryApiUrl = (process.env.GREEN_API_URL || 'https://7107.api.greenapi.com').replace(/\/$/, '')
  const idInstance = (process.env.GREEN_API_ID_INSTANCE || '710722724956').trim()
  const apiToken = (process.env.GREEN_API_TOKEN_INSTANCE || 'ae5eef92d65c4f679747e3ab40ee13787dfcb883159e4fc5b1').trim()
  const rawPhone = (process.env.GREEN_API_TARGET_PHONE || '31630645930').trim()

  console.log(`[GreenAPI Debug] Using idInstance: "${idInstance}", token (len ${apiToken.length}): "${apiToken.slice(0, 6)}...${apiToken.slice(-4)}"`)

  const cleanPhone = rawPhone.replace(/[^0-9]/g, '')
  const chatId = cleanPhone.includes('@') ? cleanPhone : `${cleanPhone}@c.us`

  const candidateUrls = [
    `${primaryApiUrl}/waInstance${idInstance}/sendMessage/${apiToken}`,
    `https://7107.api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
    `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
    `https://api.greenapi.com/waInstance${idInstance}/sendMessage/${apiToken}`
  ]

  // Remove duplicates
  const urlsToTry = Array.from(new Set(candidateUrls))

  let lastError: any = null

  for (const url of urlsToTry) {
    try {
      console.log(`[GreenAPI] Sending request to ${url} for chatId ${chatId}...`)
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          message: messageText,
        }),
      })

      const rawText = await res.text()
      let data: any = null
      try {
        data = rawText ? JSON.parse(rawText) : {}
      } catch (parseErr) {
        console.warn(`[GreenAPI] Response from ${url} was not valid JSON (status ${res.status}): "${rawText}"`)
        data = { rawText, status: res.status }
      }

      if (!res.ok) {
        console.error(`[GreenAPI] Error response from ${url} (status ${res.status}):`, data)
        lastError = data
        continue
      }

      console.log(`[GreenAPI] Self message sent successfully via ${url}:`, data?.idMessage || data)
      return { success: true, data }
    } catch (error: any) {
      console.error(`[GreenAPI] Network exception for ${url}:`, error)
      lastError = error.message || error
    }
  }

  return { success: false, error: lastError }
}

export function formatLeadToWhatsAppMessage(data: GreenApiLeadData): string {
  const title = data.formType || data.serviceType || 'New Enquiry'
  const customerName = data.fullName || data.name || 'Not provided'
  const customerPhone = data.phone || 'Not provided'
  const customerEmail = data.email || 'Not provided'
  const date = data.eventDate || data.date
  const time = data.eventTime || data.time
  const guests = data.numGuests || data.guests || data.persons
  const notes = data.additionalNotes || data.notes || data.message

  const lines: string[] = []
  lines.push(`📌 *NEW LEAD: ${title.toUpperCase()}*`)
  lines.push(`👤 *Name:* ${customerName}`)
  lines.push(`📱 *Phone:* ${customerPhone}`)
  lines.push(`📧 *Email:* ${customerEmail}`)

  if (date) lines.push(`📅 *Date:* ${date}`)
  if (time) lines.push(`⏰ *Time:* ${time}`)
  if (guests) lines.push(`👥 *Guests/Persons:* ${guests}`)
  if (data.venue) lines.push(`📍 *Venue:* ${data.venue}`)
  if (data.eventType) lines.push(`🎉 *Event Type:* ${data.eventType}`)
  if (data.cateringType) lines.push(`🍽️ *Catering Type:* ${data.cateringType}`)
  if (data.vegNonVeg) lines.push(`🥗 *Diet Option:* ${data.vegNonVeg}`)
  if (data.dietaryRequirements) lines.push(`⚠️ *Dietary/Instructions:* ${data.dietaryRequirements}`)
  if (data.foundVia) lines.push(`🔍 *Source:* ${data.foundVia}`)
  if (notes && notes !== 'None') lines.push(`📝 *Notes:* ${notes}`)

  return lines.join('\n')
}
