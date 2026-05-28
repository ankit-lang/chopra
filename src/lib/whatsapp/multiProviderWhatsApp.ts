// Multi-provider WhatsApp service with fallback options
// Prioritizes FREE services first

interface WhatsAppProvider {
  name: string
  isFree: boolean
  send: (phone: string, message: string) => Promise<boolean>
}

// Provider 1: Ultramsg (FREE tier - up to 100 messages/month)
async function sendViaUltramsg(phone: string, message: string): Promise<boolean> {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID
  const token = process.env.ULTRAMSG_TOKEN

  if (!instanceId || !token) {
    console.warn('Ultramsg credentials not configured')
    return false
  }

  try {
    const response = await fetch(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phone,
          body: message,
          token,
        }),
      }
    )

    const data = await response.json()
    return data.status === 'sent'
  } catch (error) {
    console.error('Ultramsg error:', error)
    return false
  }
}

// Provider 2: CallMeBot (FREE - requires WhatsApp friend setup)
async function sendViaCallMeBot(phone: string, message: string): Promise<boolean> {
  const apiKey = process.env.CALLMEBOT_API_KEY

  if (!apiKey) {
    console.warn('CallMeBot API key not configured')
    return false
  }

  try {
    const params = new URLSearchParams({
      phone: phone.replace(/[^0-9]/g, ''),
      text: message,
      apikey: apiKey,
    })

    const response = await fetch(
      `https://api.callmebot.com/whatsapp.php?${params.toString()}`,
      { method: 'GET' }
    )

    return response.ok
  } catch (error) {
    console.error('CallMeBot error:', error)
    return false
  }
}

// Provider 3: Waboxapp (PAID)
async function sendViaWaboxapp(phone: string, message: string): Promise<boolean> {
  const apiKey = process.env.WABOXAPP_API_KEY
  const uid = process.env.WABOXAPP_UID

  if (!apiKey || !uid) {
    console.warn('Waboxapp credentials not configured')
    return false
  }

  try {
    const response = await fetch(
      `https://www.waboxapp.com/api/send/chat?uid=${uid}&token=${apiKey}&to=${phone}&text=${encodeURIComponent(message)}`,
      { method: 'GET' }
    )

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Waboxapp error:', error)
    return false
  }
}

// Provider 4: Twilio (PAID)
async function sendViaTwilio(phone: string, message: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio credentials not configured')
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

    return response.ok
  } catch (error) {
    console.error('Twilio error:', error)
    return false
  }
}

// Main function that tries FREE providers first, then paid
export async function sendWhatsAppMessage(
  phone: string,
  message: string
): Promise<{ success: boolean; provider?: string; error?: string }> {
  const providers: WhatsAppProvider[] = [
    { name: 'Ultramsg (FREE)', isFree: true, send: sendViaUltramsg },
    { name: 'CallMeBot (FREE)', isFree: true, send: sendViaCallMeBot },
    { name: 'Waboxapp (PAID)', isFree: false, send: sendViaWaboxapp },
    { name: 'Twilio (PAID)', isFree: false, send: sendViaTwilio },
  ]

  for (const provider of providers) {
    try {
      console.log(`Trying WhatsApp provider: ${provider.name}`)
      const result = await provider.send(phone, message)
      if (result) {
        console.log(`WhatsApp message sent via ${provider.name}`)
        return { success: true, provider: provider.name }
      }
    } catch (error) {
      console.error(`${provider.name} failed:`, error)
    }
  }

  return { success: false, error: 'All WhatsApp providers failed' }
}
