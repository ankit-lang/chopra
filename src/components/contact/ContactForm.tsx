'use client'
import { useEffect } from 'react'

export default function ContactForm() {
  useEffect(() => {
    const existing = document.getElementById('ghl-contact-script')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://link.msgsndr.com/js/form_embed.js'
      script.async = true
      script.id = 'ghl-contact-script'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full" style={{ minHeight: '765px' }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/dHtI2p1HpFbVUQ07CeV3"
        style={{
          width: '100%',
          height: '765px',
          border: 'none',
          borderRadius: '3px',
        }}
        id="inline-dHtI2p1HpFbVUQ07CeV3"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Contact us page on site"
        data-height="765"
        data-layout-iframe-id="inline-dHtI2p1HpFbVUQ07CeV3"
        data-form-id="dHtI2p1HpFbVUQ07CeV3"
        title="Contact us page on site"
      />
    </div>
  )
}
