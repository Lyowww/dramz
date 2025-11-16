'use client'

import { rewardBalance, tasks } from '../data/rewards'
import CrownIcon from '../components/CrownIcon'
import { useDispatch } from 'react-redux'
import { openModal } from '../state/slices/ui'
import { useEffect, useState } from 'react'

function formatCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function RewardsPage() {
  const dispatch = useDispatch()
  const [countdowns, setCountdowns] = useState<Record<string, number>>({})

  useEffect(() => {
    const savedCountdowns: Record<string, number> = {}
    tasks.forEach(task => {
      if (task.action) {
        const saved = localStorage.getItem(`countdown_${task.id}`)
        if (saved) {
          const endTime = parseInt(saved, 10)
          const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
          if (remaining > 0) {
            savedCountdowns[task.id] = remaining
          } else {
            localStorage.removeItem(`countdown_${task.id}`)
          }
        }
      }
    })
    setCountdowns(savedCountdowns)

    const interval = setInterval(() => {
      setCountdowns(prev => {
        const updated = { ...prev }
        let changed = false
        Object.keys(updated).forEach(taskId => {
          const saved = localStorage.getItem(`countdown_${taskId}`)
          if (saved) {
            const endTime = parseInt(saved, 10)
            const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
            if (remaining > 0) {
              updated[taskId] = remaining
            } else {
              delete updated[taskId]
              localStorage.removeItem(`countdown_${taskId}`)
            }
            changed = true
          }
        })
        return changed ? updated : prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleActionClick = (taskId: string) => {
    const endTime = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem(`countdown_${taskId}`, endTime.toString())
    setCountdowns(prev => ({ ...prev, [taskId]: 24 * 60 * 60 }))
    
    if (taskId === 't2') {
      dispatch(openModal({ name: 'repost' }))
    }
  }

  return (
    <main className="w-full">
      <section className="px-4 pt-4">
        <div
          style={{
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)',
            borderRadius: '9px',
            pointerEvents: 'none',
            padding: '1px'
          }}
        >
          <div
            className="rounded-[8px] p-4 h-full w-full flex items-center justify-between relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(20, 16, 38, 0.9)'
            }}
          >
            <div className="text-white/80 text-sm">Баланс корон</div>
            <div className="text-lg font-semibold flex items-center gap-1 text-white">{rewardBalance} <CrownIcon className="w-5 h-5" /></div>
          </div>
        </div>
      </section>
      <section className="px-5 mt-4">
        <div className="text-white font-medium mb-2 text-extrabold text-base">Как заработать короны?</div>
        <div className="overflow-hidden  border-t-[2px] border-[#261f3f]">
          {tasks.map((t, i) => {
            const hasCountdown = countdowns[t.id] !== undefined && countdowns[t.id] > 0
            return (
              <div key={t.id} className=" py-3 border-b-[2px] border-[#261f3f] last:border-0">
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white mb-1">{t.title}</div>
                    <div className="text-xs text-white/70 leading-relaxed">{t.description}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="text-sm whitespace-nowrap flex items-center gap-1 text-white">
                      {t.crowns} <CrownIcon className="w-4 h-4" />
                    </div>
                    {t.action && (
                      hasCountdown ? (
                        <div className="px-3 py-1.5 rounded-md text-xs font-medium text-white whitespace-nowrap bg-white/10">
                          {formatCountdown(countdowns[t.id])}
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleActionClick(t.id)}
                          className="px-3 py-1.5 rounded-md text-xs font-medium text-white whitespace-nowrap" 
                          style={{ backgroundColor: '#704ED7' }}
                        >
                          {t.action}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}


