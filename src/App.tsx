import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { profile, socialLinks } from './config/profile'
import { SocialIcon } from './components/SocialIcon'
import './App.css'

function App() {
  const isLive = profile.status === 'live'

  useEffect(() => {
    document.title = `${profile.displayName} · Links`
  }, [])

  return (
    <main className="monitor">
      <div className="monitor__scanlines" aria-hidden="true" />

      <section className="channel-card">
        <img
          className="avatar"
          src={profile.avatarSrc}
          width={96}
          height={96}
          alt={profile.avatarAlt}
        />

        <p className="status-pill" data-live={isLive}>
          <span className="status-pill__dot" aria-hidden="true" />
          {isLive ? 'On air' : 'Offline'}
        </p>

        <h1 className="name">{profile.displayName}</h1>
        <p className="tagline">{profile.tagline}</p>
        <p className="bio">{profile.bio}</p>

        <div className="ticks" aria-hidden="true" />

        <ul className="links">
          {socialLinks.map((link) => {
            const style = link.brandColor
              ? ({ '--link-accent': link.brandColor } as CSSProperties)
              : undefined

            return (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={style}>
                  <SocialIcon icon={link.icon} className="link-icon" />
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="footer-note">social-link-template-site</p>
    </main>
  )
}

export default App
