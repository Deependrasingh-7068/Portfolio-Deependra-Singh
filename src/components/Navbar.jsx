import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    const observedIds = new Set()

    // Projects, Education, Services, Process, Games and Contact are all
    // React.lazy() + <Suspense> sections in App.jsx, so their DOM nodes don't
    // exist yet on first render — this effect used to run once and silently
    // skip every section past Experience. Keep watching the DOM and attach
    // the observer to each section as soon as it actually mounts.
    const observeAvailableSections = () => {
      NAV_ITEMS.forEach((item) => {
        if (observedIds.has(item.id)) return
        const el = document.getElementById(item.id)
        if (el) {
          observer.observe(el)
          observedIds.add(item.id)
        }
      })
      if (observedIds.size === NAV_ITEMS.length) mutationObserver.disconnect()
    }

    const mutationObserver = new MutationObserver(observeAvailableSections)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    observeAvailableSections()

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-5 flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-ink-900/70 backdrop-blur-xl border border-ink-border shadow-card py-2 px-6'
              : 'bg-transparent py-0'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('home')
            }}
            className="font-display font-bold text-lg text-paper-100 tracking-tight"
            data-cursor-hover
          >
            DS<span className="text-signal-blue">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 font-mono text-[13px]">
            {NAV_ITEMS.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                data-cursor-hover
                className={`relative px-4 py-2 rounded-full transition-colors duration-300 ${
                  active === item.id ? 'text-paper-100' : 'text-paper-500 hover:text-paper-100'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink-700/80 border border-ink-borderStrong -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('contact')
            }}
            data-cursor-hover
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-signal-blue/10 border border-signal-blue/40 text-signal-blueSoft font-mono text-xs px-4 py-2 hover:bg-signal-blue/20 transition-colors"
          >
            AVAILABLE
          </a>

          <button
            className="md:hidden text-paper-100 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            data-cursor-hover
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-950/97 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: 'easeOut' }}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-display text-3xl font-semibold px-6 py-3 ${
                    active === item.id ? 'text-signal-blue' : 'text-paper-100'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
