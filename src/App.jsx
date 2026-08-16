import { useState } from 'react'
import { CursorProvider } from './context/CursorContext'
import CursorEngine from './components/CursorEngine'
import CursorSwitcher from './components/CursorSwitcher'
import Background from './components/Background'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Services from './components/Services'
import Process from './components/Process'
import Games from './components/Games'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <CursorProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Background />
      <CursorEngine />
      <CursorSwitcher />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Services />
        <Process />
        <Games />
        <Contact />
      </main>

      <Footer />
    </CursorProvider>
  )
}