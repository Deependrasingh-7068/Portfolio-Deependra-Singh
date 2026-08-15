import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Github, ArrowUpRight, Check } from 'lucide-react'
import { modalBackdrop, modalPanel } from '../utils/animations'

export default function ProjectModal({ project, onClose }) {
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageFailed(false)
  }, [project])

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-ink-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
        >
          <motion.div
            variants={modalPanel}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[86vh] overflow-y-auto glass-card p-0"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink-900/80 border border-ink-border flex items-center justify-center text-paper-300 hover:text-paper-100"
            >
              <X size={18} />
            </button>

            <div className="relative h-52 sm:h-64 border-b border-ink-border bg-gradient-to-br from-ink-700 to-ink-900 flex items-center justify-center overflow-hidden">
              {project.image && !imageFailed ? (
                <motion.img
                  key={project.image}
                  src={project.image}
                  alt={`${project.title} preview`}
                  onError={() => setImageFailed(true)}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
                <span className="font-display font-extrabold text-5xl sm:text-6xl opacity-[0.14] text-signal-blueSoft tracking-tight">
                  {project.title}
                </span>
              )}
              <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent opacity-70" />
            </div>

            <div className="p-6 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-wider text-signal-blueSoft mb-2">
                {project.category}
              </p>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-paper-100 mb-4">
                {project.title}
              </h3>
              <p className="text-paper-300 leading-relaxed mb-6">{project.longDescription}</p>

              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-paper-500 mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-ink-700/60 border border-ink-border text-paper-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-wider text-paper-500 mb-3">
                  Features
                </h4>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-paper-300">
                      <Check size={14} className="mt-0.5 text-signal-blue shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="btn-secondary"
                >
                  <Github size={16} /> View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="btn-primary"
                >
                  Live Demo <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
