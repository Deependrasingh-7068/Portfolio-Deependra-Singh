import { useState } from 'react'
import { Github, ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(project.image) && !imageFailed

  const accentText = project.accent === 'orange' ? 'text-signal-orangeSoft' : 'text-signal-blueSoft'
  const accentBorder =
    project.accent === 'orange' ? 'group-hover:border-signal-orange/40' : 'group-hover:border-signal-blue/40'
  const accentGlow = project.accent === 'orange' ? 'group-hover:shadow-glowOrange' : 'group-hover:shadow-glowBlue'

  return (
    <div
      data-cursor-project
      onClick={() => onOpen(project)}
      className={`group relative glass-card overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 ${accentBorder} ${accentGlow}`}
    >
      {/* Preview area */}
      <div className="relative h-44 sm:h-52 overflow-hidden border-b border-ink-border bg-gradient-to-br from-ink-700 to-ink-900">
        {showImage ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-center scale-100 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
            <span className={`font-display font-extrabold text-4xl sm:text-5xl opacity-[0.14] tracking-tight ${accentText}`}>
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink-950/40">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-paper-100 border border-ink-borderStrong rounded-full px-4 py-2 bg-ink-900/80 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Project
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className={`font-mono text-[11px] uppercase tracking-wider mb-2 ${accentText}`}>
          {project.category}
        </p>
        <h3 className="font-display font-semibold text-xl text-paper-100 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-paper-500 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-1 rounded-md bg-ink-700/60 border border-ink-border text-paper-300 transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[10px] px-2 py-1 text-paper-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-paper-300 link-underline hover:text-paper-100"
          >
            <Github size={14} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-cursor-hover
            className={`inline-flex items-center gap-1.5 link-underline hover:text-paper-100 ${accentText}`}
          >
            Live Demo <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}
