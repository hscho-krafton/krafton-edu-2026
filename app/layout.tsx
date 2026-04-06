import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KRAFTON 2026 사외교육지원제도 추천 교육',
  description: '2026년 크래프톤 직군별 추천 교육 리스트',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
