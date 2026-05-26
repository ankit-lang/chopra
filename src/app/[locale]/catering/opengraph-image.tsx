import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Indian Catering Den Haag'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#1B2B5E',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
      }}
    >
      <div style={{ color: '#D4AF37', fontSize: 28, marginBottom: 16, letterSpacing: 4 }}>
        CHOPRAS
      </div>
      <div style={{ color: 'white', fontSize: 52, fontWeight: 700, textAlign: 'center', maxWidth: 900 }}>
        Indian Catering Den Haag
      </div>
      <div style={{ color: 'white', fontSize: 32, marginTop: 16 }}>
        Den Haag, Netherlands
      </div>
      <div style={{ color: '#D4AF37', fontSize: 22, marginTop: 24 }}>
        Halal Certified · Open Tue–Sun · Leyweg 986
      </div>
    </div>
  )
}
