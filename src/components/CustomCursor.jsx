import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isProject, setIsProject] = useState(false)

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reduced) return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
    }

    let rafId
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    const handleOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]')
      const project = e.target.closest('[data-cursor-project]')
      setIsHovering(Boolean(target))
      setIsProject(Boolean(project))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] w-1.5 h-1.5 rounded-full bg-signal-blue"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[99] rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out ${
          isProject
            ? 'w-20 h-20 border-signal-orange bg-signal-orange/10'
            : isHovering
            ? 'w-12 h-12 border-signal-blue bg-signal-blue/10'
            : 'w-8 h-8 border-paper-300/40 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
      >
        {isProject && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-wider text-signal-orangeSoft">
            VIEW
          </span>
        )}
      </div>
    </>
  )
}
