import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import AudioEngine from '@/components/player/AudioEngine'
import BottomPlayer from '@/components/player/BottomPlayer'
import FullScreenPlayer from '@/components/player/FullScreenPlayer'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
})

export const metadata: Metadata = {
  title: 'آواهنگ — موزیک فارسی',
  description: 'پلتفرم موزیک فارسی و موسیقی محلی ایران',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} font-sans bg-[#0d0d1a] text-white min-h-screen pb-24`}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Navbar />
            {children}
          </div>
        </div>
        <AudioEngine />
        <BottomPlayer />
        <FullScreenPlayer />
      </body>
    </html>
  )
}
