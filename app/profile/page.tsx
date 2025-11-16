'use client'

import BottomNav from '../components/BottomNav'
import Logo from '../components/Logo'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

export default function ProfilePage() {
  const user = useSelector((s: RootState) => s.auth.user)
  return (
    <div className="app-frame bg-app">
      <main className="min-h-screen w-full pb-24">
        <header className="safe-top px-4 pt-4 flex items-center justify-between">
          <Logo />
          <button className="w-9 h-9 rounded-full bg-white/10">⚙️</button>
        </header>
        <section className="px-4 mt-6">
          <div className="rounded-2xl card p-4">
            <div className="text-sm text-white/70">Пользователь</div>
            <div className="text-lg font-semibold mt-1">{user?.first_name || user?.username || 'Demo'}</div>
            <div className="text-xs text-white/60 mt-1">id: {user?.id || 1}</div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}


