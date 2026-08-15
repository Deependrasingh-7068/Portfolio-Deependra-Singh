import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, ArrowUpRight } from 'lucide-react'

const ROTATING = ['Web Applications', 'Interactive Interfaces', 'Full Stack Products', 'REST APIs']
const HEADLINE = 'FULL STACK DEVELOPER'

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block h-[1.3em] overflow-hidden align-bottom">
      {ROTATING.map((word, i) => (
        <motion.span
          key={word}
          className="block text-signal-blueSoft"
          animate={{ y: `${(i - index) * -100}%`, opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          style={{ position: i === index ? 'relative' : 'absolute', top: 0, left: 0 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function ProfilePhoto() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating tech badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -left-4 sm:-top-6 sm:-left-8 z-20 glass-card px-3 py-2 flex items-center gap-2 font-mono text-xs text-signal-blueSoft"
      >
        <span className="w-2 h-2 rounded-full bg-signal-blue" /> React
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-6 z-20 glass-card px-3 py-2 flex items-center gap-2 font-mono text-xs text-signal-orangeSoft"
      >
        <span className="w-2 h-2 rounded-full bg-signal-orange" /> Node.js
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 -right-6 sm:-right-10 z-20 hidden sm:flex glass-card px-3 py-2 items-center gap-2 font-mono text-xs text-paper-300"
      >
        <span className="w-2 h-2 rounded-full bg-paper-300" /> MongoDB
      </motion.div>

      {/* Glow behind the photo */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-72 h-72 rounded-full bg-glow-blue blur-3xl opacity-70" />
      </div>

      {/* Photo frame */}
      <div className="relative rounded-[2rem] overflow-hidden border border-ink-border bg-gradient-to-b from-ink-800/40 to-ink-900/60 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] opacity-20" />
        <img
          src="/profile.png"
          alt="Deependra Singh"
          className="relative w-full h-auto object-contain select-none pointer-events-none"
          draggable="false"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/70 to-transparent" />
      </div>
    </div>
  )
}

function TerminalCard() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating tech badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -left-6 z-20 glass-card px-3 py-2 flex items-center gap-2 font-mono text-xs text-signal-blueSoft"
      >
        <span className="w-2 h-2 rounded-full bg-signal-blue" /> React
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-5 -right-4 z-20 glass-card px-3 py-2 flex items-center gap-2 font-mono text-xs text-signal-orangeSoft"
      >
        <span className="w-2 h-2 rounded-full bg-signal-orange" /> Node.js
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 -right-10 z-20 hidden sm:flex glass-card px-3 py-2 items-center gap-2 font-mono text-xs text-paper-300"
      >
        <span className="w-2 h-2 rounded-full bg-paper-300" /> MongoDB
      </motion.div>

      {/* Terminal window */}
      <div className="relative glass-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-border bg-ink-900/60">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[11px] text-paper-500">developer.js</span>
        </div>
        <pre className="p-5 font-mono text-[12.5px] leading-6 text-paper-300 overflow-x-auto">
          <code>
            <span className="text-signal-orange">const</span> <span className="text-signal-blueSoft">developer</span> = {'{'}
            {'\n'}  name: <span className="text-paper-100">'Deependra Singh'</span>,
            {'\n'}  role: <span className="text-paper-100">'Full Stack Developer'</span>,
            {'\n'}  stack: [<span className="text-paper-100">'React'</span>, <span className="text-paper-100">'Node'</span>, <span className="text-paper-100">'MongoDB'</span>],
            {'\n'}  status: <span className="text-signal-orangeSoft">'available_for_hire'</span>,
            {'\n'}  <span className="text-signal-blueSoft">shipFast</span>(){' '}{'{'}
            {'\n'}    <span className="text-signal-orange">return</span> <span className="text-paper-100">'always learning'</span>;
            {'\n'}  {'}'}
            {'\n'}{'}'};
            <span className="inline-block w-2 h-4 bg-signal-blue ml-1 animate-blink align-middle" />
          </code>
        </pre>
      </div>
    </div>
  )
}

export default function Hero() {
  const letters = HEADLINE.split('')

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6"
    >
      <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Left column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-signal-blue/30 bg-signal-blue/5 px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal-blue animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-signal-blueSoft">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-paper-100 mb-3"
          >
            Hi, I'm Deependra Singh.
          </motion.h1>

          <div className="mb-6 overflow-hidden">
            <div className="flex flex-wrap font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.02 }}
                  className={char === ' ' ? 'w-2 sm:w-3' : 'bg-gradient-to-r from-signal-blueSoft to-signal-orangeSoft bg-clip-text text-transparent'}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="section-sub mb-3"
          >
            I build modern, scalable and user-focused web applications using JavaScript, React,
            Node.js and modern web technologies.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-mono text-sm text-paper-500 mb-10"
          >
            I build <RotatingWord />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a
              href="#projects"
              data-cursor-hover
              className="btn-primary group"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="https://drive.google.com/file/d/1i4ybtuXZIyOtqVc2HY5jrFBfQBl762vs/view?usp=drive_link" data-cursor-hover download className="btn-secondary">
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/Deependrasingh-7068"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label="GitHub"
              className="w-10 h-10 rounded-full border border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-blueSoft hover:border-signal-blue/40 transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/deependra-singh-872414260/"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-blueSoft hover:border-signal-blue/40 transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="mailto:7he.deependra.singh.01@gmail.com"
              data-cursor-hover
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-ink-border flex items-center justify-center text-paper-300 hover:text-signal-orangeSoft hover:border-signal-orange/40 transition-colors"
            >
              <Mail size={17} />
            </a>
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProfilePhoto />
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-paper-500 hover:text-paper-100 transition-colors"
        aria-label="Scroll to About section"
        data-cursor-hover
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  )
}
