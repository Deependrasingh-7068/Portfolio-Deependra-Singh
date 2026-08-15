import { experience, learnings } from '../data/experience'
import { useScrollReveal } from '../hooks/useScrollAnimation'
import { Briefcase } from 'lucide-react'

export default function Experience() {
  const containerRef = useScrollReveal()

  return (
    <section id="experience" className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> EXPERIENCE
        </div>
        <h2 data-reveal="up" className="section-heading mb-14">
          Where I've worked
        </h2>

        <div className="relative pl-8 sm:pl-12">
          {/* Timeline line */}
          <div
            data-reveal="scale"
            className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-signal-blue via-ink-borderStrong to-transparent origin-top"
          />

          <div data-reveal="left" className="relative mb-4">
            <span className="absolute -left-[26px] sm:-left-[34px] top-1.5 w-3 h-3 rounded-full bg-signal-blue ring-4 ring-signal-blue/15" />
            <div className="glass-card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-signal-blue/10 border border-signal-blue/30 flex items-center justify-center text-signal-blueSoft">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-paper-100">
                      {experience.role}
                    </h3>
                    <p className="font-mono text-xs text-paper-500">{experience.period}</p>
                  </div>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full border border-signal-orange/30 text-signal-orangeSoft bg-signal-orange/5">
                  {experience.duration}
                </span>
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-paper-300">
                {experience.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-2 w-1 h-1 rounded-full bg-paper-500 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What I learned */}
        <div className="mt-20">
          <div data-reveal="up" className="eyebrow mb-4">
            <span className="w-6 h-px bg-signal-orange" /> WHAT I LEARNED
          </div>
          <div data-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {learnings.map((l) => (
              <div
                key={l.title}
                className="glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-signal-orange/40"
              >
                <h4 className="font-display font-semibold text-paper-100 mb-1.5">{l.title}</h4>
                <p className="text-sm text-paper-500 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
