'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'خانه', icon: '🏠' },
    { href: '/songs', label: 'آهنگ‌ها', icon: '🎵' },
    { href: '/artists', label: 'هنرمندان', icon: '👤' },
    { href: '/genres', label: 'ژانرها', icon: '🎼' },
    { href: '/playlist', label: 'پلی‌لیست', icon: '📋' },
    { href: '/search', label: 'جستجو', icon: '🔍' },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">🎵</div>
          <span className="font-bold text-xl tracking-tight">آواهنگ</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                pathname === item.href 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link 
            href="/admin" 
            className="px-4 py-2 text-sm rounded-full bg-white/10 hover:bg-white/20 transition flex items-center gap-2"
          >
            <span>⚙️</span>
            <span className="hidden sm:inline">پنل ادمین</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
