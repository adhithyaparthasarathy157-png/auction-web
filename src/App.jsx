import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Why from './components/Why'
import Schedule from './components/Schedule'
import FinalCta from './components/FinalCta'
import CinematicBackground from './components/CinematicBackground'
import CinematicLoader from './components/CinematicLoader'

export default function App() {
  useScrollReveal()

  return (
    <div className="site-wrapper">
      {/* 
        Layer 9999: Cinematic Initial Full-Screen Loader (01% → 100%)
        Animates smoothly, reveals website with seamless fade/scale transition, then unmounts.
      */}
      <CinematicLoader />

      {/* 
        Layer 0: Global Viewport-Fixed Cinematic Video Background
        Plays continuously, loops automatically, never blocks user interaction.
      */}
      <CinematicBackground />

      {/* Layer 100: Navigation Bar */}
      <Navbar />

      {/* Layer 10: Main Website Content Stream */}
      <main className="main-content-stream">
        <Hero />
        <About />
        <Why />
        <Schedule />
        <FinalCta />
      </main>
    </div>
  )
}
