import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import fs from 'fs'
import path from 'path'

// Persist across Next.js hot reloads — global survives module re-evaluation
declare global {
  var __waClient: Client | undefined
  var __waReady: boolean
}

function init() {
  // Already running — don't spawn a second browser
  if (global.__waClient) return

  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  })

  global.__waClient = client
  global.__waReady = false

  client.on('qr', (qr) => {
    console.log('\n\n📱 ===== SCAN THIS QR WITH WHATSAPP =====')
    qrcode.generate(qr, { small: false })
    console.log('========================================\n')
  })

  client.on('authenticated', () => {
    console.log('✅ WhatsApp authenticated — session saved')
  })

  client.on('ready', () => {
    global.__waReady = true
    console.log('✅ WhatsApp client ready')
  })

  client.on('disconnected', (reason) => {
    console.warn('⚠️  WhatsApp disconnected:', reason)
    global.__waReady = false
    global.__waClient = undefined
    setTimeout(init, 5000)
  })

  client.initialize().catch((err) => {
    console.error('❌ WhatsApp init error:', err)
    global.__waClient = undefined
  })
}

init()

function waitUntilReady(timeout = 600_000): Promise<void> {
  if (global.__waReady) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const deadline = setTimeout(
      () => reject(new Error('WhatsApp not ready — scan the QR in terminal')),
      timeout
    )
    const check = setInterval(() => {
      if (global.__waReady) {
        clearInterval(check)
        clearTimeout(deadline)
        resolve()
      }
    }, 500)
  })
}

export async function sendWhatsAppMessage(phone: string, message: string) {
  console.log('📲 Attempting WhatsApp to:', phone)
  await waitUntilReady()
  const chatId = `${phone.replace(/\D/g, '')}@c.us`
  console.log('📲 Sending to chatId:', chatId)
  const result = await global.__waClient!.sendMessage(chatId, message)
  console.log('✅ WhatsApp sent:', result.id)
}

/**
 * Log out and destroy the WhatsApp client. Optionally remove LocalAuth session files.
 * @param removeSessionFolder - when true, deletes the `.wwebjs_auth` folder from project root
 */
export async function logoutWhatsApp(removeSessionFolder = false) {
  const client = global.__waClient
  if (!client) {
    console.log('ℹ️  No WhatsApp client running')
    return
  }

  try {
    // Attempt graceful logout
    // some versions of whatsapp-web.js support `logout()`; if not, destroy anyway
    if (typeof (client as any).logout === 'function') {
      await (client as any).logout()
      console.log('✅ WhatsApp logged out')
    }
  } catch (err) {
    console.warn('⚠️  Error during logout:', err)
  }

  try {
    await client.destroy()
    console.log('✅ WhatsApp client destroyed')
  } catch (err) {
    console.warn('⚠️  Error destroying client:', err)
  }

  global.__waReady = false
  global.__waClient = undefined

  if (removeSessionFolder) {
    const folder = path.resolve(process.cwd(), '.wwebjs_auth')
    try {
      await fs.promises.rm(folder, { recursive: true, force: true })
      console.log('✅ Removed LocalAuth session folder:', folder)
    } catch (err) {
      console.warn('⚠️  Failed to remove session folder:', err)
    }
  }
}