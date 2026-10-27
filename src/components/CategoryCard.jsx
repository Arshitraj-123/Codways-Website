import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductIcon from './ProductIcon.jsx'
import SmartLink from './SmartLink.jsx'

export default function CategoryCard({ category, index = 0, compact = false }) {
  const prefersReduced = useReducedMotion()
  const isComingSoon = Boolean(category.comingSoon || category.status === 'Coming Soon')

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: prefersReduced ? 0 : index * 0.08,
        ease: 'easeOut',
      }}
      whileHover={prefersReduced ? {} : { y: -8 }}
      data-spot
      className={`group relative flex flex-col rounded-3xl border border-line bg-surface p-7 transition-all duration-300 ${
        isComingSoon ? 'opacity-70' : 'hover:shadow-2xl'
      }`}
      style={{
        boxShadow: isComingSoon
          ? 'none'
          : undefined,
      }}
    >
      {/* Accent glow line on top border on hover */}
      <div
        className="absolute inset-x-8 top-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Top Header: Icon & Coming soon badge if applicable */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            backgroundColor: `${category.accent}18`,
            color: category.accent,
          }}
        >
          <ProductIcon name={category.icon} size={28} />
        </div>

        {isComingSoon && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles size={12} />
            Coming Soon
          </span>
        )}
      </div>

      {/* Title & Tagline */}
      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-heading tracking-tight">
        {category.title}
      </h3>
      <p className="text-sm text-muted mb-6 leading-relaxed font-normal min-h-[40px]">
        {category.tagline}
      </p>

      {/* Stack of product names */}
      <div className="space-y-2.5 mb-8 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted/80 pb-1 border-b border-line/60">
          Featured Solutions
        </div>
        <ul className="space-y-2.5 pt-1">
          {category.products.map(p => (
            <li
              key={p.name}
              className={`flex items-start gap-2.5 text-sm ${
                isComingSoon ? 'opacity-60 cursor-not-allowed' : 'text-fg'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 mt-1.5 transition-transform duration-200 group-hover:scale-125"
                style={{ backgroundColor: category.accent }}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                {isComingSoon ? (
                  <span className="font-medium text-fg/80">{p.name}</span>
                ) : (
                  <SmartLink
                    href={p.href}
                    external={p.external}
                    showExternalIcon={p.external}
                    className="font-medium text-fg hover:text-accent transition-colors flex items-center justify-between gap-1 group/item text-left"
                  >
                    <span className="truncate">{p.name}</span>
                  </SmartLink>
                )}
                {!compact && (
                  <p className="text-xs text-muted leading-snug line-clamp-1 mt-0.5 font-normal">
                    {p.desc}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      {isComingSoon ? (
        <button
          disabled
          aria-disabled="true"
          className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-neutral-100 dark:bg-neutral-800/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed select-none text-center border border-line"
        >
          Coming Soon
        </button>
      ) : (
        <SmartLink
          href={`/products/${category.slug}`}
          external={false}
          className="group/btn w-full py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-sm hover:shadow hover:opacity-95"
          style={{
            backgroundColor: `${category.accent}18`,
            color: category.accent,
          }}
        >
          <span>Explore {category.title.replace(' Products', '')}</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover/btn:translate-x-1.5"
            aria-hidden="true"
          />
        </SmartLink>
      )}
    </motion.div>
  )
}
