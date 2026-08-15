import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gamepad2,
  RotateCcw,
  Timer,
  MousePointerClick,
  Trophy,
  Code2,
  Terminal,
  Cpu,
  Database,
  GitBranch,
  Rocket
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollAnimation'

const ICONS = [Code2, Terminal, Cpu, Database, GitBranch, Rocket]
const BEST_MOVES_KEY = 'ds-portfolio-memory-best-moves'

function buildDeck() {
  const pairs = ICONS.flatMap((Icon, i) => [
    { key: `${i}-a`, iconIndex: i, id: `${i}-a-${Math.random()}` },
    { key: `${i}-b`, iconIndex: i, id: `${i}-b-${Math.random()}` }
  ])
  // Fisher–Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs.map((card, index) => ({ ...card, position: index }))
}

function readBestMoves() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(BEST_MOVES_KEY)
    return raw ? Number(raw) : null
  } catch {
    return null
  }
}

export default function Games() {
  const containerRef = useScrollReveal()
  const [deck, setDeck] = useState(() => buildDeck())
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [bestMoves, setBestMoves] = useState(() => readBestMoves())
  const [locked, setLocked] = useState(false)

  const isWon = matched.length === deck.length

  useEffect(() => {
    if (isWon || startTime === null) return
    const interval = setInterval(() => {
      setElapsed(Math.floor((performance.now() - startTime) / 1000))
    }, 250)
    return () => clearInterval(interval)
  }, [startTime, isWon])

  useEffect(() => {
    if (!isWon) return
    setBestMoves((prev) => {
      if (prev === null || moves < prev) {
        try {
          window.localStorage.setItem(BEST_MOVES_KEY, String(moves))
        } catch {
          // ignore storage errors (private browsing, etc.)
        }
        return moves
      }
      return prev
    })
  }, [isWon, moves])

  useEffect(() => {
    if (flipped.length !== 2) return
    setLocked(true)
    const [a, b] = flipped
    const cardA = deck.find((c) => c.id === a)
    const cardB = deck.find((c) => c.id === b)
    const isMatch = cardA.iconIndex === cardB.iconIndex

    const timeout = setTimeout(
      () => {
        setMoves((m) => m + 1)
        if (isMatch) setMatched((m) => [...m, a, b])
        setFlipped([])
        setLocked(false)
      },
      isMatch ? 350 : 700
    )
    return () => clearTimeout(timeout)
  }, [flipped, deck])

  const handleFlip = (id) => {
    if (locked) return
    if (flipped.includes(id) || matched.includes(id)) return
    if (flipped.length === 2) return
    if (startTime === null) setStartTime(performance.now())
    setFlipped((f) => [...f, id])
  }

  const handleRestart = () => {
    setDeck(buildDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setStartTime(null)
    setElapsed(0)
    setLocked(false)
  }

  const timeLabel = useMemo(() => {
    const m = Math.floor(elapsed / 60)
    const s = elapsed % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }, [elapsed])

  return (
    <section className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-4xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> TAKE A BREAK
        </div>
        <h2 data-reveal="up" className="section-heading mb-4">
          Memory Match
        </h2>
        <p data-reveal="up" data-delay="0.1" className="section-sub mb-10">
          Flip the cards, find every matching pair, and see how few moves you need.
          A small, pointless, genuinely fun way to procrastinate for sixty seconds.
        </p>

        <div data-reveal="scale" className="glass-card p-6 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-paper-500 uppercase tracking-wider">
              <Gamepad2 size={15} className="text-signal-blueSoft" />
              Playground
            </div>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-paper-500 hover:text-paper-100 transition-colors"
            >
              <RotateCcw size={13} /> Shuffle & restart
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {deck.map((card) => {
              const Icon = ICONS[card.iconIndex]
              const isFlipped = flipped.includes(card.id) || matched.includes(card.id)
              const isMatched = matched.includes(card.id)

              return (
                <button
                  key={card.id}
                  onClick={() => handleFlip(card.id)}
                  disabled={isFlipped}
                  aria-label={isFlipped ? 'Matching card, revealed' : 'Hidden card, tap to flip'}
                  className="relative aspect-square [perspective:800px] focus-visible:outline-none"
                >
                  <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d]"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Back face (hidden card) */}
                    <div
                      className="absolute inset-0 rounded-xl border border-ink-border bg-ink-900/70 flex items-center justify-center [backface-visibility:hidden] hover:border-signal-blue/40 transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-ink-borderStrong" />
                    </div>

                    {/* Front face (icon) */}
                    <div
                      className={`absolute inset-0 rounded-xl border flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                        isMatched
                          ? 'border-signal-blue/50 bg-signal-blue/10'
                          : 'border-ink-borderStrong bg-ink-700/70'
                      }`}
                    >
                      <Icon
                        size={22}
                        className={isMatched ? 'text-signal-blueSoft' : 'text-paper-100'}
                      />
                    </div>
                  </motion.div>
                </button>
              )
            })}
          </div>

          {/* Live / final stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="glass-card p-4 flex flex-col items-center gap-1.5 text-center">
              <MousePointerClick size={16} className="text-signal-orangeSoft" />
              <span className="font-display font-bold text-xl text-paper-100 tabular-nums">
                {moves}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-paper-500">
                Moves
              </span>
            </div>
            <div className="glass-card p-4 flex flex-col items-center gap-1.5 text-center">
              <Timer size={16} className="text-signal-blueSoft" />
              <span className="font-display font-bold text-xl text-paper-100 tabular-nums">
                {timeLabel}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-paper-500">
                Time
              </span>
            </div>
            <div className="glass-card p-4 flex flex-col items-center gap-1.5 text-center">
              <Trophy size={16} className="text-paper-300" />
              <span className="font-display font-bold text-xl text-paper-100 tabular-nums">
                {bestMoves ?? '—'}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-paper-500">
                Best Moves
              </span>
            </div>
          </div>

          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-signal-blue/30 bg-signal-blue/5 px-5 py-4"
              >
                <p className="text-sm text-paper-300">
                  Solved it in <span className="text-signal-blueSoft font-medium">{moves} moves</span>{' '}
                  and <span className="text-signal-blueSoft font-medium">{timeLabel}</span>.
                </p>
                <button onClick={handleRestart} className="btn-secondary">
                  Play again <RotateCcw size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isWon && startTime === null && (
            <p className="mt-4 font-mono text-[11px] text-paper-700">
              Timer starts the moment you flip your first card.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
