'use client'

import { useEffect } from 'react'

export default function TelegramInit() {
  useEffect(() => {
    const w = window as any
    const webApp = w?.Telegram?.WebApp
    const isTelegram = !!webApp
    if (isTelegram) {
      try {
        webApp.ready()
        webApp.expand()
      } catch {}
      document.documentElement.classList.add('tg')
      document.body.classList.add('tg')
    } else {
      document.documentElement.classList.remove('tg')
      document.body.classList.remove('tg')
    }
  }, [])
  return null
}


