import { process } from '../data/experience'
import { useScrollReveal } from '../hooks/useScrollAnimation'

export default function Process() {
  const containerRef = useScrollReveal()

  return (
    <section className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> PROCESS
        </div>
        <h2 data-reveal="up" className="section-heading mb-4">
          How a project moves
        </h2>
        <p data-reveal="up" data-delay="0.1" className="section-sub mb-16">
          Four stages, in order — each one feeding into the next.
        </p>

        {/* Desktop: horizontal */}
        <div data-stagger className="hidden md:grid grid-cols-4 gap-6 relative">
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-ink-border" />
          {process.map((p) => (
            <div key={p.step} className="relative">
              <div className="w-12 h-12 rounded-full bg-ink-900 border border-signal-blue/40 flex items-center justify-center font-mono text-sm text-signal-blueSoft mb-6 relative z-10">
                {p.step}
              </div>
              <h3 className="font-display font-semibold text-lg text-paper-100 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-paper-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div data-stagger className="md:hidden relative pl-10">
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-ink-border" />
          <div className="space-y-10">
            {process.map((p) => (
              <div key={p.step} className="relative">
                <div className="absolute -left-10 w-12 h-12 rounded-full bg-ink-900 border border-signal-blue/40 flex items-center justify-center font-mono text-sm text-signal-blueSoft">
                  {p.step}
                </div>
                <h3 className="font-display font-semibold text-lg text-paper-100 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-paper-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
