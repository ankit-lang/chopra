import { NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

type Reservation = {
  id: string
  date: string
  time: string
  email: string
  persons: string
  fullName: string
  phone: string
  foundVia?: string
  dob?: string
  notes?: string
  createdAt: string
}

async function saveReservation(res: Reservation) {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    const file = path.join(dataDir, 'reservations.json')
    let arr: Reservation[] = []
    try {
      const raw = await fs.readFile(file, 'utf8')
      arr = JSON.parse(raw)
      if (!Array.isArray(arr)) arr = []
    } catch (e) {
      arr = []
    }
    arr.push(res)
    await fs.writeFile(file, JSON.stringify(arr, null, 2), 'utf8')
  } catch (e) {
    console.error('Failed to save reservation', e)
  }
}

import { sendText } from '@/lib/whatsapp/baileysClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, email, persons, fullName, phone, foundVia, dob, notes } = body

    if (!date || !time || !email || !persons || !fullName || !phone) {
      return Response.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const reservation: Reservation = {
      id: String(Date.now()),
      date,
      time,
      email,
      persons: String(persons),
      fullName,
      phone,
      foundVia,
      dob,
      notes,
      createdAt: new Date().toISOString(),
    }

    // Save to local data file (data/reservations.json)
    await saveReservation(reservation)

    // Prepare WhatsApp message for owner
    const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER || '8178573528'
    const ownerMsgLines = [
      'New reservation received',
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Persons: ${persons}`,
    ]
    if (dob) ownerMsgLines.push(`DOB: ${dob}`)
    if (foundVia) ownerMsgLines.push(`Found via: ${foundVia}`)
    if (notes) ownerMsgLines.push(`Notes: ${notes}`)

    const ownerMessage = ownerMsgLines.join('\n')

    // Send to owner
    await sendWhatsAppMessage(ownerNumber, ownerMessage)

    // Send confirmation to customer (normalize NL phone numbers)
    let customerNumber = String(phone || '').replace(/[^0-9]/g, '')
    if (customerNumber.startsWith('0')) customerNumber = customerNumber.slice(1)
    if (!customerNumber.startsWith('31')) customerNumber = '31' + customerNumber

    const customerMessage = `Dear ${fullName}, thank you for your reservation at Chopras Indian Restaurant. We have received your booking for ${date} at ${time} for ${persons} people. We will confirm shortly. - Chopras Indian Restaurant, Leyweg 986`

    await sendWhatsAppMessage(customerNumber, customerMessage)

    return Response.json({ success: true })
  } catch (err) {
    console.error('Reservation API error', err)
    return Response.json({ success: false, error: 'Invalid request' }, { status: 500 })
  }
}
