import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductIcon from './ProductIcon.jsx'
import SmartLink from './SmartLink.jsx'

export default function ProductCard3D({ product, accent = '#15803d', index = 0 }) {
  const cardRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D tilt values (gentle angles: 7 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  // Cursor-following spotlight radial gradient (computed smoothly via Framer Motion)
  const spotlightBg = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, ${accent}22, transparent 80%)`

  const isComingSoon = Boolean(product.disabled || product.status === 'Coming Soon')

  const handleMouseMove = e => {
    if (prefersReduced || isComingSoon || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    x.set(clientX / width - 0.5)
    y.set(clientY / height - 0.5)
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: prefersReduced ? 0 : index * 0.08,
        ease: 'easeOut',
      }}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative flex flex-col justify-between rounded-3xl border border-line bg-surface p-8 shadow-sm transition-shadow duration-300 ${
        isComingSoon
          ? 'opacity-60 cursor-not-allowed select-none'
          : 'hover:shadow-2xl hover:border-transparent'
      }`}
      aria-disabled={isComingSoon ? 'true' : undefined}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {!isComingSoon && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
          aria-hidden="true"
        />
      )}

      {/* Top Border Glow Accent */}
      <div
        className="absolute inset-x-8 top-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content with 3D Depth */}
      <div style={{ transform: prefersReduced ? 'none' : 'translateZ(20px)' }} className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${accent}18`,
              color: accent,
            }}
          >
            <ProductIcon name={product.icon} size={26} />
          </div>

          {isComingSoon && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Sparkles size={12} />
              Coming Soon
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 text-heading tracking-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-muted leading-relaxed font-normal mb-8 flex-1">
          {product.desc}
        </p>
      </div>

      {/* Card Footer Action */}
      <div
        style={{ transform: prefersReduced ? 'none' : 'translateZ(25px)' }}
        className="pt-4 border-t border-line/60 flex items-center justify-between"
      >
        {isComingSoon ? (
          <span className="text-xs font-semibold text-muted/80 cursor-not-allowed">
            Item in development
          </span>
        ) : (
          <SmartLink
            href={product.href}
            external={product.external}
            showExternalIcon={product.external}
            className="inline-flex items-center gap-1.5 font-bold text-sm transition-all hover:gap-2 group/action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            style={{ color: accent }}
          >
            <span>Explore {product.name}</span>
            {!product.external && (
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover/action:translate-x-1"
                aria-hidden="true"
              />
            )}
          </SmartLink>
        )}
      </div>
    </motion.div>
  )
}
