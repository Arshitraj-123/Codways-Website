import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function Magnetic({
  children,
  strength = 0.28,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { stiffness: 220, damping: 16 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  const handleMouseMove = (e) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = (e.clientX - centerX) * strength
    const dy = (e.clientY - centerY) * strength

    rawX.set(dx)
    rawY.set(dy)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  if (prefersReduced) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        ...style,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
