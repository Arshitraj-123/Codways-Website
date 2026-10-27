import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductCard3D from '../components/ProductCard3D.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { productsData } from '../data/products.js'

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'EdTech', value: 'edtech' },
  { label: 'Technology & AI', value: 'technology-ai' },
  { label: 'Legal', value: 'legal-entrepreneurial' },
  { label: 'Marketing', value: 'marketing' },
]

export default function ProductsLanding() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    document.title = 'Our Products | Codways Technologies'
  }, [])

  const filteredCategories =
    selectedFilter === 'all'
      ? productsData
      : productsData.filter(cat => cat.slug === selectedFilter)

  const selectedCategory =
    selectedFilter !== 'all'
      ? productsData.find(cat => cat.slug === selectedFilter)
      : null

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Animated Page Header with Floating Gradient Shapes */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Ambient Floating Shapes in Category Accent Colors */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <motion.div
            animate={
              prefersReduced
                ? {}
                : {
                    x: [0, 25, -20, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.08, 0.95, 1],
                  }
            }
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 left-[15%] w-72 h-72 rounded-full blur-3xl opacity-20 dark:opacity-25"
            style={{ backgroundColor: '#3b82f6' }}
          />
          <motion.div
            animate={
              prefersReduced
                ? {}
                : {
                    x: [0, -30, 20, 0],
                    y: [0, 25, -25, 0],
                    scale: [1, 0.94, 1.06, 1],
                  }
            }
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 right-[15%] w-80 h-80 rounded-full blur-3xl opacity-20 dark:opacity-25"
            style={{ backgroundColor: '#8b5cf6' }}
          />
          <motion.div
            animate={
              prefersReduced
                ? {}
                : {
                    x: [0, 20, -15, 0],
                    y: [0, 20, -20, 0],
                  }
            }
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-10 left-[35%] w-72 h-72 rounded-full blur-3xl opacity-15 dark:opacity-20"
            style={{ backgroundColor: '#10b981' }}
          />
          <motion.div
            animate={
              prefersReduced
                ? {}
                : {
                    x: [0, -20, 15, 0],
                    y: [0, -20, 20, 0],
                  }
            }
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-5 right-[30%] w-64 h-64 rounded-full blur-3xl opacity-15 dark:opacity-20"
            style={{ backgroundColor: '#f59e0b' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto z-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-accent/10 text-accent border border-accent/20 mb-6"
          >
            <Sparkles size={14} />
            <span>Comprehensive Solutions Ecosystem</span>
          </motion.div>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading tracking-tight"
          >
            Our Product Categories
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Comprehensive solutions across education, legal, technology, and marketing domains
          </motion.p>
        </div>
      </section>

      {/* Sticky Category Filter Tabs Bar */}
      <section className="sticky top-16 z-30 bg-bg/90 backdrop-blur-md border-y border-line py-3 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3">
          {filterTabs.map(tab => {
            const isActive = selectedFilter === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`relative px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive ? 'text-white' : 'text-muted hover:text-heading'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="categoryActiveIndicator"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Filtered Cards Grid */}
          <motion.div
            layout
            className={`grid gap-7 ${
              selectedFilter === 'all'
                ? 'md:grid-cols-2 lg:grid-cols-4'
                : 'max-w-xl mx-auto'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((cat, idx) => (
                <motion.div
                  key={cat.slug}
                  layout
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <CategoryCard category={cat} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* When a specific category is filtered, also show its detailed 3D product cards */}
          {selectedCategory && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-16 pt-16 border-t border-line"
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-heading">
                  Products in {selectedCategory.title}
                </h3>
                <p className="text-muted text-sm sm:text-base mt-2">
                  {selectedCategory.tagline}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedCategory.products.map((product, idx) => (
                  <ProductCard3D
                    key={product.name}
                    product={product}
                    accent={selectedCategory.accent}
                    index={idx}
                  />
                ))}
              </div>

              <div className="mt-10 text-center">
                <SmartLink
                  href={selectedCategory.heroCta.href}
                  external={selectedCategory.heroCta.external}
                  disabled={selectedCategory.heroCta.disabled}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold bg-accent hover:bg-accent-hover text-white shadow transition group"
                >
                  <span>{selectedCategory.heroCta.label}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </SmartLink>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div
            className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#10b981' }}
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-heading mb-4 tracking-tight">
            Need a tailored solution for your organization?
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            From university corporate partnerships to enterprise AI software engineering and legal compliance, our expert consultants are here to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SmartLink
              href="/contact"
              external={false}
              className="px-8 py-3.5 rounded-xl font-bold bg-accent hover:bg-accent-hover text-white shadow-md transition"
            >
              Talk to Our Team
            </SmartLink>
            <SmartLink
              href="/case-studies"
              external={false}
              className="px-8 py-3.5 rounded-xl font-bold border border-line hover:bg-bg text-heading transition"
            >
              Explore Success Stories
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  )
}
