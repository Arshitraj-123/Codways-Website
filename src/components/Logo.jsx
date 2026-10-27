import { Link } from 'react-router-dom'

export default function Logo({ footer = false }) {
  return (
    <Link to="/" className={`inline-flex items-center ${footer ? 'footer-logo' : ''}`} aria-label="Codways Technologies home">
      <img
        src="/assets/logo.png"
        onError={(e) => { e.currentTarget.src = '/logo.png' }}
        alt="CODWAYS TECHNOLOGIES"
        className={footer ? "h-10 sm:h-11 w-auto object-contain" : "h-9 sm:h-10 w-auto object-contain"}
      />
    </Link>
  )
}
