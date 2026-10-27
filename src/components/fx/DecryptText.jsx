import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useSiteReady } from './ReadyContext.jsx'

const CHARS = '01<>/{}[]#$%&*+=?A-Z'

export default function DecryptText({
  text = 'Platform',
  delay = 500,
  duration = 1300,
  className = '',
  style = {},
}) {
  const ready = useSiteReady()
  const prefersReduced = useReducedMotion()
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text)
      return
    }

    if (!ready) {
      // Start scrambled before ready
      setDisplayText(
        text
          .split('')
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join('')
      )
      return
    }

    let rafId
    let startTime = null

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(1, elapsed / duration)

        // Characters resolve left-to-right
        const resolvedCount = Math.floor(progress * text.length)

        let result = ''
        for (let i = 0; i < text.length; i++) {
          if (i < resolvedCount) {
            result += text[i]
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }

        setDisplayText(result)

        if (progress < 1) {
          rafId = requestAnimationFrame(step)
        } else {
          setDisplayText(text)
        }
      }

      rafId = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ready, text, delay, duration, prefersReduced])

  return (
    <span
      className={`relative inline-block ${className}`}
      aria-label={text}
      style={style}
    >
      {/* Invisible real text to prevent layout shift */}
      <span className="invisible select-none" aria-hidden="true">
        {text}
      </span>
      {/* Decrypting / Scrambling overlay */}
      <span className="absolute inset-0 select-none" aria-hidden="true">
        {displayText}
      </span>
    </span>
  )
}
