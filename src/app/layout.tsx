import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import AudioEngine from '@/components/player/AudioEngine'
import BottomPlayer from '@/components/player/BottomPlayer'

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
      <body className={`${vazir.variable} font-sans bg-[#0d0d1a] text-white min-h-screen`}>
        <div className="flex min-h-screen">

          {/* Sidebar — فقط دسکتاپ */}
          <aside className="hidden md:flex flex-col w-64 bg-[#080810] border-l border-white/5 fixed right-0 top-0 bottom-0 z-40 p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">🎵 آواهنگ</h1>
              <p className="text-purple-400 text-xs mt-1">موزیک فارسی</p>
            </div>
            <nav className="flex flex-col gap-2">
              <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm">
                🏠 خانه
              </a>
              <a href="/search" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 text-sm transition">
                🔍 جستجو
              </a>
              <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 text-sm transition">
                🎛️ ادمین
              </a>
            </nav>
          </aside>

          {/* محتوای اصلی */}
          <main className="flex-1 md:mr-64 pb-28 md:pb-24">
            {children}
          </main>

        </div>

        {/* نوار ناوبری موبایل */}
        <nav className="fixed bottom-16 left-0 right-0 z-40 md:hidden bg-[#080810]/95 backdrop-blur border-t border-white/5">
          <div className="flex justify-around py-3">
            <a href="/" className="flex flex-col items-center gap-1 text-purple-400">
              <span className="text-xl">🏠</span>
              <span className="text-xs">خانه</span>
            </a>
            <a href="/search" className="flex flex-col items-center gap-1 text-white/40">
              <span className="text-xl">🔍</span>
              <span className="text-xs">جستجو</span>
            </a>
            <a href="/admin" className="flex flex-col items-center gap-1 text-white/40">
              <span className="text-xl">🎛️</span>
              <span className="text-xs">ادمین</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-1 text-white/40">
              <span className="text-xl">👤</span>
              <span className="text-xs">پروفایل</span>
            </a>
          </div>
        </nav>

        <AudioEngine />
        <BottomPlayer />
      </body>
    </html>
  )
}