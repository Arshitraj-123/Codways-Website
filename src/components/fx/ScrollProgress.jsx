import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export default function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (prefersReduced) return null

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, #4caf50, #26c6da)',
        boxShadow:
          '0 0 10px rgba(38, 198, 218, 0.75), 0 0 20px rgba(76, 175, 80, 0.5)',
      }}
      className="fixed top-0 inset-x-0 h-[3px] z-[60] pointer-events-none"
      aria-hidden="true"
    />
  )
}
