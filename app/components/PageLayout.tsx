'use client'

import Header from './Header'
import BottomNav from './BottomNav'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen bg-app overflow-y-auto'>
      <Header />
      <div className='flex-1 pt-20 pb-20 app-frame'>
        {children}
      </div>
      <BottomNav />
    </div>
  )
}

