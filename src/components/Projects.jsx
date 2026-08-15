import { useState } from 'react'
import { Github, ArrowUpRight, Check } from 'lucide-react'
import { projects } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollAnimation'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const containerRef = useScrollReveal()
  const [activeProject, setActiveProject] = useState(null)

  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> PROJECTS
        </div>
        <h2 data-reveal="up" className="section-heading mb-4">
          Things I've built
        </h2>
        <p data-reveal="up" data-delay="0.1" className="section-sub mb-16">
          A mix of full-stack builds and focused UI clones — each one picked to sharpen a
          different part of the stack.
        </p>

        {/* Featured project */}
        {featured && (
          <div data-reveal="scale" className="mb-16">
            <div className="glass-card overflow-hidden grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-ink-border bg-gradient-to-br from-ink-700 to-ink-900 flex items-center justify-center">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={`${featured.title} logo`}
                    className="relative w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-3xl shadow-lg"
                  />
                ) : (
                  <span className="font-display font-extrabold text-6xl opacity-[0.14] text-signal-blueSoft tracking-tight">
                    {featured.title}
                  </span>
                )}
                <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_28px] opacity-30" />
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-glow-blue blur-2xl" />
                <div className="absolute bottom-8 right-10 w-20 h-20 rounded-full bg-glow-orange blur-2xl" />
              </div>

              <div className="p-8 sm:p-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-orangeSoft mb-4 inline-block">
                  Featured Project
                </span>
                <h3 className="font-display font-bold text-3xl text-paper-100 mb-3">
                  {featured.title}
                </h3>
                <p className="text-paper-300 leading-relaxed mb-5">{featured.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {featured.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-ink-700/60 border border-ink-border text-paper-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-7">
                  {featured.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-paper-500">
                      <Check size={14} className="mt-0.5 text-signal-blue shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveProject(featured)}
                    data-cursor-hover
                    className="btn-secondary"
                  >
                    See Full Details
                  </button>
                  <a href={featured.github} target="_blank" rel="noreferrer" data-cursor-hover className="btn-secondary">
                    <Github size={16} /> Code
                  </a>
                  <a href={featured.live} target="_blank" rel="noreferrer" data-cursor-hover className="btn-primary">
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rest of the projects */}
        <div data-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
