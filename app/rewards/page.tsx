'use client'

import { rewardBalance, tasks } from '../data/rewards'
import CrownIcon from '../components/CrownIcon'

export default function RewardsPage() {
  return (
    <main className="w-full">
        <section className="px-4">
          <div className="rounded-2xl card p-4 flex items-center justify-between">
            <div className="text-white/80 text-sm">Баланс корон</div>
            <div className="text-lg font-semibold flex items-center gap-1">{rewardBalance} <CrownIcon /></div>
          </div>
        </section>
        <section className="px-4 mt-4">
          <div className="text-white/90 font-medium mb-2">Как заработать короны ?</div>
          <div className="rounded-2xl card overflow-hidden">
            {tasks.map((t, i) => (
              <div key={t.id} className="px-4 py-3 border-b border-[#261f3f] last:border-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-white/70">{t.description}</div>
                  </div>
                  <div className="text-sm whitespace-nowrap flex items-center gap-1">{t.crowns} <CrownIcon /></div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[11px] text-white/50">{t.expiresIn || ''}</div>
                  {t.action && <button className="px-3 py-1.5 rounded-lg bg-white/10 text-xs">{t.action}</button>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
  )
}


