import { event, homeIntroCards } from '../data/eventData'
import { ArrowIcon, TrophyIcon, TargetIcon, TeamIcon } from './Icons'

const introIcons = [TrophyIcon, TargetIcon, TeamIcon]

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero-section section-grid">
      {/* Background ambient lighting, stadium glows, and subtle grid */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="ambient-glow blue-glow-top" />
        <div className="ambient-glow blue-glow-side" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="hero-container">
        {/* Top Kicker / Badge Row */}
        <div className="hero-eyebrow-row" data-reveal>
          <span className="kicker-badge">OFFICIAL EVENT PORTAL</span>
          <span className="kicker-edition">DPL // CRICKET AUCTION</span>
        </div>

        {/* Massive Display Heading */}
        <h1 className="hero-title-massive" data-reveal data-delay="1">
          <span className="hero-title-line">DPL</span>
          <span className="hero-title-line accent-gradient-blue">AUCTION<span className="blue-dot">.</span></span>
        </h1>

        {/* Editorial Divider Line */}
        <div className="hero-divider-bar" data-reveal data-delay="2" />

        {/* Taglines & Statement */}
        <div className="hero-statement-block" data-reveal data-delay="2">
          <h2 className="hero-tagline-text">{event.primaryTagline}</h2>
          <p className="hero-subtagline-text">{event.secondaryTagline}</p>
          <p className="hero-lead-paragraph">
            {event.description}
          </p>
        </div>

        {/* Feature Badges */}
        <div className="hero-pill-row" data-reveal data-delay="3">
          <div className="feature-pill">
            <span className="pill-dot blue-dot-pulse" />
            <span>CRICKET PLAYER AUCTION</span>
          </div>
          <div className="feature-pill">
            <span>TACTICAL BIDDING</span>
          </div>
          <div className="feature-pill">
            <span>FRANCHISE WAR ROOMS</span>
          </div>
          <div className="feature-pill">
            <span>OFFICIAL EDITION</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta-cluster" data-reveal data-delay="3">
          <button className="btn-primary" onClick={scrollToRegister}>
            <span>REGISTER FOR THE AUCTION</span>
            <ArrowIcon size={15} />
          </button>
          
          <button className="btn-secondary" onClick={scrollToAbout}>
            <span>EXPLORE THE EVENT</span>
            <ArrowIcon direction="down" size={13} />
          </button>
        </div>

        {/* Home Event Intro Cards: What is DPL Auction? */}
        <div className="hero-intro-section" data-reveal data-delay="4">
          <div className="intro-section-header">
            <span className="intro-eyebrow">EVENT OVERVIEW</span>
            <h3 className="intro-main-title">WHAT IS DPL AUCTION?</h3>
            <p className="intro-subtitle">
              A quick guide to understanding the purpose, competitive structure, and dynamic experience of the auction floor.
            </p>
          </div>

          <div className="home-intro-grid">
            {homeIntroCards.map((card, idx) => {
              const IconComp = introIcons[idx % introIcons.length]
              return (
                <div key={card.num} className="home-intro-card">
                  <div className="intro-card-top">
                    <div className="intro-icon-circle">
                      <IconComp size={18} />
                    </div>
                    <span className="intro-serial-num">{card.num}</span>
                  </div>

                  <span className="intro-card-label">{card.label}</span>
                  <h4 className="intro-card-heading">{card.title}</h4>
                  <p className="intro-card-body">{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
