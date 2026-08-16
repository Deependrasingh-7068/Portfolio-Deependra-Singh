import { useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointer2, Circle, Crosshair, Sparkles, Disc, MoveRight, ChevronRight } from 'lucide-react'
import { useCursor } from '../context/CursorContext'

const OPTIONS = [
  { id: 'default', label: 'Default', icon: MousePointer2 },
  { id: 'dot', label: 'Dot', icon: Circle },
  { id: 'ring', label: 'Ring', icon: Disc },
  { id: 'crosshair', label: 'Crosshair', icon: Crosshair },
  { id: 'blob', label: 'Blob', icon: Sparkles },
  { id: 'trail', label: 'Trail', icon: MoveRight }
]

export default function CursorSwitcher() {
  const { cursorType, changeCursor } = useCursor()
  const [open, setOpen] = useState(false)

  return (
    <div className="hidden sm:block">
      {/* Handle tab — always visible, fixed at the left-middle edge */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close cursor picker' : 'Open cursor picker'}
        aria-expanded={open}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[210] w-5 h-24 rounded-r-2xl bg-ink-800/90 backdrop-blur-xl border border-l-0 border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-blueSoft transition-colors"
      >
        <ChevronRight
          size={16}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Sliding panel */}
      <motion.div
        initial={false}
        animate={{ x: open ? 30 : -300 }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[205] glass-card p-3 rounded-2xl rounded-l-none flex flex-col gap-1.5 w-44"
      >
        <p className="font-mono text-[10px] uppercase tracking-wider text-paper-500 px-2 pb-1">
          Cursor Style
        </p>
       {OPTIONS.map((opt) => {
  const Icon = opt.icon
  const isActive = cursorType === opt.id
  return (
    <button
      key={opt.id}
      onClick={() => {
  changeCursor(opt.id)
  setOpen(false)
}}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl font-mono text-xs transition-colors ${
        isActive
          ? 'bg-signal-blue/15 border border-signal-blue/40 text-signal-blueSoft'
          : 'border border-transparent text-paper-500 hover:text-paper-100 hover:bg-ink-700/50'
      }`}
    >
      <Icon size={15} />
      {opt.label}
    </button>
  )
})}
      </motion.div>
    </div>
  )
}