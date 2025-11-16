'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Logo from './Logo'
import { openModal } from '../state/slices/ui'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()

  const openFaq = () => dispatch(openModal({ name: 'faq' }))

  const isHome = pathname === '/'
  const showBackButton = !isHome

  return (
    <header className="safe-top px-4 pt-4 flex items-center justify-between z-50 fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px]">
      <button 
        onClick={() => router.back()} 
        className="w-9 h-9 flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '8px',
          borderRadius: '12px'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      
      <div className='w-full flex justify-center items-center'>
        <Logo />
      </div>
      
      <button 
        onClick={openFaq}
        className="w-9 h-9 flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '8px',
          borderRadius: '12px'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 1.53846C5.32682 1.53846 1.53846 5.32682 1.53846 10C1.53846 14.6732 5.32682 18.4615 10 18.4615C14.6732 18.4615 18.4615 14.6732 18.4615 10C18.4615 5.32682 14.6732 1.53846 10 1.53846ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.39769 4.15009C10.0983 4.03895 10.8156 4.12359 11.4711 4.39493C12.1267 4.66631 12.6943 5.11387 13.1112 5.68757C13.5284 6.26162 13.7782 6.93947 13.8339 7.64638C13.8897 8.35362 13.7486 9.06259 13.4266 9.69462C13.1047 10.3266 12.6147 10.857 12.0098 11.2278C11.6262 11.4628 11.2062 11.6277 10.7692 11.7169V12.0515C10.7692 12.4764 10.4248 12.8208 10 12.8208C9.57517 12.8208 9.23077 12.4764 9.23077 12.0515V11.0254C9.23077 10.6006 9.57517 10.2562 10 10.2562C10.4256 10.2562 10.843 10.1385 11.2059 9.91606C11.5687 9.69371 11.8626 9.37564 12.0558 8.99629C12.249 8.61698 12.3336 8.19153 12.3002 7.76729C12.2667 7.3427 12.1168 6.93615 11.8667 6.59208C11.6164 6.24766 11.2758 5.97915 10.8827 5.81641C10.4895 5.65364 10.0592 5.60285 9.63877 5.66955C9.21826 5.73627 8.82401 5.91807 8.50056 6.1945C8.17691 6.4711 7.93633 6.8313 7.80498 7.23603C7.67385 7.64011 7.23996 7.86138 6.83587 7.73025C6.43178 7.59911 6.21051 7.16522 6.34165 6.76113C6.56066 6.08629 6.96187 5.48575 7.50105 5.02496C8.04043 4.56399 8.69723 4.26123 9.39769 4.15009ZM9.17969 15.1282C9.17969 14.7034 9.52408 14.359 9.94892 14.359H10.0511C10.4759 14.359 10.8203 14.7034 10.8203 15.1282V15.2308C10.8203 15.655 10.4768 15.9992 10.0526 16L9.95042 16.0002C9.74615 16.0006 9.55011 15.9197 9.40552 15.7754C9.26094 15.6311 9.17969 15.4352 9.17969 15.231V15.1282Z" fill="white" fillOpacity="0.8" />
        </svg>
      </button>
    </header>
  )
}

