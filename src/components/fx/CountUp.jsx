import { useState, useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export default function CountUp({ text, children, duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReduced = useReducedMotion()

  const raw = String(text ?? children ?? '')
  const match = raw.match(/(\d+)/)

  const targetNumber = match ? parseInt(match[1], 10) : 0
  const prefix = match ? raw.slice(0, match.index) : raw
  const suffix = match ? raw.slice(match.index + match[1].length) : ''

  const [currentVal, setCurrentVal] = useState(prefersReduced ? targetNumber : 0)

  useEffect(() => {
    if (prefersReduced) {
      setCurrentVal(targetNumber)
      return
    }

    if (!isInView || !match) return

    let startTime = null
    let rafId = null
    const durationMs = duration * 1000

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(1, elapsed / durationMs)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(eased * targetNumber)

      setCurrentVal(value)

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setCurrentVal(targetNumber)
      }
    }

    rafId = requestAnimationFrame(step)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isInView, targetNumber, duration, prefersReduced])

  if (!match) {
    return <span className={className}>{raw}</span>
  }

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {currentVal}
      {suffix}
    </span>
  )
}
