import { useState } from 'react'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaPython
} from 'react-icons/fa'
import {
  SiVite, SiTailwindcss, SiGreensock, SiExpress, SiMongodb, SiCplusplus,
  SiMysql, SiCloudinary
} from 'react-icons/si'
import { Database, Binary, Network, Terminal } from 'lucide-react'
import { skillCategories } from '../data/skills'
import { useScrollReveal } from '../hooks/useScrollAnimation'

const ICONS = {
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  JavaScript: FaJs,
  React: FaReact,
  Vite: SiVite,
  'Tailwind CSS': SiTailwindcss,
  GSAP: SiGreensock,
  'Node.js': FaNodeJs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  Mongoose: Database,
  'REST APIs': Network,
  C: Binary,
  'C++': SiCplusplus,
  Python: FaPython,
  SQL: SiMysql,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Docker: FaDocker,
  'VS Code': Terminal,
  'MongoDB Atlas': SiMongodb,
  Cloudinary: SiCloudinary
}

export default function Skills() {
  const containerRef = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)
  const current = skillCategories.find((c) => c.id === activeCategory)

  return (
    <section id="skills" className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-blue" /> TECH STACK
        </div>
        <h2 data-reveal="up" className="section-heading mb-4">
          Tools I reach for
        </h2>
        <p data-reveal="up" data-delay="0.1" className="section-sub mb-10">
          Not a percentage bar in sight — just the technologies I actually use to design, build
          and ship applications.
        </p>

        {/* Category tabs */}
        <div data-reveal="up" data-delay="0.15" className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              data-cursor-hover
              className={`font-mono text-xs tracking-wide uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-signal-blue/50 bg-signal-blue/10 text-signal-blueSoft'
                  : 'border-ink-border text-paper-500 hover:text-paper-100 hover:border-ink-borderStrong'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="font-mono text-xs text-paper-500 mb-6">// {current.note}</p>

        <div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {current.skills.map((skill, i) => {
            const Icon = ICONS[skill.name] || FaJs
            return (
              <div
                key={skill.name}
                className="group glass-card p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-signal-blue/40 hover:shadow-glowBlue"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Icon
                  size={26}
                  className="text-paper-300 group-hover:text-signal-blueSoft transition-colors duration-300"
                />
                <div>
                  <div className="font-display font-semibold text-sm text-paper-100">
                    {skill.name}
                  </div>
                  <div className="text-xs text-paper-500 mt-1 leading-snug">{skill.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
