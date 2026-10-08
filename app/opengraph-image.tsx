import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/config';

export const runtime = 'edge';
export const alt = 'Aura Marriage Bureau — Matrimonial Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0908',
          border: '14px solid #16130f',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(212, 175, 97, 0.4)',
            borderRadius: '9999px',
            padding: '12px 32px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              color: '#d4af61',
              fontSize: '20px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Matrimonial Services · Pakistan &amp; Overseas
          </span>
        </div>

        <h1
          style={{
            fontSize: '68px',
            fontWeight: 800,
            color: '#f4ecda',
            textAlign: 'center',
            margin: '0',
            lineHeight: 1.1,
          }}
        >
          {SITE_CONFIG.name}
        </h1>

        <p
          style={{
            fontSize: '32px',
            color: '#ecd290',
            fontStyle: 'italic',
            marginTop: '24px',
            textAlign: 'center',
          }}
        >
          &ldquo;{SITE_CONFIG.tagline}&rdquo;
        </p>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '44px',
            color: '#a79c82',
            fontSize: '20px',
          }}
        >
          <span>{SITE_CONFIG.city}, {SITE_CONFIG.country}</span>
          <span>·</span>
          <span>WhatsApp: {SITE_CONFIG.phone}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
