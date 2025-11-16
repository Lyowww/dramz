'use client'

import BottomSheet from './BottomSheet'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { closeModal } from '../state/slices/ui'
import { useState } from 'react'

export default function RepostModal() {
  const open = useSelector((s: RootState) => s.ui.modal === 'repost')
  const dispatch = useDispatch()
  const [link, setLink] = useState('')
  return (
    <BottomSheet open={open} onClose={() => dispatch(closeModal())} title="Подтвердите репост!">
      <div className="space-y-3">
        <div className="text-sm text-white/80">Вставьте ссылку на ваш репост в соц. сети для подтверждения репоста!</div>
        <div
          style={{
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)',
            borderRadius: '9px',
            pointerEvents: 'none',
            padding: '1px'
          }}
        >
          <input
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="Вставьте ссылку сюда"
            className="w-full h-11 rounded-[8px] px-3 outline-none text-white placeholder:text-white/50 relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(20, 16, 38, 0.9)',
              pointerEvents: 'auto'
            }}
          />
        </div>
        <button disabled={!link} className="w-full h-12 rounded-xl primary disabled:opacity-50 disabled:cursor-not-allowed">Отправить</button>
      </div>
    </BottomSheet>
  )
}


