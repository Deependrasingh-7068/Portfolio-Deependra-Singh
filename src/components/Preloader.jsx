import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const rootRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setProgress(100)
      const t = setTimeout(() => finish(), 200)
      return () => clearTimeout(t)
    }

    const counter = { val: 0 }
    const tl = gsap.timeline({
      onComplete: finish
    })

    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.floor(counter.val))
    }).to(rootRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
      delay: 0.15
    })

    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    onComplete && onComplete()
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-ink-950 flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-display font-bold text-5xl sm:text-6xl tracking-tight text-paper-100">
          DS<span className="text-signal-blue">.</span>
        </div>
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-paper-500">
          Loading Experience...
        </div>
        <div className="w-56 h-[2px] bg-ink-700 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-signal-blue to-signal-orange transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[11px] text-paper-500 tabular-nums">{progress}%</div>
      </div>
    </div>
  )
}
