'use client'

import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import BottomNav from './components/BottomNav'
import Logo from './components/Logo'
import { openModal } from './state/slices/ui'
import { useSeriesList } from '@/hooks/useSeriesList'
import { API_BASE_URL } from '@/lib/api/client'

export default function Home() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSeriesList()
  const [currentIndex, setCurrentIndex] = useState(0)
  const shows = data && data.length > 0 ? data.slice(0, 3) : []
  const show = shows[currentIndex] || null
  const seriesListRef = useRef<HTMLDivElement>(null)

  const openFaq = () => dispatch(openModal({ name: 'faq' }))
  const openBuy = () => {
    if (!show) return
    dispatch(openModal({ name: 'purchase', data: { seriesId: show._id, show } }))
  }

  const scrollToSeriesList = () => {
    seriesListRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const imageSrc = show ? `${API_BASE_URL}/${show.coverImage}` : '/window.svg'
  const backgroundStyle = {
    backgroundImage: 'url("/bg-pages.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className="app-frame relative" style={backgroundStyle}>
      <img
        key={currentIndex}
        src={imageSrc}
        alt=""
        className="absolute top-0 left-0 w-full h-auto object-contain object-top pointer-events-none transition-opacity duration-500 ease-in-out"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0D0920 0%, transparent 20%, transparent 80%, #0D0920 100%)', zIndex: 2 }} />
      <div className="absolute inset-0 bottom-0 h-[78vh]" style={{ background: 'linear-gradient(to top, #0D0920 0%, transparent 30%)', zIndex: 2 }} />
      <main className="min-h-screen w-full pb-24 relative z-10">
        <header className="safe-top px-4 pt-4 flex items-center justify-between">
          <div className='w-full flex justify-center items-center'>
            <Logo />
          </div>
          <button onClick={openFaq}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 1.53846C5.32682 1.53846 1.53846 5.32682 1.53846 10C1.53846 14.6732 5.32682 18.4615 10 18.4615C14.6732 18.4615 18.4615 14.6732 18.4615 10C18.4615 5.32682 14.6732 1.53846 10 1.53846ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.39769 4.15009C10.0983 4.03895 10.8156 4.12359 11.4711 4.39493C12.1267 4.66631 12.6943 5.11387 13.1112 5.68757C13.5284 6.26162 13.7782 6.93947 13.8339 7.64638C13.8897 8.35362 13.7486 9.06259 13.4266 9.69462C13.1047 10.3266 12.6147 10.857 12.0098 11.2278C11.6262 11.4628 11.2062 11.6277 10.7692 11.7169V12.0515C10.7692 12.4764 10.4248 12.8208 10 12.8208C9.57517 12.8208 9.23077 12.4764 9.23077 12.0515V11.0254C9.23077 10.6006 9.57517 10.2562 10 10.2562C10.4256 10.2562 10.843 10.1385 11.2059 9.91606C11.5687 9.69371 11.8626 9.37564 12.0558 8.99629C12.249 8.61698 12.3336 8.19153 12.3002 7.76729C12.2667 7.3427 12.1168 6.93615 11.8667 6.59208C11.6164 6.24766 11.2758 5.97915 10.8827 5.81641C10.4895 5.65364 10.0592 5.60285 9.63877 5.66955C9.21826 5.73627 8.82401 5.91807 8.50056 6.1945C8.17691 6.4711 7.93633 6.8313 7.80498 7.23603C7.67385 7.64011 7.23996 7.86138 6.83587 7.73025C6.43178 7.59911 6.21051 7.16522 6.34165 6.76113C6.56066 6.08629 6.96187 5.48575 7.50105 5.02496C8.04043 4.56399 8.69723 4.26123 9.39769 4.15009ZM9.17969 15.1282C9.17969 14.7034 9.52408 14.359 9.94892 14.359H10.0511C10.4759 14.359 10.8203 14.7034 10.8203 15.1282V15.2308C10.8203 15.655 10.4768 15.9992 10.0526 16L9.95042 16.0002C9.74615 16.0006 9.55011 15.9197 9.40552 15.7754C9.26094 15.6311 9.17969 15.4352 9.17969 15.231V15.1282Z" fill="white" fillOpacity="0.8" />
          </svg>
          </button>
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
            <div className="rounded-2xl card px-4 py-3 text-sm text-red-300 text-center space-y-2">
              <div>Не удалось загрузить сериал. Попробуйте позже.</div>
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-red-400 mt-2 break-all">{error}</div>
              )}
            </div>
          )}
          {!loading && !error && show && (
            <>
              <div className='h-[50vh]' />
              {shows.length > 1 && (
                <div className="flex justify-center gap-2 mb-4">
                  {shows.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-[#9b5cff] w-6'
                          : 'bg-white/30'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              <div
                key={`title-${currentIndex}`}
                className="text-center mt-4 text-[28px] font-semibold transition-all duration-500 ease-in-out animate-fade-in"
              >
                {show.title}
              </div>
              <div
                key={`desc-${currentIndex}`}
                className="text-center text-[12px] text-white/70 transition-all duration-500 ease-in-out animate-fade-in"
              >
                {show.description}
              </div>
              <div
                key={`buttons-${currentIndex}`}
                className="mt-3 space-y-3 transition-all duration-500 ease-in-out animate-fade-in"
              >
                <button className="w-full h-12 rounded-2xl bg-white/10 text-white">Смотреть первые 10 серий</button>
                <button onClick={openBuy} className="w-full h-12 rounded-2xl primary">Купить сразу все серии 👑</button>
                <button
                  onClick={scrollToSeriesList}
                  className="w-full flex justify-center pt-2"
                >
                  <svg
                    className="w-6 h-6 text-white/80 animate-updown"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </>
          )}
          {!loading && !error && !show && (
            <div className="rounded-2xl card px-4 py-3 text-sm text-white/80 text-center">
              Сериалы пока недоступны
            </div>
          )}
        </section>

        <section ref={seriesListRef} className="px-4 mt-12 pb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Топ сериалов</h2>
          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((series) => (
                <div
                  key={series._id}
                  className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm"
                >
                  <div className="flex gap-4 p-4">
                    <img
                      src={`${API_BASE_URL}/${series.coverImage}`}
                      alt={series.title}
                      className="w-24 h-32 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{series.title}</h3>
                        {series.description && (
                          <p className="text-sm text-white/70 line-clamp-2">{series.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => dispatch(openModal({ name: 'purchase', data: { seriesId: series._id, show: series } }))}
                        className="mt-2 w-full h-10 rounded-xl primary text-sm"
                      >
                        Смотреть
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="rounded-2xl card px-4 py-3 text-sm text-white/80 text-center">
                Сериалы пока недоступны
              </div>
            )
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
