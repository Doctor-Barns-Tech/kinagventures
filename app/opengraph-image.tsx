import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KINAG VENTURES — Quality Imports & Available Goods';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #8B5CF6 100%)',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: '#FFFFFF', display: 'flex' }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFFFFF', marginRight: 10 }} />
            <span style={{ color: '#FFFFFF', fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600 }}>
              Quality Imports & Available Goods
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#FFFFFF', fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginBottom: 4 }}>
              KINAG VENTURES
            </span>
          </div>

          <div style={{ width: 80, height: 2, background: '#FFFFFF', marginTop: 24, marginBottom: 24, display: 'flex' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: 22, fontFamily: 'sans-serif', fontWeight: 400 }}>
              0553610613
            </span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontFamily: 'sans-serif', fontWeight: 400, marginTop: 4 }}>
              Kasoa Fijai · Nyanyano Road
            </span>
          </div>
        </div>

        <div style={{
          width: 360,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.15)',
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          padding: 40,
          gap: 16,
        }}>
          {[
            { emoji: '📦', label: 'Quality Imports' },
            { emoji: '🛒', label: 'Available Goods' },
            { emoji: '🚚', label: 'Fast Delivery' },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <span style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'sans-serif', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
