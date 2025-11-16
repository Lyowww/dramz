'use client'

import { useEffect } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { setUser } from '../state/slices/auth'
import { closeModal } from '../state/slices/ui'

function ActionButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return <button onClick={onClick} className="w-full h-12 rounded-xl bg-[#7c3aed] text-white font-medium">{children}</button>
}

export default function LoginModal() {
  const modalOpen = useSelector((s: RootState) => s.ui.modal === 'login')
  const user = useSelector((s: RootState) => s.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const w = window as any
    const u = w?.Telegram?.WebApp?.initDataUnsafe?.user
    if (u && !user) {
      dispatch(setUser(u))
      dispatch(closeModal())
    }
  }, [user, dispatch])

  const doMock = () => {
    window.location.href = `/api/tg-auth?mock=1`
  }

  const doWidget = () => {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search)
    window.location.href = `/api/tg-auth?start=widget&redirect=${redirect}`
  }

  return (
    <Modal open={modalOpen && !user} onClose={() => {}} title="Войти через Telegram">
      <div className="space-y-3">
        <ActionButton onClick={doWidget}>Войти через Telegram</ActionButton>
        <ActionButton onClick={doMock}>Продолжить как демонстрация</ActionButton>
        <div className="text-xs text-white/70 text-center">Для Telegram WebApp вход произойдет автоматически</div>
      </div>
    </Modal>
  )
}


