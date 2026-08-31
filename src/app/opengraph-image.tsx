import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = "Mr Perfect Home Services | Austin's Certified Chimney & Air Quality Specialists";
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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          backgroundColor: '#080d19',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow ambient background rings */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '450px',
            height: '450px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(93, 204, 211, 0.25) 0%, rgba(8, 13, 25, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(61, 203, 125, 0.20) 0%, rgba(8, 13, 25, 0) 70%)',
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Brand Logo & Glyph */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                borderRadius: '18px',
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(93, 204, 211, 0.4)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              }}
            >
              <svg width="48" height="40" viewBox="0 0 160 120" fill="none">
                <path
                  d="M 12 110 L 50 14 L 88 110 L 70 110 L 50 56 L 30 110 Z"
                  fill="#3DCB7D"
                />
                <rect x="38" y="78" width="8" height="8" fill="#3DCB7D" rx="1" />
                <rect x="50" y="78" width="8" height="8" fill="#5DCCD3" rx="1" />
                <rect x="38" y="90" width="8" height="8" fill="#3DCB7D" rx="1" />
                <rect x="50" y="90" width="8" height="8" fill="#5DCCD3" rx="1" />
                <path
                  d="M 72 110 L 110 14 L 148 110 L 130 110 L 110 56 L 90 110 Z"
                  fill="#5DCCD3"
                />
                <rect x="98" y="78" width="8" height="8" fill="#0376F4" rx="1" />
                <rect x="110" y="78" width="8" height="8" fill="#0376F4" rx="1" />
                <rect x="98" y="90" width="8" height="8" fill="#0376F4" rx="1" />
                <rect x="110" y="90" width="8" height="8" fill="#0376F4" rx="1" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Mr. Perfect
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#5DCCD3',
                  letterSpacing: '3px',
                }}
              >
                HOME SERVICES - AUSTIN, TX
              </span>
            </div>
          </div>

          {/* Google Review Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '10px 20px',
              borderRadius: '9999px',
            }}
          >
            <span style={{ color: '#FBBF24', fontSize: '18px', fontWeight: 900 }}>
              4.6 / 5.0 Rating
            </span>
            <span style={{ color: '#E2E8F0', fontSize: '15px', fontWeight: 700 }}>
              (92+ Austin Reviews)
            </span>
          </div>
        </div>

        {/* Center Main Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              flexDirection: 'column',
            }}
          >
            <span>Breathe Cleaner Air.</span>
            <span
              style={{
                color: '#5DCCD3',
              }}
            >
              Keep Your Fireplace Safe.
            </span>
          </div>

          <p
            style={{
              fontSize: '22px',
              color: '#94A3B8',
              lineHeight: 1.4,
              maxWidth: '850px',
              margin: 0,
            }}
          >
            Austin certified chimney sweeps, 360-degree HD video flue scans, fireplace repairs, and medical-grade air duct sanitization.
          </p>
        </div>

        {/* Bottom Feature Badges & Phone Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(51, 65, 85, 0.8)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(61, 203, 125, 0.15)',
                border: '1px solid rgba(61, 203, 125, 0.3)',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#3DCB7D',
              }}
            >
              100% Zero-Mess Guarantee
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(93, 204, 211, 0.15)',
                border: '1px solid rgba(93, 204, 211, 0.3)',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#5DCCD3',
              }}
            >
              NFPA 211 Safety Certified
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#38BDF8',
              }}
            >
              Same-Day Austin Dispatch
            </div>
          </div>

          {/* Dispatch Phone */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#5DCCD3',
              color: '#080d19',
              padding: '12px 24px',
              borderRadius: '14px',
              fontSize: '18px',
              fontWeight: 900,
            }}
          >
            <span>Call (737) 299-7300</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
