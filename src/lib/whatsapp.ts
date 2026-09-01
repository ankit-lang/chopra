// --- Meta Official WhatsApp Cloud API & Fallbacks ---

/**
 * Sends an official WhatsApp message via Meta Cloud API using approved templates.
 * 
 * Required in .env:
 * - WHATSAPP_PHONE_NUMBER_ID: Meta Phone Number ID (e.g. 109283746592817)
 * - WHATSAPP_ACCESS_TOKEN: Permanent System User Access Token from Meta Business Manager
 */
export async function sendMetaWhatsAppTemplate(
  toPhone: string,
  templateName: string,
  languageCode: string = 'en',
  bodyParameters: string[] = []
): Promise<{ success: boolean; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!phoneNumberId || !accessToken) {
    console.warn('[MetaWhatsApp] Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN in .env')
    return { success: false, error: 'Meta WhatsApp credentials missing' }
  }

  // Format phone number to numbers only (e.g., +31 6 12345678 -> 31612345678)
  const cleanPhone = toPhone.replace(/[^0-9]/g, '')

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'template',
          template: {
            name: templateName,
            language: { code: languageCode },
            components: bodyParameters.length > 0 ? [
              {
                type: 'body',
                parameters: bodyParameters.map((text) => ({ type: 'text', text })),
              },
            ] : [],
          },
        }),
      }
    )

    const data = await response.json()
    if (!response.ok) {
      console.error('[MetaWhatsApp] API Error:', data)
      return { success: false, error: data.error?.message || 'Failed to send Meta WhatsApp message' }
    }

    console.log('[MetaWhatsApp] Message sent successfully:', data.messages?.[0]?.id)
    return { success: true }
  } catch (error: any) {
    console.error('[MetaWhatsApp] Request failed:', error)
    return { success: false, error: error.message || 'WhatsApp network error' }
  }
}

/**
 * Ultramsg Fallback Helper
 */
async function sendViaUltramsg(phone: string, message: string): Promise<boolean> {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID
  const token = process.env.ULTRAMSG_TOKEN

  if (!instanceId || !token) {
    return false
  }

  try {
    const response = await fetch(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: phone, body: message, token }),
      }
    )
    const data = await response.json()
    return response.ok && (data.status === 'sent' || data.success === true)
  } catch {
    return false
  }
}

/**
 * CallMeBot Fallback Helper
 */
async function sendViaCallMeBot(phone: string, message: string): Promise<boolean> {
  try {
    const formattedPhone = phone.replace(/[^0-9]/g, '')
    const params = new URLSearchParams({ phone: formattedPhone, text: message })
    const response = await fetch(`https://api.callmebot.com/whatsapp.php?${params.toString()}`)
    return response.ok
  } catch {
    return false
  }
}

import { sendGreenApiSelfMessage } from './greenApi'

export { sendGreenApiSelfMessage }

export async function sendWhatsAppMessage(phone: string, message: string): Promise<boolean> {
  const greenApiRes = await sendGreenApiSelfMessage(message)
  if (greenApiRes.success) return true

  const ultramsgOk = await sendViaUltramsg(phone, message)
  if (ultramsgOk) return true
  return await sendViaCallMeBot(phone, message)
}