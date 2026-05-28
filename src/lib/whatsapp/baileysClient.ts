import path from 'path'
import fs from 'fs'
import { makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode } from '@adiwajshing/baileys'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const authFile = path.join(dataDir, 'baileys_auth_info.json')
const { state, saveState } = useSingleFileAuthState(authFile)

let sock: ReturnType<typeof makeWASocket> | null = null

async function initSock() {
  if (sock) return sock
  const { version } = await fetchLatestBaileysVersion()
  const store = makeInMemoryStore({})

  sock = makeWASocket({ auth: state, printQRInTerminal: true, version })

  sock.ev.on('creds.update', saveState)
  sock.ev.on('connection.update', (update) => {
    // eslint-disable-next-line no-console
    console.log('Baileys connection update', update)
  })

  // bind store
  store.bind(sock.ev)

  return sock
}

export async function sendText(to: string, text: string) {
  try {
    const s = await initSock()
    // ensure JID format
    let jid = to
    if (!to.endsWith('@s.whatsapp.net')) {
      jid = `${to}@s.whatsapp.net`
    }
    const res = await s.sendMessage(jid, { text })
    return res
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Baileys sendText error', err)
    throw err
  }
}

export async function getSocket() {
  return await initSock()
}
