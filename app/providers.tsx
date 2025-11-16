'use client'

import { Provider } from 'react-redux'
import { makeStore, AppStore } from './state/store'
import { useRef, useEffect } from 'react'
import { setUser, TelegramUser } from './state/slices/auth'
import { closeModal, openModal } from './state/slices/ui'

export default function Providers({ initialUser, children }: { initialUser?: TelegramUser | null, children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) storeRef.current = makeStore()

  useEffect(() => {
    const checkAuth = () => {
      const w = window as any
      const webApp = w?.Telegram?.WebApp
      const isTelegram = !!webApp
      
      if (storeRef.current) {
        if (initialUser) {
          storeRef.current.dispatch(setUser(initialUser))
          storeRef.current.dispatch(closeModal())
        } else if (isTelegram) {
          const tgUser = webApp?.initDataUnsafe?.user
          if (tgUser) {
            const user: TelegramUser = {
              id: tgUser.id,
              first_name: tgUser.first_name,
              last_name: tgUser.last_name,
              username: tgUser.username,
              photo_url: tgUser.photo_url
            }
            storeRef.current.dispatch(setUser(user))
            storeRef.current.dispatch(closeModal())
          } else {
            storeRef.current.dispatch(closeModal())
          }
        } else {
          if (!storeRef.current.getState().auth.user) {
            storeRef.current.dispatch(openModal({ name: 'login' }))
          }
        }
      }
    }

    if ((window as any)?.Telegram?.WebApp) {
      checkAuth()
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any)?.Telegram?.WebApp) {
          clearInterval(checkInterval)
          checkAuth()
        }
      }, 100)
      
      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
        checkAuth()
      }, 2000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [initialUser])

  if (!storeRef.current) return null

  return <Provider store={storeRef.current}>{children}</Provider>
}


