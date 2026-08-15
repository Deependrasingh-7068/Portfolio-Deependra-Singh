import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { stats } from '../data/experience'
import { useScrollReveal } from '../hooks/useScrollAnimation'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-paper-100 tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  const containerRef = useScrollReveal()

  return (
    <section id="about" className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> ABOUT ME
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16">
          <div>
            <h2 data-reveal="up" className="section-heading mb-8">
              Still early, still building —{' '}
              <span className="text-paper-500">and that's the point.</span>
            </h2>

            <div data-reveal="up" data-delay="0.1" className="space-y-5 text-paper-300 leading-relaxed text-[15px] sm:text-base">
              <p>
                I finished my BCA at Babasaheb Bhimrao Ambedkar University in 2025, and somewhere
                in the middle of that degree I got hooked on the JavaScript ecosystem — the fact
                that you can go from an empty file to a working product in an afternoon still
                hasn't worn off.
              </p>
              <p>
                Most of my time now goes into full-stack work with the MERN stack: React on the
                front, Node and Express underneath, MongoDB holding the data. I like the full
                picture — designing a schema, wiring up the API, then actually building the
                interface that sits on top of it.
              </p>
              <p>
                Before this, I spent six months in partner support, handling payment and
                process issues for business partners under real performance targets. It wasn't
                engineering, but it taught me how to stay calm, communicate clearly, and solve
                problems methodically — habits that carry directly into how I debug and ship
                code today.
              </p>
              <p>
                I'm still early in my career, and I'd rather say that plainly than dress it up.
                What I can promise is a genuine learning mindset, careful attention to detail,
                and code that I'm not embarrassed to have someone else read.
              </p>
            </div>
          </div>

          <div data-stagger className="grid grid-cols-2 gap-4 content-start">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-6 flex flex-col gap-2">
                <Counter value={s.value} suffix={s.suffix} />
                <span className="font-mono text-xs tracking-wide text-paper-500 uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
