import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function LogoLoader({ onReveal, onDone }) {
  const prefersReduced = useReducedMotion()
  const [logoDim, setLogoDim] = useState(null)
  const [phase, setPhase] = useState('merging') // 'merging' | 'hold' | 'exit'
  const [progress, setProgress] = useState(0)
  const doneRef = useRef(false)

  // Fail-safe cleanup and complete helper
  const completeLoader = (skipToDone = false) => {
    if (doneRef.current) return
    if (skipToDone) {
      doneRef.current = true
      try {
        sessionStorage.setItem('cw_loaded', '1')
      } catch (e) {}
      onReveal?.()
      onDone?.()
    }
  }

  // Preload and measure logo image
  useEffect(() => {
    // Check if previously loaded in session or reduced-motion
    let alreadyLoaded = false
    try {
      alreadyLoaded = sessionStorage.getItem('cw_loaded') === '1'
    } catch (e) {}

    if (alreadyLoaded || prefersReduced) {
      completeLoader(true)
      return
    }

    // Lock body scroll while loader is active
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const img = new Image()
    img.src = '/assets/logo.png'

    img.onload = () => {
      const naturalW = img.naturalWidth || 489
      const naturalH = img.naturalHeight || 152
      const aspectRatio = naturalH / naturalW

      // Size displayed logo to min(440px, 78vw)
      const maxW = Math.min(440, window.innerWidth * 0.78)
      // Round width to multiple of 7 and height to multiple of 4
      const targetW = Math.max(280, Math.round(maxW / 7) * 7)
      const targetH = Math.max(80, Math.round((targetW * aspectRatio) / 4) * 4)

      setLogoDim({ width: targetW, height: targetH })
    }

    img.onerror = () => {
      // Fallback path
      const imgFallback = new Image()
      imgFallback.src = '/logo.png'
      imgFallback.onload = () => {
        const targetW = Math.round(Math.min(440, window.innerWidth * 0.78) / 7) * 7
        const targetH = Math.round((targetW * (152 / 489)) / 4) * 4
        setLogoDim({ width: targetW, height: targetH })
      }
      imgFallback.onerror = () => {
        completeLoader(true)
      }
    }

    // Maximum 9s fail-safe timeout
    const failSafeTimeout = setTimeout(() => {
      completeLoader(true)
    }, 9000)

    return () => {
      clearTimeout(failSafeTimeout)
      document.body.style.overflow = originalOverflow
    }
  }, [prefersReduced])

  // Sequence Timeline Driver
  useEffect(() => {
    if (!logoDim) return

    // Progress bar fill across 0 to 3.2s
    const startTime = performance.now()
    const duration = 3200
    let rafId

    const updateProgress = (now) => {
      const elapsed = now - startTime
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)
      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }
    rafId = requestAnimationFrame(updateProgress)

    // Timeline phases:
    // 2.1s -> 'hold' (crossfade to real logo, trigger aura, shockwave, scan beam)
    const holdTimer = setTimeout(() => {
      setPhase('hold')
    }, 2100)

    // 3.2s -> 'exit' (logo fades, shutters slide away)
    const exitTimer = setTimeout(() => {
      setPhase('exit')
    }, 3200)

    // 3.55s -> onReveal()
    const revealTimer = setTimeout(() => {
      onReveal?.()
    }, 3550)

    // 4.6s -> onDone()
    const doneTimer = setTimeout(() => {
      doneRef.current = true
      try {
        sessionStorage.setItem('cw_loaded', '1')
      } catch (e) {}
      onDone?.()
    }, 4600)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(revealTimer)
      clearTimeout(doneTimer)
    }
  }, [logoDim])

  // Generate 7 x 4 (28) broken piece tiles with random offsets
  const tiles = useMemo(() => {
    if (!logoDim) return []
    const tileW = logoDim.width / 7
    const tileH = logoDim.height / 4
    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1000
    const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800

    return Array.from({ length: 28 }).map((_, i) => {
      const col = i % 7
      const row = Math.floor(i / 7)
      return {
        id: i,
        col,
        row,
        tileW,
        tileH,
        // Start offset up to +-70% of viewport
        startX: (Math.random() - 0.5) * 1.4 * viewportW,
        startY: (Math.random() - 0.5) * 1.4 * viewportH,
        startRotate: (Math.random() - 0.5) * 440, // +-220 deg
        startScale: 0.3 + Math.random() * 1.5, // 0.3 - 1.8
        delay: Math.random() * 0.85,
      }
    })
  }, [logoDim])

  if (!logoDim) return null

  const isHold = phase === 'hold'
  const isExit = phase === 'exit'

  return (
    <div
      role="status"
      aria-label="Loading Codways Technologies"
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-auto select-none"
    >
      {/* Top Shutter Half */}
      <motion.div
        initial={false}
        animate={isExit ? { y: '-101%' } : { y: '0%' }}
        transition={{
          duration: 0.85,
          delay: 0.35,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#f6f4ef] z-10"
      >
        {/* Tech Grid Background (Light Faint Green 48px Lines) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundSize: '48px 48px',
            backgroundImage:
              'linear-gradient(to right, rgba(46, 125, 50, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 125, 50, 0.09) 1px, transparent 1px)',
            maskImage: 'radial-gradient(circle at 50% 100%, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 100%, black 30%, transparent 85%)',
          }}
        />
      </motion.div>

      {/* Bottom Shutter Half */}
      <motion.div
        initial={false}
        animate={isExit ? { y: '101%' } : { y: '0%' }}
        transition={{
          duration: 0.85,
          delay: 0.35,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f6f4ef] z-10"
      >
        {/* Tech Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundSize: '48px 48px',
            backgroundImage:
              'linear-gradient(to right, rgba(46, 125, 50, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 125, 50, 0.09) 1px, transparent 1px)',
            maskImage: 'radial-gradient(circle at 50% 0%, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black 30%, transparent 85%)',
          }}
        />
      </motion.div>

      {/* Center Stage (Logo & FX) */}
      <motion.div
        animate={
          isExit
            ? { opacity: 0, scale: 1.12, transition: { duration: 0.45, ease: 'easeOut' } }
            : { opacity: 1, scale: 1 }
        }
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <div
          className="relative flex items-center justify-center"
          style={{ width: logoDim.width, height: logoDim.height }}
        >
          {/* FX a) Pulsing Green Radial Aura Behind Logo */}
          {isHold && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.4, 0.8, 0.5],
                scale: [0.95, 1.25, 1.05],
              }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              className="absolute -inset-16 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(76, 175, 80, 0.38) 0%, rgba(38, 198, 218, 0.2) 45%, transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
          )}

          {/* FX b) Expanding Circular Shockwave Ring */}
          {isHold && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute w-44 h-44 rounded-full border-2 border-[#4caf50] pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(76, 175, 80, 0.6)',
              }}
            />
          )}

          {/* 7 x 4 Grid of Broken Pieces (Visible during merging phase) */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHold ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {tiles.map((t) => (
              <motion.div
                key={t.id}
                initial={{
                  x: t.startX,
                  y: t.startY,
                  rotate: t.startRotate,
                  scale: t.startScale,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 62,
                  damping: 13,
                  delay: t.delay,
                }}
                style={{
                  position: 'absolute',
                  width: t.tileW,
                  height: t.tileH,
                  left: t.col * t.tileW,
                  top: t.row * t.tileH,
                  backgroundImage: 'url(/assets/logo.png)',
                  backgroundSize: `${logoDim.width}px ${logoDim.height}px`,
                  backgroundPosition: `-${t.col * t.tileW}px -${t.row * t.tileH}px`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ))}
          </div>

          {/* Real Touched Logo Image (Crossfaded during Hold & Exit phases) */}
          <motion.img
            src="/assets/logo.png"
            onError={(e) => {
              e.currentTarget.src = '/logo.png'
            }}
            alt="Codways Technologies"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHold || isExit ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-contain relative z-10"
          />

          {/* FX c) Vertical Scan Beam Sweeping Left to Right Across Logo */}
          {isHold && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
              <motion.div
                initial={{ x: -10 }}
                animate={{ x: logoDim.width + 10 }}
                transition={{ duration: 0.95, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-[3px]"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, #4caf50 30%, #26c6da 70%, transparent)',
                  boxShadow:
                    '0 0 14px rgba(76, 175, 80, 0.9), 0 0 28px rgba(38, 198, 218, 0.6)',
                }}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Bottom Progress Bar (3px green->cyan gradient with glow) */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-black/5 z-30">
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #4caf50, #26c6da)',
            boxShadow: '0 0 10px rgba(76, 175, 80, 0.8), 0 0 18px rgba(38, 198, 218, 0.5)',
          }}
        />
      </div>
    </div>
  )
}
