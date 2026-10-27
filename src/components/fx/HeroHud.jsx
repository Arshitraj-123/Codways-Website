import { motion, useReducedMotion } from 'framer-motion'

export default function HeroHud() {
  const prefersReduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 6 }}
    >
      {/* 4 L-shaped Corner Brackets (viewfinder framing without obstructing video) */}
      {/* Top-Left Bracket */}
      <motion.div
        initial={prefersReduced ? { opacity: 0.8 } : { opacity: 0 }}
        animate={
          prefersReduced
            ? { opacity: 0.8 }
            : {
                opacity: [0, 0.9, 0.35, 0.9],
              }
        }
        transition={
          prefersReduced
            ? {}
            : {
                delay: 1.2,
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 0,
                times: [0, 0.2, 0.6, 1],
                ease: 'easeInOut',
              }
        }
        className="absolute w-[40px] h-[40px] border-t-2 border-l-2 border-[#4caf50] pointer-events-none"
        style={{ top: '96px', left: '24px' }}
      />

      {/* Top-Right Bracket */}
      <motion.div
        initial={prefersReduced ? { opacity: 0.8 } : { opacity: 0 }}
        animate={
          prefersReduced
            ? { opacity: 0.8 }
            : {
                opacity: [0, 0.9, 0.35, 0.9],
              }
        }
        transition={
          prefersReduced
            ? {}
            : {
                delay: 1.35,
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 0,
                times: [0, 0.2, 0.6, 1],
                ease: 'easeInOut',
              }
        }
        className="absolute w-[40px] h-[40px] border-t-2 border-r-2 border-[#4caf50] pointer-events-none"
        style={{ top: '96px', right: '24px' }}
      />

      {/* Bottom-Left Bracket */}
      <motion.div
        initial={prefersReduced ? { opacity: 0.8 } : { opacity: 0 }}
        animate={
          prefersReduced
            ? { opacity: 0.8 }
            : {
                opacity: [0, 0.9, 0.35, 0.9],
              }
        }
        transition={
          prefersReduced
            ? {}
            : {
                delay: 1.5,
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 0,
                times: [0, 0.2, 0.6, 1],
                ease: 'easeInOut',
              }
        }
        className="absolute w-[40px] h-[40px] border-b-2 border-l-2 border-[#4caf50] pointer-events-none"
        style={{ bottom: '112px', left: '24px' }}
      />

      {/* Bottom-Right Bracket */}
      <motion.div
        initial={prefersReduced ? { opacity: 0.8 } : { opacity: 0 }}
        animate={
          prefersReduced
            ? { opacity: 0.8 }
            : {
                opacity: [0, 0.9, 0.35, 0.9],
              }
        }
        transition={
          prefersReduced
            ? {}
            : {
                delay: 1.65,
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 0,
                times: [0, 0.2, 0.6, 1],
                ease: 'easeInOut',
              }
        }
        className="absolute w-[40px] h-[40px] border-b-2 border-r-2 border-[#4caf50] pointer-events-none"
        style={{ bottom: '112px', right: '24px' }}
      />
    </div>
  )
}
