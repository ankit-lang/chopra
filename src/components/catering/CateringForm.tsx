'use client'
import { useEffect } from 'react'

export default function CateringForm() {
  useEffect(() => {
    const existing = document.getElementById('ghl-catering-script')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://link.msgsndr.com/js/form_embed.js'
      script.async = true
      script.id = 'ghl-catering-script'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full" style={{ minHeight: '909px' }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/VkZCksqsWh6sfbX1uWzh"
        style={{
          width: '100%',
          height: '909px',
          border: 'none',
          borderRadius: '3px',
        }}
        id="inline-VkZCksqsWh6sfbX1uWzh"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Catering/Event/Party"
        data-height="909"
        data-layout-iframe-id="inline-VkZCksqsWh6sfbX1uWzh"
        data-form-id="VkZCksqsWh6sfbX1uWzh"
        title="Catering/Event/Party"
      />
    </div>
  )
}
