import { useEffect, useRef } from 'react'
import { useCursor } from '../context/CursorContext'

const TRAIL_LENGTH = 6

export default function CursorEngine() {
  const { cursorType } = useCursor()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRefs = useRef([])

  const supportsCustom =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const active = supportsCustom && cursorType !== 'default'

  useEffect(() => {
    document.documentElement.style.cursor = active ? 'none' : ''
    return () => {
      document.documentElement.style.cursor = ''
    }
  }, [active])

  useEffect(() => {
    if (!active) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    const trailPositions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouseX, y: mouseY }))

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
    }

    let rafId
    const animate = () => {
      ringX += (mouseX - ringX) * 0.2
      ringY += (mouseY - ringY) * 0.2
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }

      if (cursorType === 'trail') {
        let px = mouseX
        let py = mouseY
        trailPositions.forEach((pos, i) => {
          pos.x += (px - pos.x) * 0.35
          pos.y += (py - pos.y) * 0.35
          const el = trailRefs.current[i]
          if (el) {
            el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
          }
          px = pos.x
          py = pos.y
        })
      }

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId)
    }
  }, [active, cursorType])

  if (!active) return null

  if (cursorType === 'dot') {
    return (
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] w-3 h-3 rounded-full bg-signal-blue"
        style={{ willChange: 'transform' }}
      />
    )
  }

  if (cursorType === 'ring') {
    return (
      <>
        <div
          ref={dotRef}
          className="pointer-events-none fixed top-0 left-0 z-[200] w-1.5 h-1.5 rounded-full bg-signal-blue"
          style={{ willChange: 'transform' }}
        />
        <div
          ref={ringRef}
          className="pointer-events-none fixed top-0 left-0 z-[199] w-8 h-8 rounded-full border border-paper-300/60"
          style={{ willChange: 'transform' }}
        />
      </>
    )
  }

  if (cursorType === 'crosshair') {
    return (
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200]"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-6 h-6">
          <span className="absolute top-1/2 left-0 w-full h-px bg-signal-orangeSoft -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-signal-orangeSoft -translate-x-1/2" />
        </div>
      </div>
    )
  }

  if (cursorType === 'blob') {
    return (
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[199] w-10 h-10 rounded-full bg-gradient-to-br from-signal-blue/60 to-signal-orange/60 blur-md"
        style={{ willChange: 'transform' }}
      />
    )
  }

  if (cursorType === 'trail') {
    return (
      <>
        <div
          ref={dotRef}
          className="pointer-events-none fixed top-0 left-0 z-[200] w-2.5 h-2.5 rounded-full bg-signal-blue"
          style={{ willChange: 'transform' }}
        />
        {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="pointer-events-none fixed top-0 left-0 z-[198] rounded-full bg-signal-orange"
            style={{
              width: `${10 - i * 1.2}px`,
              height: `${10 - i * 1.2}px`,
              opacity: 1 - i * 0.15,
              willChange: 'transform'
            }}
          />
        ))}
      </>
    )
  }

  return null
}