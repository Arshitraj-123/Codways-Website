import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function CursorGlow() {
  const prefersReduced = useReducedMotion()
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-1000)
  const rawY = useMotionValue(-1000)

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 }
  const smoothX = useSpring(rawX, springConfig)
  const smoothY = useSpring(rawY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: fine)')
    setHasFinePointer(mq.matches)

    const handleMqChange = (e) => setHasFinePointer(e.matches)
    mq.addEventListener?.('change', handleMqChange)

    const handleMouseMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      mq.removeEventListener?.('change', handleMqChange)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [visible])

  if (prefersReduced || !hasFinePointer) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
        background:
          'radial-gradient(circle, rgba(76, 175, 80, 0.14) 0%, rgba(38, 198, 218, 0.04) 40%, transparent 70%)',
      }}
      className="fixed top-0 left-0 w-[520px] h-[520px] rounded-full pointer-events-none z-[40]"
    />
  )
}
