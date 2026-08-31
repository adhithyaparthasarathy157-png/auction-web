import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const timer = setInterval(() => {
      const elapsed = performance.now() - start
      const next = Math.min(100, Math.round((elapsed / 1100) * 100))
      setProgress(next)
      if (next === 100) {
        clearInterval(timer)
        setTimeout(onDone, 180)
      }
    }, 20)
    return () => clearInterval(timer)
  }, [onDone])

  return (
    <div className="loader" aria-label="Loading DPL Auction" aria-live="polite">
      <div className="loader-bg-ambient" />
      
      <div className="loader-top-bar">
        <span className="loader-brand-label">DPL // CRICKET AUCTION</span>
        <span className="loader-code">OFFICIAL PORTAL</span>
      </div>

      <div className="loader-center-content">
        <div className="loader-counter">
          <span className="loader-percentage">{progress}</span>
          <span className="loader-pct-symbol">%</span>
        </div>
        <span className="loader-status-text">INITIALIZING DPL AUCTION EXPERIENCE...</span>
      </div>

      <div className="loader-bottom-bar">
        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
