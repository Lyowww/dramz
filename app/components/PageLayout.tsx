'use client'

import Header from './Header'
import BottomNav from './BottomNav'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen app-frame bg-app overflow-y-auto'>
      <Header />
      <div className='flex-1'>
        {children}
      </div>
      <BottomNav />
    </div>
  )
}

