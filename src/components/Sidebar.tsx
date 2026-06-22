'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const menu = [
    { href: '/', label: 'خانه', icon: '🏠' },
    { href: '/songs', label: 'همه آهنگ‌ها', icon: '🎵' },
    { href: '/artists', label: 'هنرمندان', icon: '🎤' },
    { href: '/genres', label: 'ژانرها', icon: '🎼' },
    { href: '/playlist', label: 'پلی‌لیست من', icon: '📋' },
    { href: '/search', label: 'جستجوی پیشرفته', icon: '🔍' },
  ]

  return (
    <div className="hidden lg:block w-64 bg-[#111122] border-r border-white/10 h-screen sticky top-0 pt-4 px-3">
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl">🎵</div>
          <div>
            <div className="font-bold text-xl">آواهنگ</div>
            <div className="text-[10px] text-white/40 -mt-1">موسیقی فارسی</div>
          </div>
        </div>
      </div>

      <div className="px-2 space-y-1">
        {menu.map(item => {
          const active = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                active 
                  ? 'bg-purple-600/90 text-white font-medium' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="absolute bottom-8 px-6 text-[10px] text-white/30">
        نسخه ۱.۰ • Production
      </div>
    </div>
  )
}
