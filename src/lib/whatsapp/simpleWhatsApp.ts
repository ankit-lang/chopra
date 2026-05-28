// Simple HTTP-based WhatsApp message sender
// Uses CallMeBot API or similar service to send messages without complex authentication

const WHATSAPP_API_URL = 'https://api.callmebot.com/whatsapp.php'

async function sendWhatsAppMessage(phone: string, message: string, apiKey?: string): Promise<boolean> {
  try {
    // Format phone number (remove special characters, ensure international format)
    const formattedPhone = phone.replace(/[^0-9]/g, '')
    
    // Using CallMeBot API as an example - you'll need to sign up at callmebot.com
    // Alternative: Use Twilio, MessageBird, or WhatsApp Business API
    const params = new URLSearchParams({
      phone: formattedPhone,
      text: message,
      ...(apiKey && { apikey: apiKey }),
    })

    const response = await fetch(`${WHATSAPP_API_URL}?${params.toString()}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.error('WhatsApp API error:', response.status, response.statusText)
      return false
    }

    const result = await response.text()
    console.log('WhatsApp API response:', result)
    return true
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error)
    return false
  }
}

// Alternative: Use a more reliable service like Twilio
async function sendWhatsAppViaTwilio(phone: string, message: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio credentials not configured, skipping WhatsApp send')
    return false
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        },
        body: new URLSearchParams({
          From: `whatsapp:${fromNumber}`,
          To: `whatsapp:${phone}`,
          Body: message,
        }),
      }
    )

    if (!response.ok) {
      console.error('Twilio WhatsApp error:', response.status, response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to send WhatsApp via Twilio:', error)
    return false
  }
}

// Main function to send WhatsApp message
export async function sendWhatsAppMessageDirect(
  phone: string,
  message: string,
  method: 'callmebot' | 'twilio' = 'callmebot'
): Promise<{ success: boolean; error?: string }> {
  try {
    let success = false

    if (method === 'twilio') {
      success = await sendWhatsAppViaTwilio(phone, message)
    } else {
      const apiKey = process.env.CALLMEBOT_API_KEY
      success = await sendWhatsAppMessage(phone, message, apiKey)
    }

    if (success) {
      return { success: true }
    } else {
      return { success: false, error: 'Failed to send WhatsApp message' }
    }
  } catch (error) {
    console.error('WhatsApp send error:', error)
    return { success: false, error: 'WhatsApp service error' }
  }
}
