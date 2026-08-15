import { education } from '../data/experience'
import { useScrollReveal } from '../hooks/useScrollAnimation'
import { GraduationCap } from 'lucide-react'

export default function Education() {
  const containerRef = useScrollReveal()

  return (
    <section id="education" className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> EDUCATION
        </div>
        <h2 data-reveal="up" className="section-heading mb-12">
          Academic background
        </h2>

        <div data-reveal="scale" className="relative max-w-2xl">
          <div className="glass-card p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-glow-blue blur-3xl opacity-60" />
            <div className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.25em] text-paper-500 uppercase">
              Certificate
            </div>

            <div className="relative flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-signal-blue/10 border border-signal-blue/30 flex items-center justify-center text-signal-blueSoft shrink-0">
                <GraduationCap size={26} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-paper-100 mb-1">
                  {education.degree}
                </h3>
                <p className="text-paper-300 mb-1">{education.university}</p>
                <p className="font-mono text-xs text-paper-500">
                  {education.period} · {education.location}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-ink-border flex items-center justify-between">
              <span className="font-mono text-[11px] text-paper-500 tracking-wide">
                DEGREE VERIFIED
              </span>
              <span className="font-mono text-[11px] text-signal-blueSoft tracking-wide">
                GRADUATED · 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
