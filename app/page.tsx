'use client'

import { useDispatch } from 'react-redux'
import BottomNav from './components/BottomNav'
import Logo from './components/Logo'
import { openModal } from './state/slices/ui'
import { useSeriesList } from '@/hooks/useSeriesList'
import { API_BASE_URL } from '@/lib/api/client'

export default function Home() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSeriesList()
  const show = data && data.length > 0 ? data[0] : null

  const openFaq = () => dispatch(openModal({ name: 'faq' }))
  const openBuy = () => {
    if (!show) return
    dispatch(openModal({ name: 'purchase', data: { seriesId: show._id, show } }))
  }

  const imageSrc = show ? `${API_BASE_URL}/${show.coverImage}` : '/window.svg'

  return (
    <div className="app-frame bg-app">
      <main className="min-h-screen w-full pb-24">
        <header className="safe-top px-4 pt-4 flex items-center justify-between">
          <Logo />
          <button onClick={openFaq} className="w-9 h-9 rounded-full bg-white/10">?</button>
        </header>

        <section className="px-4 mt-6">
          {loading && (
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden relative bg-white/10 aspect-[3/4] animate-pulse" />
              <div className="h-6 bg-white/10 rounded-xl w-2/3 mx-auto animate-pulse" />
              <div className="mt-3 space-y-3">
                <div className="w-full h-12 rounded-2xl bg-white/10 animate-pulse" />
                <div className="w-full h-12 rounded-2xl bg-white/10 animate-pulse" />
              </div>
            </div>
          )}
          {!loading && error && (
            <div className="rounded-2xl card px-4 py-3 text-sm text-red-300 text-center">
              Не удалось загрузить сериал. Попробуйте позже.
            </div>
          )}
          {!loading && !error && show && (
            <>
              <div className="rounded-3xl overflow-hidden relative">
                <img src={imageSrc} alt={show.title} className="w-full aspect-[3/4] object-cover" />
              </div>
              <div className="text-center mt-4 text-xl font-semibold">{show.title}</div>
              <div className="mt-3 space-y-3">
                <button className="w-full h-12 rounded-2xl bg-white/10 text-white">Смотреть первые 10 серий</button>
                <button onClick={openBuy} className="w-full h-12 rounded-2xl primary">Купить сразу все серии 👑</button>
              </div>
            </>
          )}
          {!loading && !error && !show && (
            <div className="rounded-2xl card px-4 py-3 text-sm text-white/80 text-center">
              Сериалы пока недоступны
            </div>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
