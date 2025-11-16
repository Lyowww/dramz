'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import BottomNav from './BottomNav'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRewards = pathname === '/rewards'
  const isProfile = pathname === '/profile'
  const isProfileTransactions = pathname === '/profile/transactions' || pathname === '/profile/settings/name' || pathname === '/profile/settings/language' || pathname === '/profile/referrals/links' || pathname === '/profile/referrals/all'
  
  return (
    <div className='flex flex-col min-h-screen overflow-y-auto app-frame' style={isRewards || isProfileTransactions ? {
      backgroundImage: 'url(/bg-rewards.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      backgroundSize: 'cover',
    } : isProfile ? {
      backgroundImage: 'url(/profile-bg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      backgroundSize: 'cover',
    } : {
      backgroundColor: 'var(--bg-app, #0f0b1d)'
    }}>
      <Header />
      <div className='flex-1 pt-20 pb-20 app-frame'>
        {children}
      </div>
      <BottomNav />
    </div>
  )
}

