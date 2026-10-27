import { motion } from 'framer-motion'
import {
  Eye,
  Target,
  Handshake,
  GraduationCap,
  Server,
  Brain,
  Scale,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'
import { PageHero } from '../components/sections.jsx'
import Heading from '../components/Heading.jsx'
import Reveal from '../components/Reveal.jsx'
import { aboutData } from '../data/content.js'

const partnerIconMap = {
  GraduationCap,
  Server,
  Brain,
  Scale,
  TrendingUp,
}

export default function About() {
  return (
    <>
      <PageHero title={aboutData.title} sub={aboutData.subtitle} />

      {/* Vision & Mission Section (Screenshot 3) */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {/* Our Vision */}
            <Reveal delay={0.05} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl p-8 sm:p-10 border border-line bg-surface shadow-sm"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] mb-6">
                  <Eye size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-heading">{aboutData.vision.title}</h3>
                <p className="text-base text-muted leading-relaxed font-normal">
                  {aboutData.vision.text}
                </p>
              </motion.div>
            </Reveal>

            {/* Our Mission */}
            <Reveal delay={0.12} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl p-8 sm:p-10 border border-line bg-surface shadow-sm"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] mb-6">
                  <Target size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-heading">{aboutData.mission.title}</h3>
                <p className="text-base text-muted leading-relaxed font-normal">
                  {aboutData.mission.text}
                </p>
              </motion.div>
            </Reveal>
          </div>

          {/* Leadership Team Section (Screenshot 3) */}
          <div className="mb-28">
            <Heading title={aboutData.leadershipTitle} sub={aboutData.leadershipSubtitle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {aboutData.leaders.map((leader, i) => (
                <Reveal key={leader.name} delay={i * 0.08} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="h-full rounded-3xl p-6 sm:p-7 border border-line bg-surface shadow-sm text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-5 border-2 border-line shadow-sm">
                      <img
                        src={leader.img}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-heading">{leader.name}</h4>
                    <p className="text-xs font-bold text-accent mb-4">{leader.role}</p>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                      {leader.bio}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Our Partners & Collaborations Section (Screenshot 2) */}
          <div>
            <div className="text-center mb-14">
              <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] mb-5 shadow-sm">
                <Handshake size={28} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight text-heading">
                {aboutData.partnersTitle}
              </h2>
              <p className="text-base sm:text-lg max-w-3xl mx-auto text-muted leading-relaxed font-normal">
                {aboutData.partnersSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-7 justify-center mb-8">
              {aboutData.partners.slice(0, 3).map((group, i) => {
                const Icon = partnerIconMap[group.icon] || GraduationCap
                return (
                  <Reveal key={group.title} delay={i * 0.08} className="h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="h-full rounded-3xl p-7 border border-line bg-surface shadow-sm text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] mb-5 shrink-0">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-base font-bold text-heading mb-5">{group.title}</h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-muted text-left w-full pl-4 font-normal">
                        {group.items.map(item => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-7">
              {aboutData.partners.slice(3).map((group, i) => {
                const Icon = partnerIconMap[group.icon] || Scale
                return (
                  <Reveal key={group.title} delay={(i + 3) * 0.08} className="h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="h-full rounded-3xl p-7 border border-line bg-surface shadow-sm text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] mb-5 shrink-0">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-base font-bold text-heading mb-5">{group.title}</h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-muted text-left w-full pl-4 font-normal">
                        {group.items.map(item => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
