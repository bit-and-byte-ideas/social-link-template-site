import { render, screen } from '@testing-library/react'
import App from './App'
import { profile, socialLinks } from './config/profile'

describe('App', () => {
  it('renders the streamer name and bio', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: profile.displayName }),
    ).toBeInTheDocument()
    expect(screen.getByText(profile.bio)).toBeInTheDocument()
  })

  it('renders a link for every configured platform', () => {
    render(<App />)

    for (const link of socialLinks) {
      const anchor = screen.getByRole('link', { name: new RegExp(link.label, 'i') })
      expect(anchor).toHaveAttribute('href', link.url)
      expect(anchor).toHaveAttribute('target', '_blank')
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('shows an offline status pill by default', () => {
    render(<App />)

    expect(screen.getByText(/offline/i)).toBeInTheDocument()
  })
})
