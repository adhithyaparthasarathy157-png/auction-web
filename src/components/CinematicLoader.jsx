import { useEffect, useState, useRef } from 'react'

/**
 * CinematicLoader
 * ─────────────────────────────────────────────────────────────────────
 * Premium 01% → 100% full-screen initial loading experience.
 *
 * • Smooth multi-stage easing progression over ~3.2 seconds
 * • High-contrast black & electric blue DPL Auction arena aesthetic
 * • Dynamic telemetry status ticker updating in sync with percentage
 * • Smooth cinematic scale & fade-out reveal sequence
 * • Auto unmounts and restores normal page scrolling upon completion
 * ─────────────────────────────────────────────────────────────────────
 */
export default function CinematicLoader() {
  const [percent, setPercent] = useState(1)
  const [phase, setPhase] = useState('loading') // 'loading' | 'revealing' | 'done'
  const animFrameRef = useRef(null)

  useEffect(() => {
    // Lock scrolling while loader is active
    document.body.style.overflow = 'hidden'

    const startTime = performance.now()
    const DURATION = 3200 // 3.2s total cinematic duration

    const updateCounter = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / DURATION)

      // Cinematic multi-stage non-linear easing curve
      let eased
      if (progress < 0.3) {
        // Initial steady ramp 1% -> 30%
        eased = (progress / 0.3) * 0.3
      } else if (progress < 0.7) {
        // Middle strategic pause / calibrating stage
        const midT = (progress - 0.3) / 0.4
        eased = 0.3 + Math.pow(midT, 0.9) * 0.45
      } else {
        // Final rapid sprint 75% -> 100%
        const endT = (progress - 0.7) / 0.3
        eased = 0.75 + Math.pow(endT, 1.2) * 0.25
      }

      const currentVal = Math.min(100, Math.max(1, Math.round(eased * 100)))
      setPercent(currentVal)

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(updateCounter)
      } else {
        setPercent(100)
        // Hold on 100% briefly before initiating cinematic reveal
        setTimeout(() => {
          setPhase('revealing')
          // Unlock page scroll immediately as reveal begins
          document.body.style.overflow = ''
          // Complete unmount after fade transition
          setTimeout(() => {
            setPhase('done')
          }, 850)
        }, 280)
      }
    }

    animFrameRef.current = requestAnimationFrame(updateCounter)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  // Dynamic telemetry status ticker
  let statusText = 'INITIALIZING CRICKET ARENA ENGINE...'
  if (percent > 25 && percent <= 55) {
    statusText = 'CALIBRATING BIDDING MATRIX & WAR ROOMS...'
  } else if (percent > 55 && percent <= 85) {
    statusText = 'SYNCING PLAYER ROSTERS & AUCTION ASSETS...'
  } else if (percent > 85 && percent < 100) {
    statusText = 'FINALIZING AUCTION FLOOR STAGE...'
  } else if (percent === 100) {
    statusText = 'ARENA READY // ENTERING DPL AUCTION'
  }

  const formattedNum = percent < 10 ? `0${percent}` : `${percent}`

  return (
    <div
      className={`cinematic-loader-overlay ${phase === 'revealing' ? 'loader-fade-out' : ''}`}
      aria-label={`Loading ${percent}%`}
      aria-live="polite"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={1}
      aria-valuemax={100}
    >
      {/* Background ambient lighting */}
      <div className="loader-ambient-glow" aria-hidden="true" />
      <div className="loader-grid-lines" aria-hidden="true" />

      {/* Top Bar Branding */}
      <div className="loader-top-row">
        <div className="loader-brand-badge">
          <span className="loader-pulse-dot" />
          <span className="loader-brand-title">DPL // CRICKET AUCTION</span>
        </div>
        <div className="loader-edition-tag">OFFICIAL PORTAL // 2026 EDITION</div>
      </div>

      {/* Center Percentage Display */}
      <div className="loader-center-hero">
        <div className="loader-counter-wrap">
          <span className="loader-huge-number">{formattedNum}</span>
          <span className="loader-pct-sign">%</span>
        </div>

        <div className="loader-status-container">
          <span className="loader-status-live-dot" />
          <span className="loader-status-msg">{statusText}</span>
        </div>
      </div>

      {/* Bottom Precision Progress Track */}
      <div className="loader-bottom-row">
        <div className="loader-track-bar">
          <div
            className="loader-track-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="loader-footer-meta">
          <span className="loader-meta-item">AUCTION SYSTEM // V2.6</span>
          <span className="loader-meta-item">TRANSMISSION: SECURE</span>
        </div>
      </div>
    </div>
  )
}
