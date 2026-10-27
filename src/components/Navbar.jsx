import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import Logo from './Logo.jsx'
import ProductIcon from './ProductIcon.jsx'
import SmartLink from './SmartLink.jsx'
import Magnetic from './fx/Magnetic.jsx'
import { nav } from '../data/content.js'
import { productsData } from '../data/products.js'

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [mobileOpenCat, setMobileOpenCat] = useState('edtech')
  const loc = useLocation()
  const leaveTimerRef = useRef(null)
  const prefersReduced = useReducedMotion()

  // Reset dropdowns on route change
  useEffect(() => {
    setOpen(false)
    setDd(false)
    setMobileProductsOpen(false)
  }, [loc.pathname])

  // Scroll detection for navbar background elevation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close desktop dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDd(false)
      }
    }
    if (dd) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dd])

  // Clean up timeout
  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setDd(true)
  }

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setDd(false)
    }, 120)
  }

  const getLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 hover:text-accent rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
      isActive ? 'text-accent font-bold' : 'text-fg'
    }`

  return (
    <motion.nav
      initial={prefersReduced ? false : { y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 border-b border-line/80 backdrop-blur-md transition-all duration-200 ${
        scrolled ? 'shadow-sm shadow-black/5' : ''
      }`}
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 94%, transparent)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-w-0">
          <Logo />

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {nav.map(n =>
              n.dropdown ? (
                <div
                  key={n.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={n.to}
                    end
                    aria-haspopup="true"
                    aria-expanded={dd}
                    onKeyDown={e => {
                      if (e.key === 'ArrowDown' || e.key === 'Enter') {
                        setDd(true)
                      }
                    }}
                    className={({ isActive }) =>
                      `${getLinkClass({ isActive })} flex items-center gap-1 group`
                    }
                  >
                    <span>{n.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ease-out ${
                        dd ? 'rotate-180 text-accent' : 'text-muted group-hover:text-accent'
                      }`}
                      aria-hidden="true"
                    />
                  </NavLink>

                  {/* Mega Dropdown Menu 2x2 Panel */}
                  <AnimatePresence>
                    {dd && (
                      <motion.div
                        initial={
                          prefersReduced
                            ? { opacity: 0 }
                            : { opacity: 0, y: 8, scale: 0.99 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                          prefersReduced
                            ? { opacity: 0 }
                            : { opacity: 0, y: 8, scale: 0.99 }
                        }
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[860px] max-w-[95vw] pointer-events-auto"
                      >
                        <div
                          role="region"
                          aria-label="Products Mega Menu"
                          className="rounded-3xl border border-line bg-surface shadow-2xl p-6 sm:p-8 text-fg"
                        >
                          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                            {productsData.map(group => {
                              const isComingSoon = Boolean(
                                group.comingSoon || group.status === 'Coming Soon'
                              )

                              return (
                                <div
                                  key={group.slug}
                                  className={`flex flex-col ${
                                    isComingSoon ? 'opacity-60' : ''
                                  }`}
                                >
                                  {/* Category Header */}
                                  {isComingSoon ? (
                                    <div
                                      aria-disabled="true"
                                      className="flex items-start gap-3.5 mb-3.5 cursor-not-allowed select-none"
                                    >
                                      <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                          backgroundColor: `${group.accent}18`,
                                          color: group.accent,
                                        }}
                                      >
                                        <ProductIcon name={group.icon} size={20} />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h4 className="text-base font-bold text-heading leading-tight">
                                            {group.title}
                                          </h4>
                                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                            Coming Soon
                                          </span>
                                        </div>
                                        <p className="text-xs text-muted mt-0.5 leading-snug font-normal">
                                          {group.tagline}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <Link
                                      to={`/products/${group.slug}`}
                                      onClick={() => setDd(false)}
                                      className="flex items-start gap-3.5 mb-3.5 group/cat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                                    >
                                      <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/cat:scale-105"
                                        style={{
                                          backgroundColor: `${group.accent}18`,
                                          color: group.accent,
                                        }}
                                      >
                                        <ProductIcon name={group.icon} size={20} />
                                      </div>
                                      <div>
                                        <h4 className="text-base font-bold text-heading group-hover/cat:text-accent transition-colors leading-tight">
                                          {group.title}
                                        </h4>
                                        <p className="text-xs text-muted mt-0.5 leading-snug font-normal">
                                          {group.tagline}
                                        </p>
                                      </div>
                                    </Link>
                                  )}

                                  {/* Product Rows */}
                                  <div className="space-y-1.5 flex-1 pl-1">
                                    {group.products.map(item => {
                                      if (isComingSoon) {
                                        return (
                                          <div
                                            key={item.name}
                                            aria-disabled="true"
                                            className="flex items-start gap-3 p-2.5 rounded-xl cursor-not-allowed select-none"
                                          >
                                            <div
                                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                              style={{
                                                backgroundColor: `${group.accent}18`,
                                                color: group.accent,
                                              }}
                                            >
                                              <ProductIcon name={item.icon} size={16} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="text-sm font-bold text-heading leading-tight">
                                                {item.name}
                                              </div>
                                              <div className="text-xs text-muted mt-0.5 leading-snug font-normal">
                                                {item.desc}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      }

                                      return (
                                        <SmartLink
                                          key={item.name}
                                          href={item.href}
                                          external={item.external}
                                          showExternalIcon={item.external}
                                          onClick={() => setDd(false)}
                                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8f5e9]/75 dark:hover:bg-[#253328]/80 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        >
                                          <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110"
                                            style={{
                                              backgroundColor: `${group.accent}18`,
                                              color: group.accent,
                                            }}
                                          >
                                            <ProductIcon name={item.icon} size={16} />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="text-sm font-bold text-heading group-hover:text-accent transition-colors leading-tight flex items-center gap-1">
                                              <span>{item.name}</span>
                                            </div>
                                            <div className="text-xs text-muted mt-0.5 leading-snug font-normal">
                                              {item.desc}
                                            </div>
                                          </div>
                                        </SmartLink>
                                      )
                                    })}
                                  </div>

                                  {/* Coloured "View all <Category> →" link */}
                                  <div className="mt-3 pl-3 pt-2">
                                    {isComingSoon ? (
                                      <span
                                        aria-disabled="true"
                                        className="text-xs font-bold text-amber-600 dark:text-amber-400 cursor-not-allowed select-none"
                                      >
                                        Coming Soon
                                      </span>
                                    ) : (
                                      <SmartLink
                                        href={group.viewAll.href}
                                        external={group.viewAll.external}
                                        showExternalIcon={group.viewAll.external}
                                        onClick={() => setDd(false)}
                                        className="text-xs font-bold hover:underline inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                                        style={{ color: group.accent }}
                                      >
                                        <span>{group.viewAll.label}</span>
                                      </SmartLink>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={n.label} to={n.to} end className={getLinkClass}>
                  {n.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right Actions: Theme toggle & Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-fg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Magnetic strength={0.28}>
              <Link
                to="/contact"
                className="px-4 py-2 text-sm font-bold rounded-lg bg-accent hover:bg-accent-hover text-white transition shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent block"
              >
                Contact Us
              </Link>
            </Magnetic>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="p-2 rounded-lg text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReduced ? false : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-line bg-surface max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col space-y-2">
              {nav.map(n =>
                n.dropdown ? (
                  <div key={n.label} className="border-b border-line/60 pb-2">
                    <button
                      onClick={() => setMobileProductsOpen(o => !o)}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-heading hover:text-accent transition-colors"
                      aria-expanded={mobileProductsOpen}
                    >
                      <span className="flex items-center gap-2">
                        {n.label}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                          Explore
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileProductsOpen ? 'rotate-180 text-accent' : 'text-muted'
                        }`}
                      />
                    </button>

                    {/* Mobile Products Accordion: One Category Open at a Time */}
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={prefersReduced ? false : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-2 pt-2 space-y-2"
                        >
                          {productsData.map(group => {
                            const isExpanded = mobileOpenCat === group.slug
                            const isComingSoon = Boolean(
                              group.comingSoon || group.status === 'Coming Soon'
                            )

                            return (
                              <div
                                key={group.slug}
                                className="rounded-xl border border-line/70 bg-bg/50 p-2.5 overflow-hidden"
                              >
                                <button
                                  onClick={() =>
                                    setMobileOpenCat(isExpanded ? null : group.slug)
                                  }
                                  className="w-full flex items-center justify-between text-left"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                      style={{
                                        backgroundColor: `${group.accent}18`,
                                        color: group.accent,
                                      }}
                                    >
                                      <ProductIcon name={group.icon} size={15} />
                                    </div>
                                    <span className="text-xs font-bold text-heading">
                                      {group.title}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    {isComingSoon && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                        Soon
                                      </span>
                                    )}
                                    <ChevronRight
                                      size={14}
                                      className={`text-muted transition-transform duration-200 ${
                                        isExpanded ? 'rotate-90 text-accent' : ''
                                      }`}
                                    />
                                  </div>
                                </button>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={
                                        prefersReduced
                                          ? false
                                          : { height: 0, opacity: 0 }
                                      }
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={
                                        prefersReduced
                                          ? false
                                          : { height: 0, opacity: 0 }
                                      }
                                      transition={{ duration: 0.18 }}
                                      className="pt-2 pl-1 space-y-2"
                                    >
                                      <p className="text-[11px] text-muted leading-tight font-normal">
                                        {group.tagline}
                                      </p>
                                      <div className="space-y-1.5 pt-1">
                                        {group.products.map(item =>
                                          isComingSoon ? (
                                            <div
                                              key={item.name}
                                              className="flex items-center gap-2 text-xs py-1 text-muted/60"
                                            >
                                              <span className="w-1.5 h-1.5 rounded-full bg-muted/40" />
                                              <span>{item.name}</span>
                                            </div>
                                          ) : (
                                            <SmartLink
                                              key={item.name}
                                              href={item.href}
                                              external={item.external}
                                              showExternalIcon={item.external}
                                              onClick={() => setOpen(false)}
                                              className="flex items-center justify-between text-xs py-1 text-fg hover:text-accent font-medium"
                                            >
                                              <span className="flex items-center gap-2">
                                                <span
                                                  className="w-1.5 h-1.5 rounded-full"
                                                  style={{
                                                    backgroundColor: group.accent,
                                                  }}
                                                />
                                                {item.name}
                                              </span>
                                            </SmartLink>
                                          )
                                        )}
                                      </div>

                                      <div className="pt-2 border-t border-line/40">
                                        {isComingSoon ? (
                                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                                            Coming Soon
                                          </span>
                                        ) : (
                                          <SmartLink
                                            href={group.viewAll.href}
                                            external={group.viewAll.external}
                                            showExternalIcon={group.viewAll.external}
                                            onClick={() => setOpen(false)}
                                            className="text-[11px] font-bold hover:underline inline-flex items-center gap-1"
                                            style={{ color: group.accent }}
                                          >
                                            <span>{group.viewAll.label}</span>
                                          </SmartLink>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                          <div className="pt-1">
                            <Link
                              to="/products"
                              onClick={() => setOpen(false)}
                              className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-1"
                            >
                              Browse all categories & products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={n.label}
                    to={n.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `py-2 text-sm font-semibold transition-colors ${
                        isActive ? 'text-accent font-bold' : 'text-fg'
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                )
              )}

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 text-center py-2.5 rounded-lg bg-accent text-white text-sm font-bold shadow-sm hover:bg-accent-hover transition"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
