import { Code2, Server, Layers, PanelsTopLeft, ShieldCheck, Plug } from 'lucide-react'
import { services } from '../data/experience'
import { useScrollReveal } from '../hooks/useScrollAnimation'

const ICONS = [Code2, Server, Layers, PanelsTopLeft, ShieldCheck, Plug]

export default function Services() {
  const containerRef = useScrollReveal()

  return (
    <section className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-orange" /> WHAT I CAN BUILD
        </div>
        <h2 data-reveal="up" className="section-heading mb-14">
          Ways I can help
        </h2>

        <div data-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                key={s.title}
                className="glass-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-signal-blue/30"
              >
                <div className="w-12 h-12 rounded-xl bg-ink-700/70 border border-ink-border flex items-center justify-center text-signal-blueSoft mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-lg text-paper-100 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-paper-500 leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
