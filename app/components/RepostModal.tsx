'use client'

import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { closeModal } from '../state/slices/ui'
import { useState } from 'react'

export default function RepostModal() {
  const open = useSelector((s: RootState) => s.ui.modal === 'repost')
  const dispatch = useDispatch()
  const [link, setLink] = useState('')
  return (
    <Modal open={open} onClose={() => dispatch(closeModal())} title="Подтвердите репост !">
      <div className="space-y-3">
        <div className="text-sm text-white/80">Вставьте ссылку на ваш репост в соц. сети для подтверждения репоста</div>
        <input value={link} onChange={e => setLink(e.target.value)} placeholder="Вставьте ссылку сюда" className="w-full h-11 rounded-xl card px-3 outline-none" />
        <button disabled={!link} className="w-full h-12 rounded-xl primary">Отправить</button>
      </div>
    </Modal>
  )
}


