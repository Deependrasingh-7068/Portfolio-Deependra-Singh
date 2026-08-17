let isRunning = false

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

const LEAF_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,span,a,li,label,button,td,blockquote'
const TOTAL_DURATION_MS = 9000

/**
 * Finds every leaf text element inside #magic-scope, clones each one as a
 * fixed-position overlay (so nothing gets clipped by a card's overflow),
 * hides the original, and animates every letter of the clone falling with
 * gravity + rotation using the Web Animations API. The whole scope also
 * tilts a couple degrees clockwise for the duration. Everything is restored
 * automatically afterwards — nothing is permanently changed.
 */
export function triggerGravityChaos() {
  if (isRunning) return
  if (typeof window === 'undefined') return

  const scope = document.getElementById('magic-scope')
  if (!scope) return

  // Respect accessibility preferences — skip the chaos entirely
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  isRunning = true

  const candidates = Array.from(scope.querySelectorAll(LEAF_SELECTOR)).filter((el) => {
    if (el.closest('[data-no-gravity]')) return false
    if (el.children.length > 0) return false
    if (!el.textContent || !el.textContent.trim()) return false
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return false
    if (rect.bottom < 0 || rect.top > window.innerHeight) return false
    return true
  })

  // Full-viewport overlay hosts the falling clones so nothing gets clipped
  // by a parent card's overflow-hidden.
  const overlay = document.createElement('div')
  overlay.id = 'magic-overlay'
  overlay.style.position = 'fixed'
  overlay.style.inset = '0'
  overlay.style.pointerEvents = 'none'
  overlay.style.zIndex = '9999'
  overlay.style.overflow = 'visible'
  document.body.appendChild(overlay)

  const hiddenEls = []
  let globalIndex = 0

  candidates.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const computed = window.getComputedStyle(el)

    // Hide the original in place — layout stays intact, no reflow jump
    el.style.visibility = 'hidden'
    hiddenEls.push(el)

    const clone = document.createElement('div')
    clone.style.position = 'fixed'
    clone.style.left = `${rect.left}px`
    clone.style.top = `${rect.top}px`
    clone.style.width = `${rect.width}px`
    clone.style.fontFamily = computed.fontFamily
    clone.style.fontSize = computed.fontSize
    clone.style.fontWeight = computed.fontWeight
    clone.style.letterSpacing = computed.letterSpacing
    clone.style.color = computed.color
    clone.style.lineHeight = computed.lineHeight
    clone.style.display = 'flex'
    clone.style.flexWrap = 'wrap'
    clone.style.pointerEvents = 'none'

    const text = el.textContent

    for (let i = 0; i < text.length; i++) {
      const char = text[i] === ' ' ? '\u00A0' : text[i]
      const span = document.createElement('span')
      span.textContent = char
      span.style.display = 'inline-block'
      span.style.willChange = 'transform, opacity'
      clone.appendChild(span)

      const fallX = randomBetween(-60, 60)
      const fallY = randomBetween(320, 640)
      const fallRot = randomBetween(180, 540)
      const duration = randomBetween(900, 1500)
      const delay = globalIndex * 12 + randomBetween(0, 150)
      globalIndex++

      span.animate(
        [
          { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 1 },
          { transform: `translate(${fallX}px, ${fallY}px) rotate(${fallRot}deg)`, opacity: 0 }
        ],
        {
          duration,
          delay,
          easing: 'cubic-bezier(0.47, 0, 0.75, 0.72)',
          fill: 'forwards'
        }
      )
    }

    overlay.appendChild(clone)
  })

  scope.classList.add('magic-tilt')

  setTimeout(() => {
    scope.classList.remove('magic-tilt')
    hiddenEls.forEach((el) => {
      el.style.visibility = ''
    })
    overlay.remove()
    isRunning = false
  }, TOTAL_DURATION_MS)
}

export const MAGIC_DURATION_MS = TOTAL_DURATION_MS