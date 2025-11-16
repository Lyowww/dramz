'use client'

import { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { closeModal } from '../state/slices/ui'

function ActionButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return <button onClick={onClick} className="w-full h-12 rounded-xl bg-[#7c3aed] text-white font-medium">{children}</button>
}

export default function LoginModal() {
  const modalOpen = useSelector((s: RootState) => s.ui.modal === 'login')
  const user = useSelector((s: RootState) => s.auth.user)
  const dispatch = useDispatch()
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    const w = window as any
    const webApp = w?.Telegram?.WebApp
    setIsTelegram(!!webApp)
    
    if (webApp && webApp.initDataUnsafe?.user) {
      dispatch(closeModal())
    }
  }, [dispatch])

  const doMock = () => {
    window.location.href = `/api/tg-auth?mock=1`
  }

  const doWidget = () => {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search)
    window.location.href = `/api/tg-auth?start=widget&redirect=${redirect}`
  }

  if (isTelegram) {
    return null
  }

  return (
    <Modal open={modalOpen && !user && !isTelegram} onClose={() => {}} title="Войти через Telegram">
      <div className="space-y-3">
        <ActionButton onClick={doWidget}>Войти через Telegram</ActionButton>
        <ActionButton onClick={doMock}>Продолжить как демонстрация</ActionButton>
      </div>
    </Modal>
  )
}


