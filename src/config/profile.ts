import avatarPlaceholder from '../assets/avatar-placeholder.svg'

/**
 * An icon is either a symbol from `public/icons.svg` (the built-in set) or a
 * standalone image file you drop in `src/assets/` — see README.md.
 */
export type IconSource =
  | { kind: 'sprite'; id: string }
  | { kind: 'image'; src: string; alt?: string }

export type StreamStatus = 'live' | 'offline'

export interface StreamerProfile {
  displayName: string
  tagline: string
  bio: string
  avatarSrc: string
  avatarAlt: string
  /** Flip this to 'live' while you're streaming, back to 'offline' after. */
  status: StreamStatus
}

export interface SocialLink {
  id: string
  label: string
  url: string
  icon: IconSource
  /** Hex color shown on hover/focus. Defaults to the site accent when omitted. */
  brandColor?: string
}

// ---------------------------------------------------------------------------
// Edit everything below with your own info. See README.md for the full guide
// to customizing the profile, links, and icons.
// ---------------------------------------------------------------------------

export const profile: StreamerProfile = {
  displayName: 'Nova Ridley',
  tagline: 'Variety streamer · cozy games & late-night chats',
  bio: 'Streaming games, art, and way too much chatting since 2019. New sessions Tuesday, Thursday, and Saturday at 7pm ET — pull up, say hi, stay for the chaos.',
  avatarSrc: avatarPlaceholder,
  avatarAlt: 'Nova Ridley',
  status: 'offline',
}

export const socialLinks: SocialLink[] = [
  {
    id: 'twitch',
    label: 'Twitch',
    url: 'https://twitch.tv/',
    icon: { kind: 'sprite', id: 'twitch-icon' },
    brandColor: '#9146ff',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://youtube.com/',
    icon: { kind: 'sprite', id: 'youtube-icon' },
    brandColor: '#ff0000',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/',
    icon: { kind: 'sprite', id: 'instagram-icon' },
    brandColor: '#e1306c',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    url: 'https://tiktok.com/',
    icon: { kind: 'sprite', id: 'tiktok-icon' },
    brandColor: '#25f4ee',
  },
  {
    id: 'x',
    label: 'X',
    url: 'https://x.com/',
    icon: { kind: 'sprite', id: 'x-icon' },
    brandColor: '#e7e9ea',
  },
  {
    id: 'discord',
    label: 'Discord',
    url: 'https://discord.gg/',
    icon: { kind: 'sprite', id: 'discord-icon' },
    brandColor: '#5865f2',
  },
]
