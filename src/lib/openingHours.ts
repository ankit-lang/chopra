export interface OpeningStatus {
  isClosed: boolean
  reason?: 'monday' | 'before_opening' | 'after_cutoff'
  messageEn: string
  messageNl: string
}

export function getAmsterdamTime(date: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Amsterdam',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  let hours = 0
  let minutes = 0
  let weekday = 'Sun'

  for (const part of parts) {
    if (part.type === 'hour') {
      hours = parseInt(part.value, 10) % 24
    } else if (part.type === 'minute') {
      minutes = parseInt(part.value, 10)
    } else if (part.type === 'weekday') {
      weekday = part.value
    }
  }

  return { hours, minutes, weekday, totalMinutes: hours * 60 + minutes }
}

export function checkOpeningStatus(date: Date = new Date()): OpeningStatus {
  try {
    const { hours, minutes, weekday, totalMinutes } = getAmsterdamTime(date)

    // Monday closure check (restaurant closed on Mondays)
    if (weekday === 'Mon') {
      return {
        isClosed: true,
        reason: 'monday',
        messageEn: 'We are closed on Mondays. We welcome you back tomorrow from 16:30!',
        messageNl: 'Wij zijn op maandag gesloten. U bent morgen vanaf 16:30 weer van harte welkom!',
      }
    }

    const openTimeMinutes = 16 * 60 + 30   // 16:30 (4:30 PM) -> 990 mins
    const cutoffTimeMinutes = 21 * 60 + 30 // 21:30 (9:30 PM) -> 1290 mins

    if (totalMinutes < openTimeMinutes) {
      return {
        isClosed: true,
        reason: 'before_opening',
        messageEn: 'Ordering opens at 16:30 today. Last order cutoff is 21:30.',
        messageNl: 'Bestellen is vandaag mogelijk vanaf 16:30. De laatste besteltijd is 21:30.',
      }
    }

    if (totalMinutes >= cutoffTimeMinutes) {
      return {
        isClosed: true,
        reason: 'after_cutoff',
        messageEn: 'Orders cannot be placed after 9:30 PM (21:30). The last pickup time is 10:00 PM (22:00). We welcome you back tomorrow from 16:30!',
        messageNl: 'Bestellingen kunnen niet meer worden geplaatst na 21:30. De laatste ophaaltijd is 22:00. U bent morgen vanaf 16:30 weer van harte welkom!',
      }
    }

    return {
      isClosed: false,
      messageEn: '',
      messageNl: '',
    }
  } catch (err) {
    console.error('Error checking opening status:', err)
    // Fail-safe default: treat as closed if error occurs
    return {
      isClosed: true,
      reason: 'after_cutoff',
      messageEn: 'Orders cannot be placed right now. Please call us at +31 6 30645930.',
      messageNl: 'Bestellingen kunnen nu niet worden geplaatst. Bel ons op +31 6 30645930.',
    }
  }
}

export const ALL_PICKUP_TIMES = [
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
]

export function getAvailablePickupTimes(date: Date = new Date()): string[] {
  const status = checkOpeningStatus(date)
  if (status.isClosed) {
    return []
  }

  const { totalMinutes } = getAmsterdamTime(date)
  
  // Require pickup time to be at least 15 minutes after current order time
  return ALL_PICKUP_TIMES.filter((timeStr) => {
    const [h, m] = timeStr.split(':').map(Number)
    const slotMinutes = h * 60 + m
    return slotMinutes >= totalMinutes + 15
  })
}
