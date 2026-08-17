import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative border-t border-ink-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        
        {/* Brand */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-display text-lg font-bold text-paper-100">
            Deependra Singh
            <span className="text-signal-blue">.</span>
          </span>

          <span className="font-mono text-xs text-paper-500">
            Full Stack Developer
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 font-mono text-xs text-paper-500">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              data-cursor-hover
              className="link-underline hover:text-paper-100"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          
          {/* GitHub */}
          <a
            href="https://github.com/Deependrasingh-7068"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-paper-300 transition-colors hover:border-signal-blue/40 hover:text-signal-blueSoft"
          >
            <Github size={15} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/deependra-singh-872414260/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-paper-300 transition-colors hover:border-signal-blue/40 hover:text-signal-blueSoft"
          >
            <Linkedin size={15} />
          </a>

          {/* Email */}
          <a
            href="mailto:7he.deependra.singh.01@gmail.com"
            data-cursor-hover
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-paper-300 transition-colors hover:border-signal-orange/40 hover:text-signal-orangeSoft"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-ink-border pt-6 font-mono text-[11px] text-paper-700 sm:flex-row">
        <span>
          © 2026 Deependra Singh. All rights reserved.
        </span>

        <span>
          Built with React &amp; ☕
        </span>
      </div>
    </footer>
  )
}