'use client'

import { Provider } from 'react-redux'
import { makeStore, AppStore } from './state/store'
import { useRef, useEffect } from 'react'
import { setUser, setAccessToken, setApiUser, TelegramUser } from './state/slices/auth'
import { closeModal, openModal } from './state/slices/ui'
import { initializeLanguage } from './state/slices/language'
import { getAccessToken } from '@/lib/api/user'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export default function Providers({ initialUser, children }: { initialUser?: TelegramUser | null, children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) storeRef.current = makeStore()

  useEffect(() => {
    const authenticate = async () => {
      if (!storeRef.current) return

      const w = window as any
      const webApp = w?.Telegram?.WebApp
      const isTelegram = !!webApp

      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
      const cookieToken = getCookie('accessToken')

      if (storedToken || cookieToken) {
        const token = storedToken || cookieToken
        if (token) {
          storeRef.current.dispatch(setAccessToken(token))
          if (initialUser) {
            storeRef.current.dispatch(setUser(initialUser))
          }
          storeRef.current.dispatch(closeModal())
          return
        }
      }

      if (initialUser) {
        storeRef.current.dispatch(setUser(initialUser))
        const cookieToken = getCookie('accessToken')
        if (cookieToken) {
          storeRef.current.dispatch(setAccessToken(cookieToken))
        }
        storeRef.current.dispatch(closeModal())
        return
      }

      if (isTelegram) {
        const tgUser = webApp?.initDataUnsafe?.user
        const initData = webApp?.initData

        if (tgUser && initData) {
          const user: TelegramUser = {
            id: tgUser.id,
            first_name: tgUser.first_name,
            last_name: tgUser.last_name,
            username: tgUser.username,
            photo_url: tgUser.photo_url
          }
          storeRef.current.dispatch(setUser(user))

          try {
            const tokenData = await getAccessToken({ initData })
            if (tokenData && tokenData.accessToken) {
              storeRef.current.dispatch(setAccessToken(tokenData.accessToken))
              storeRef.current.dispatch(setApiUser(tokenData.user))
            }
          } catch (error) {
            console.error('Failed to get access token:', error)
          }

          storeRef.current.dispatch(closeModal())
        } else {
          storeRef.current.dispatch(closeModal())
        }
      } else {
        if (!storeRef.current.getState().auth.user && !storedToken && !cookieToken) {
          storeRef.current.dispatch(openModal({ name: 'login' }))
        } else {
          storeRef.current.dispatch(closeModal())
        }
      }
    }

    if ((window as any)?.Telegram?.WebApp) {
      authenticate()
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any)?.Telegram?.WebApp) {
          clearInterval(checkInterval)
          authenticate()
        }
      }, 100)
      
      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
        authenticate()
      }, 2000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [initialUser])

  useEffect(() => {
    if (!storeRef.current) return
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (storedToken) {
      storeRef.current.dispatch(setAccessToken(storedToken))
    }
    storeRef.current.dispatch(initializeLanguage())
  }, [])

  if (!storeRef.current) return null

  return <Provider store={storeRef.current}>{children}</Provider>
}


