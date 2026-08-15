import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-ink-border px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold text-lg text-paper-100">
            Deependra Singh<span className="text-signal-blue">.</span>
          </span>
          <span className="font-mono text-xs text-paper-500">Full Stack Developer</span>
        </div>

        <nav className="flex items-center gap-6 font-mono text-xs text-paper-500">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-cursor-hover
              className="link-underline hover:text-paper-100"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Deependrasingh-7068"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="GitHub"
            className="w-9 h-9 rounded-full border border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-blueSoft hover:border-signal-blue/40 transition-colors"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/deependra-singh-872414260/"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full border border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-blueSoft hover:border-signal-blue/40 transition-colors"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:7he.deependra.singh.01@gmail.com"
            data-cursor-hover
            aria-label="Email"
            className="w-9 h-9 rounded-full border border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-orangeSoft hover:border-signal-orange/40 transition-colors"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-ink-border flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-paper-700">
        <span>© 2026 Deependra Singh. All rights reserved.</span>
        <span>Built with React &amp; ☕</span>
      </div>
    </footer>
  )
}
