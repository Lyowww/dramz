'use client'

import { Provider } from 'react-redux'
import { makeStore, AppStore } from './state/store'
import { useRef, useEffect } from 'react'
import { setUser, TelegramUser } from './state/slices/auth'
import { closeModal } from './state/slices/ui'

export default function Providers({ initialUser, children }: { initialUser?: TelegramUser | null, children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) storeRef.current = makeStore()

  useEffect(() => {
    if (initialUser && storeRef.current) {
      storeRef.current.dispatch(setUser(initialUser))
      storeRef.current.dispatch(closeModal())
    }
  }, [initialUser])

  if (!storeRef.current) return null

  return <Provider store={storeRef.current}>{children}</Provider>
}


