import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

/**
 * SmartLink handles both internal React Router navigation and external links.
 * When external, opens in a new tab with security attributes (noopener noreferrer),
 * a screen-reader announcement, and an animated ExternalLink icon that slides in on hover.
 */
export default function SmartLink({
  href,
  to,
  external = false,
  disabled = false,
  showExternalIcon = true,
  iconSize = 13,
  className = '',
  children,
  onClick,
  ...rest
}) {
  const destination = href || to || '#'

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        role="link"
        tabIndex={-1}
        className={`cursor-not-allowed select-none ${className}`}
        {...rest}
      >
        {children}
      </span>
    )
  }

  if (external) {
    return (
      <a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`group/smartlink ${className}`}
        {...rest}
      >
        {children}
        {showExternalIcon && (
          <ExternalLink
            size={iconSize}
            className="inline-block shrink-0 ml-1.5 opacity-70 transition-transform duration-200 ease-out group-hover/smartlink:translate-x-0.5 group-hover/smartlink:-translate-y-0.5 group-hover/smartlink:opacity-100"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link
      to={destination}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  )
}
