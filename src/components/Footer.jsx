import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import Logo from './Logo.jsx'
import Reveal from './Reveal.jsx'
import { footer } from '../data/content.js'

const socials = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Youtube, href: '#' },
]

const col = (title, items) => (
  <div>
    <h4 className="font-bold mb-5 text-heading text-sm tracking-wide">{title}</h4>
    <ul className="space-y-3 text-sm text-muted font-medium">
      {items.map(([label, to]) => (
        <li key={label}>
          <Link to={to} className="hover:text-accent transition-colors inline-block">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default function Footer() {
  return (
    <footer className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-bg text-fg border-t border-line">
      <div className="max-w-7xl mx-auto">
        <Reveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-6">
              <Logo footer />
            </div>
            <p className="mb-6 text-sm text-muted leading-relaxed max-w-sm font-normal">
              {footer.blurb}
            </p>
            <div className="flex items-center space-x-2.5">
              {socials.map((s, i) => {
                const Icon = s.icon
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label="Social Link"
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] hover:bg-accent hover:text-white transition-all"
                  >
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
          </div>
          {col('Programs', footer.programs.map(p => [p, '/products']))}
          {col('Company', footer.company)}
          {col('Support', footer.support)}
        </Reveal>
        <div className="border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted font-medium">
          <p className="mb-4 md:mb-0">{footer.copyright}</p>
          <div className="flex items-center space-x-3">
            <span>Made with <span className="text-red-500">❤️</span> in India</span>
            <span>•</span>
            <span>🇮🇳 Proudly Indian</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
