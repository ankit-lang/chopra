import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

const DB_FILE = process.env.DATABASE_FILE || path.join(DATA_DIR, 'bookings.db')
const JSON_FILE = path.join(DATA_DIR, 'bookings.json')

export type BookingRecord = {
  id?: number
  idempotency_key: string
  hash: string
  type: string
  payload: string // JSON string
  created_at?: string
  notified_email?: number
  notified_whatsapp?: number
}

export function computeBookingHash(obj: any) {
  const s = JSON.stringify(obj)
  return crypto.createHash('sha256').update(s).digest('hex')
}

let usingSqlite = false
let sqliteDb: any = null

try {
  // try loading better-sqlite3 dynamically; if not present, fall back to file store
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const BetterSqlite3 = require('better-sqlite3')
  sqliteDb = new BetterSqlite3(DB_FILE)
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idempotency_key TEXT UNIQUE,
      hash TEXT UNIQUE,
      type TEXT,
      payload TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      notified_email INTEGER DEFAULT 0,
      notified_whatsapp INTEGER DEFAULT 0
    );
  `)
  usingSqlite = true
} catch (err) {
  // fallback to JSON file store
  if (!fs.existsSync(JSON_FILE)) fs.writeFileSync(JSON_FILE, JSON.stringify({ lastId: 0, rows: [] }, null, 2))
}

function readJsonStore() {
  try {
    return JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))
  } catch (err) {
    return { lastId: 0, rows: [] }
  }
}

function writeJsonStore(obj: any) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(obj, null, 2))
}

export function saveBooking(idempotencyKey: string, type: string, payloadObj: any) {
  const hash = computeBookingHash({ type, payload: payloadObj })
  const payload = JSON.stringify(payloadObj)
  if (usingSqlite && sqliteDb) {
    try {
      const stmt = sqliteDb.prepare('INSERT INTO bookings (idempotency_key, hash, type, payload) VALUES (?, ?, ?, ?)')
      const info = stmt.run(idempotencyKey, hash, type, payload)
      return { inserted: true, id: info.lastInsertRowid, hash }
    } catch (err: any) {
      if (err?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        const row = sqliteDb.prepare('SELECT * FROM bookings WHERE idempotency_key = ? OR hash = ?').get(idempotencyKey, hash)
        return { inserted: false, existing: row }
      }
      throw err
    }
  }

  // JSON fallback
  const store = readJsonStore()
  const exists = store.rows.find((r: any) => r.idempotency_key === idempotencyKey || r.hash === hash)
  if (exists) return { inserted: false, existing: exists }
  const id = (store.lastId || 0) + 1
  const row: BookingRecord = {
    id,
    idempotency_key: idempotencyKey,
    hash,
    type,
    payload,
    created_at: new Date().toISOString(),
    notified_email: 0,
    notified_whatsapp: 0,
  }
  store.lastId = id
  store.rows.push(row)
  writeJsonStore(store)
  return { inserted: true, id, hash }
}

export function markNotified(id: number, channel: 'email' | 'whatsapp') {
  if (usingSqlite && sqliteDb) {
    const col = channel === 'email' ? 'notified_email' : 'notified_whatsapp'
    sqliteDb.prepare(`UPDATE bookings SET ${col} = 1 WHERE id = ?`).run(id)
    return
  }
  const store = readJsonStore()
  const row = store.rows.find((r: any) => r.id === id)
  if (row) {
    if (channel === 'email') row.notified_email = 1
    else row.notified_whatsapp = 1
    writeJsonStore(store)
  }
}

export function getBookingById(id: number) {
  if (usingSqlite && sqliteDb) {
    return sqliteDb.prepare('SELECT * FROM bookings WHERE id = ?').get(id)
  }
  const store = readJsonStore()
  return store.rows.find((r: any) => r.id === id)
}

export default usingSqlite ? sqliteDb : null
