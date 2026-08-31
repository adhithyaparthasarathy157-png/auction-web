import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Why from './components/Why'
import Schedule from './components/Schedule'
import FinalCta from './components/FinalCta'

export default function App() {
  useScrollReveal()

  return (
    <div className="site-wrapper">
      <Navbar />
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
