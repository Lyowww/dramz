'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

export default function ProfilePage() {
  const user = useSelector((s: RootState) => s.auth.user)
  return (
    <main className="w-full">
        <section className="px-4">
          <div className="rounded-2xl card p-4">
            <div className="text-sm text-white/70">Пользователь</div>
            <div className="text-lg font-semibold mt-1">{user?.first_name || user?.username || 'Demo'}</div>
            <div className="text-xs text-white/60 mt-1">id: {user?.id || 1}</div>
          </div>
        </section>
      </main>
  )
}


