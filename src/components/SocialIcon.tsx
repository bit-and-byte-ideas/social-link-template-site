import type { IconSource } from '../config/profile'

interface SocialIconProps {
  icon: IconSource
  className?: string
}

export function SocialIcon({ icon, className }: SocialIconProps) {
  if (icon.kind === 'image') {
    return <img src={icon.src} alt={icon.alt ?? ''} className={className} />
  }

  return (
    <svg className={className} role="presentation" aria-hidden="true">
      <use href={`/icons.svg#${icon.id}`} />
    </svg>
  )
}
