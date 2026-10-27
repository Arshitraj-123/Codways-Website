import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, FileText, Video, User, Calendar } from 'lucide-react'
import { PageHero } from '../components/sections.jsx'
import { resourcesData } from '../data/content.js'

const tabs = [
  { label: 'Blogs & Articles', icon: BookOpen },
  { label: 'Whitepapers', icon: FileText },
  { label: 'Events & Webinars', icon: Video },
]

export default function Resources() {
  const [activeTab, setActiveTab] = useState('Blogs & Articles')

  return (
    <>
      <PageHero
        title="Resources & Insights"
        sub="Stay updated with the latest trends, insights, and knowledge from our experts"
      />

      <section className="pb-24 px-4 sm:px-6 lg:px-8 bg-bg">
        <div className="max-w-7xl mx-auto">
          {/* Tabs matching Screenshot 1 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {tabs.map(tab => {
              const Icon = tab.icon
              const active = activeTab === tab.label
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    active
                      ? 'bg-accent text-white scale-105'
                      : 'bg-surface border border-line text-fg hover:border-accent hover:text-accent'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {activeTab === 'Blogs & Articles' ? (
            /* 4 Blog Cards Grid matching Screenshot 1 */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resourcesData.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-line bg-surface overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 sm:p-7">
                      {/* Tag */}
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#e8f5e9] dark:bg-[#1e2b20] text-accent mb-3">
                        {item.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-3 text-heading leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Meta: Author & Date */}
                  <div className="px-6 sm:p-7 pt-0 pb-6 flex items-center justify-between text-xs text-muted font-medium border-t border-line/60 pt-4">
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-accent" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-accent" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-muted bg-surface rounded-3xl border border-line p-10 max-w-lg mx-auto">
              <p className="text-base font-medium">New {activeTab.toLowerCase()} will be published shortly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
