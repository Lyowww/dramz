'use client'

import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { closeModal } from '../state/slices/ui'
import { useFaq } from '@/hooks/useFaq'

export default function FaqModal() {
  const open = useSelector((s: RootState) => s.ui.modal === 'faq')
  const dispatch = useDispatch()
  const { data, loading, error } = useFaq()
  const items = data || []
  return (
    <Modal open={open} onClose={() => dispatch(closeModal())} title="FAQ">
      <div className="space-y-3">
        {loading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border-b border-[#261f3f] pb-3">
                <div className="h-4 bg-white/10 rounded mb-2 animate-pulse" />
                <div className="h-3 bg-white/10 rounded w-5/6 animate-pulse" />
              </div>
            ))}
          </>
        )}
        {!loading && error && (
          <div className="text-xs text-red-300 text-center">
            Не удалось загрузить FAQ
          </div>
        )}
        {!loading && !error && items.map(it => (
          <div key={it._id} className="border-b border-[#261f3f] pb-3">
            <div className="text-sm font-medium">{it.question}</div>
            <div className="text-xs text-white/70 mt-1 whitespace-pre-line">{it.answer}</div>
          </div>
        ))}
        {!loading && !error && items.length === 0 && (
          <div className="text-xs text-white/70 text-center">
            FAQ пока пуст
          </div>
        )}
        <button className="w-full h-12 rounded-xl primary mt-2">Связаться с поддержкой</button>
      </div>
    </Modal>
  )
}


