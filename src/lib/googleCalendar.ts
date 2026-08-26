import { google } from 'googleapis'

/**
 * Creates a table reservation event directly in Google Calendar via Google Calendar API.
 * Required Environment Variables in .env:
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL: Service Account client_email
 * - GOOGLE_PRIVATE_KEY: Service Account private_key (with escaped \n or real linebreaks)
 * - GOOGLE_CALENDAR_ID: The calendar ID (defaults to info@chopras.nl)
 */
export async function createGoogleCalendarEvent(payload: Record<string, any>) {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let privateKey = process.env.GOOGLE_PRIVATE_KEY
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'info@chopras.nl'

  if (!serviceAccountEmail || !privateKey) {
    console.warn(
      '[GoogleCalendar] Skipping direct calendar insert: GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY missing in .env'
    )
    return { success: false, skipped: true }
  }

  // Handle line breaks in private key if passed as string in env
  privateKey = privateKey.replace(/\\n/g, '\n')

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Extract booking details
    const customerName = payload.fullName || payload.name || payload.customerName || 'Valued Customer'
    const customerEmail = payload.email || payload.customerEmail || ''
    const phone = payload.phone || payload.customerPhone || 'N/A'
    const dateStr = payload.date || payload.eventDate // e.g. "2026-08-30"
    const timeStr = payload.time || payload.eventTime || '18:00' // e.g. "18:30"
    const persons = payload.persons || payload.numGuests || payload.guests || payload.guestCount || '2'
    const notes = payload.notes || payload.message || payload.specialInstructions || 'None'

    if (!dateStr) {
      console.warn('[GoogleCalendar] No date provided in payload, skipping calendar event creation.')
      return { success: false, error: 'Missing date' }
    }

    // Parse start date & time (in Europe/Amsterdam timezone)
    // format expected: dateStr="YYYY-MM-DD", timeStr="HH:MM"
    const [year, month, day] = dateStr.split('-').map(Number)
    const [hours, minutes] = timeStr.split(':').map(Number)

    if (!year || !month || !day || isNaN(hours) || isNaN(minutes)) {
      console.warn('[GoogleCalendar] Invalid date/time format:', { dateStr, timeStr })
      return { success: false, error: 'Invalid date/time format' }
    }

    // Format ISO dateTime string for Amsterdam (CET/CEST)
    const pad = (n: number) => String(n).padStart(2, '0')
    const startIso = `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00`
    
    // Default duration: 2 hours
    const endHours = hours + 2
    const endDay = day + Math.floor(endHours / 24)
    const finalEndHours = endHours % 24
    const endIso = `${year}-${pad(month)}-${pad(endDay)}T${pad(finalEndHours)}:${pad(minutes)}:00`

    const attendees = [
      { email: 'info@chopras.nl', displayName: 'Chopras Info' },
      { email: 'choprasstreetfood@gmail.com', displayName: 'Chopras Admin' },
    ]

    if (customerEmail && customerEmail.includes('@')) {
      attendees.push({ email: customerEmail, displayName: customerName })
    }

    const event = {
      summary: `Table Reservation: ${customerName} (${persons} Persons)`,
      location: 'Chopras Indian Restaurant, Leyweg 986, 2545 GV Den Haag',
      description: `
Table Reservation Details:
- Name: ${customerName}
- Guests: ${persons}
- Date: ${dateStr}
- Time: ${timeStr}
- Phone: ${phone}
- Email: ${customerEmail || 'Not provided'}
- Notes/Requests: ${notes}
      `.trim(),
      start: {
        dateTime: startIso,
        timeZone: 'Europe/Amsterdam',
      },
      end: {
        dateTime: endIso,
        timeZone: 'Europe/Amsterdam',
      },
      attendees: attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 },
          { method: 'email', minutes: 120 },
        ],
      },
    }

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      sendUpdates: 'all', // Send calendar emails to attendees automatically
    })

    console.log('[GoogleCalendar] Reservation event created successfully:', response.data.htmlLink)
    return { success: true, eventLink: response.data.htmlLink, eventId: response.data.id }
  } catch (error: any) {
    console.error('[GoogleCalendar] Error creating calendar event:', error?.message || error)
    return { success: false, error: error?.message || 'Calendar event creation failed' }
  }
}
