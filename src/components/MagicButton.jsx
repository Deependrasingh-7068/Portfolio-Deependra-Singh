import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { triggerGravityChaos, MAGIC_DURATION_MS } from '../utils/magicGravity'

export default function MagicButton() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMagic = () => {
    if (isPlaying) return
    setIsPlaying(true)
    triggerGravityChaos()
    setTimeout(() => setIsPlaying(false), MAGIC_DURATION_MS)
  }

  return (
    <button
      onClick={handleMagic}
      disabled={isPlaying}
      data-no-gravity
      data-cursor-hover
      aria-label="Trigger magic gravity effect"
      className="fixed bottom-6 right-6 z-[150] inline-flex items-center gap-2 px-4 py-3 rounded-full border border-signal-orange/30 bg-ink-900/90 backdrop-blur-xl text-signal-orangeSoft font-mono text-xs shadow-glowOrange hover:bg-signal-orange/15 hover:border-signal-orange/50 hover:-translate-y-0.5 transition-all duration-100 disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
    >
      <Wand2 size={14} className={isPlaying ? 'animate-spin' : ''} />
      {isPlaying ? 'Casting...' : 'Magic ✨'}
    </button>
  )
}