'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', label: 'Главная', icon: '🏠' },
  { href: '/rewards', label: 'Награды', icon: '⭐' },
  { href: '/profile', label: 'Профиль', icon: '👤' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="safe-bottom sticky bottom-0 z-10 bg-[#0f0b1d] border-t border-[#261f3f]">
      <div className="grid grid-cols-3">
        {items.map(i => {
          const active = pathname === i.href
          return (
            <Link
              key={i.href}
              href={i.href}
              className={`flex flex-col items-center py-2 ${active ? 'text-white' : 'text-white/60'}`}
            >
              <div className="text-lg">{i.icon}</div>
              <div className="text-[11px]">{i.label}</div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


