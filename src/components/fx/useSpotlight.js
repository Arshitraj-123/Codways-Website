import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useSpotlight() {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return

    const handleMouseMove = (e) => {
      const target = e.target?.closest?.('[data-spot]')
      if (!target) return

      const rect = target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      target.style.setProperty('--mx', `${Math.round(x)}px`)
      target.style.setProperty('--my', `${Math.round(y)}px`)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReduced])
}

export default useSpotlight
