// Ultramsg WhatsApp Service (FREE - 100 messages/month)
// Sign up at: https://ultramsg.com/
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

    if (!response.ok) {
      console.error('Ultramsg HTTP error:', response.status)
      return false
    }

    const data = await response.json()
    return data.status === 'sent' || data.success === true
  } catch (error) {
    console.error('Ultramsg error:', error)
    return false
  }
}

// Fallback: CallMeBot (FREE, no setup required)
async function sendViaCallMeBot(phone: string, message: string): Promise<boolean> {
  try {
    const formattedPhone = phone.replace(/[^0-9]/g, '')
    const params = new URLSearchParams({
      phone: formattedPhone,
      text: message,
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

export async function sendWhatsAppMessage(phone: string, message: string): Promise<boolean> {
  // Try Ultramsg first (has credential check)
  const success = await sendViaUltramsg(phone, message)
  if (success) return true

  // Fallback to CallMeBot if Ultramsg not configured
  return await sendViaCallMeBot(phone, message)
}