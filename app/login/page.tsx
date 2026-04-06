const AUTH_URL = process.env.AUTH_URL ?? 'https://core.prod.ax.krafton.com'
const APP_URL = process.env.APP_URL ?? 'http://localhost:3000'

export default function LoginPage() {
  const redirectUri = `${APP_URL}/auth/callback`
  const authorizeUrl = `${AUTH_URL}/api/v1/auth/sso/azure-ax-sso-app/authorize?redirect_url=${encodeURIComponent(redirectUri)}`

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        background: '#0F172A',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '48px 40px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          maxWidth: '380px',
          width: '100%',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/KRAFTON_Horizontal_Logo_Red.png"
          alt="KRAFTON"
          style={{ height: '32px', marginBottom: '28px', objectFit: 'contain' }}
        />
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '8px',
            letterSpacing: '-0.5px',
            lineHeight: 1.4,
          }}
        >
          2026 사외교육지원제도
          <br />
          <span style={{ color: '#6EE7B7' }}>직군별 추천 교육</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginBottom: '32px' }}>
          크래프톤 구성원만 이용 가능합니다
        </p>
        <a
          href={authorizeUrl}
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: '#6EE7B7',
            color: '#0F172A',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '15px',
          }}
        >
          Microsoft 계정으로 로그인
        </a>
      </div>
    </div>
  )
}
