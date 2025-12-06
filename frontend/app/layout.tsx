import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgriFarm - سامانه مدیریت کشاورزی هوشمند',
  description: 'بهینه‌سازی مصرف آب و انرژی در کشاورزی',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}

