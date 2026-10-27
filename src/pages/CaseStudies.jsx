import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { PageHero } from '../components/sections.jsx'
import Reveal from '../components/Reveal.jsx'
import { caseStudiesData } from '../data/content.js'

const filters = [
  'All',
  'Student Success',
  'Startup Success',
  'Tech Success',
  'Marketing Success',
]

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? caseStudiesData
      : caseStudiesData.filter(c => c.category === activeFilter)

  return (
    <>
      <PageHero
        title="Success Stories & Case Studies"
        sub="Real results from real clients across our diverse product portfolio"
      />

      <section className="pb-24 px-4 sm:px-6 lg:px-8 bg-bg">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs matching Screenshot 5 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {filters.map(f => {
              const active = activeFilter === f
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    active
                      ? 'bg-accent text-white scale-105'
                      : 'bg-surface border border-line text-fg hover:border-accent hover:text-accent'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>

          {/* 2x2 Grid of Case Study Cards */}
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-3xl border border-line bg-surface overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="h-56 w-full overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-7 sm:p-8">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map(t => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs font-bold bg-[#e8f5e9] dark:bg-[#1e2b20] text-accent"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-2.5 text-heading leading-tight">
                        {item.title}
                      </h3>

                      {/* Client info */}
                      <div className="text-xs sm:text-sm font-bold text-accent mb-3">
                        {item.client}
                      </div>

                      {/* Problem Description */}
                      <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-normal">
                        {item.desc}
                      </p>

                      {/* Key Results */}
                      <div className="space-y-2 mb-6 pt-2 border-t border-line/60">
                        <div className="text-xs font-bold uppercase tracking-wider text-heading mb-2">
                          Key Results:
                        </div>
                        {item.results.map(r => (
                          <div
                            key={r}
                            className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-fg"
                          >
                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Read Full Case Study Button */}
                  <div className="px-7 sm:px-8 pb-7">
                    <button className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#e8f5e9] dark:bg-[#253328] text-accent hover:bg-accent hover:text-white transition-all text-center flex items-center justify-center gap-1.5">
                      <span>Read Full Case Study</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
