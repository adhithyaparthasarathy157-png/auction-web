import { useRef, useEffect } from 'react'

/**
 * CinematicBackground
 * ─────────────────────────────────────────────────────────────────────
 * Global, permanent, looping cinematic video background.
 *
 * • pointer-events: none on ALL elements → 100% interactive page
 * • loop, autoPlay, muted, playsInline   → seamless native looping
 * • Directly sets videoRef.current.muted = true for strict browser compliance
 * • Tab visibility & user-interaction autoplay resume handlers
 * • Independent lifecycle: Never unmounts, never hides, no loading state
 * ─────────────────────────────────────────────────────────────────────
 */
export default function CinematicBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isMounted = true

    // Guarantee browser recognizes muted state for autoplay policy
    video.muted = true
    video.defaultMuted = true

    const playVideo = () => {
      if (!isMounted || !video) return
      if (document.hidden) return

      const promise = video.play()
      if (promise !== undefined) {
        promise.catch((err) => {
          // AbortError is normal during fast reloads / power-save
          if (err.name !== 'AbortError') {
            // Silently swallow; user gesture will pick it up
          }
        })
      }
    }

    // Initial play
    playVideo()

    // Resume when user returns to tab
    const handleVisibilityChange = () => {
      if (!document.hidden && isMounted) {
        playVideo()
      }
    }

    // Resume if browser unexpectedly pauses background video
    const handlePause = () => {
      if (isMounted && !document.hidden && video && video.paused) {
        playVideo()
      }
    }

    // First user interaction unlock
    const handleUserGesture = () => {
      if (isMounted && video && video.paused) {
        playVideo()
      }
    }

    video.addEventListener('pause', handlePause)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pointerdown', handleUserGesture, { passive: true })
    window.addEventListener('touchstart', handleUserGesture, { passive: true })
    window.addEventListener('keydown', handleUserGesture, { passive: true })

    return () => {
      isMounted = false
      video.removeEventListener('pause', handlePause)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pointerdown', handleUserGesture)
      window.removeEventListener('touchstart', handleUserGesture)
      window.removeEventListener('keydown', handleUserGesture)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none',
          filter: 'none',
          transform: 'none',
          opacity: 1,
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Subtle atmospheric dark overlay for optimal text contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 2, 0.45)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
