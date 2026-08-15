import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Applies a GSAP scroll-triggered reveal to every [data-reveal] element
 * inside the returned ref's subtree. Supports data-reveal="up|left|right|scale".
 */
export function useScrollReveal(deps = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll('[data-reveal]')
      els.forEach((el) => {
        const type = el.getAttribute('data-reveal') || 'up'
        const delay = parseFloat(el.getAttribute('data-delay') || '0')

        let fromVars = { opacity: 0, duration: 0.8, ease: 'power3.out', delay }
        if (type === 'up') fromVars.y = 40
        if (type === 'left') fromVars.x = -50
        if (type === 'right') fromVars.x = 50
        if (type === 'scale') fromVars = { ...fromVars, scale: 0.92 }

        gsap.fromTo(
          el,
          { opacity: 0, y: fromVars.y || 0, x: fromVars.x || 0, scale: fromVars.scale || 1 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: fromVars.duration,
            ease: fromVars.ease,
            delay: fromVars.delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      const staggerGroups = containerRef.current.querySelectorAll('[data-stagger]')
      staggerGroups.forEach((group) => {
        const children = group.children
        gsap.fromTo(
          children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

export { gsap, ScrollTrigger }
