import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'FI Int LLC - Finance Intelligence for Your Business'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(135deg, #1a2e1a 0%, #0a1a0a 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style={{ marginRight: '20px' }}>
          <rect width="32" height="32" rx="8" fill="#5a7d5a" />
          <path d="M8 8h6v16H8V8zm10 0h6v6h-6V8zm0 10h6v6h-6v-6z" fill="white" />
        </svg>
        <span
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
          }}
        >
          FI Int LLC
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: '32px',
          color: '#8fa882',
          textAlign: 'center',
          maxWidth: '800px',
          lineHeight: 1.4,
        }}
      >
        Finance Intelligence for Your Business
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '22px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          maxWidth: '700px',
          marginTop: '24px',
          lineHeight: 1.5,
        }}
      >
        Custom financial software, integrations, and analytics platforms
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '4px',
            background: '#5a7d5a',
            borderRadius: '2px',
          }}
        />
        <span
          style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          thefiint.com
        </span>
        <div
          style={{
            width: '40px',
            height: '4px',
            background: '#5a7d5a',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>,
    {
      ...size,
    }
  )
}
