'use client'
import { useEffect } from 'react'

export default function ReservationForm() {
  useEffect(() => {
    const existing = document.getElementById('ghl-reservation-script')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://link.msgsndr.com/js/form_embed.js'
      script.async = true
      script.id = 'ghl-reservation-script'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full" style={{ minHeight: '715px' }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/wdJCxomjpJr1GhDsgmvv"
        style={{
          width: '100%',
          height: '715px',
          border: 'none',
          borderRadius: '3px',
        }}
        id="inline-wdJCxomjpJr1GhDsgmvv"
        data-layout={'{"id":"INLINE"}'}
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Book Your Table Form"
        data-height="715"
        data-layout-iframe-id="inline-wdJCxomjpJr1GhDsgmvv"
        data-form-id="wdJCxomjpJr1GhDsgmvv"
        title="Book Your Table Form"
      />
    </div>
  )
}
