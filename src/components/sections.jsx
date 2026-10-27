import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Globe,
  Users,
  Zap,
  Award,
  TrendingUp,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react'
import Reveal from './Reveal.jsx'
import Heading from './Heading.jsx'
import ContactForm from './ContactForm.jsx'
import { why, tailored, stories, contact } from '../data/content.js'

// FX components
import HeroHud from './fx/HeroHud.jsx'
import DecryptText from './fx/DecryptText.jsx'
import { useSiteReady } from './fx/ReadyContext.jsx'
import CountUp from './fx/CountUp.jsx'
import Magnetic from './fx/Magnetic.jsx'

export function Hero() {
  const ready = useSiteReady()
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 700], [0, 100])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-bg">
      <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
        {/* Background Video - Fully visible, vibrant and unobstructed */}
        <motion.div
          style={{
            y: prefersReduced ? 0 : videoY,
            scale: 1.08,
          }}
          className="w-full h-full overflow-hidden"
        >
          <video
            className="w-full h-full object-cover"
            src="/intro-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ backgroundColor: '#000000', opacity: 1 }}
          />
        </motion.div>

        {/* Soft cinematic vignette preserving full clarity in center while ensuring contrast for header and text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.12) 65%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* Viewfinder corner tech brackets */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <HeroHud />
        </div>

        {/* Hero Central Content - Floating cleanly over video without any blocking opaque card */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center px-4 max-w-4xl mx-auto pointer-events-auto"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/40 backdrop-blur-md border border-white/20 text-white/95 mb-6 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span>Next-Generation Tech Learning</span>
            </motion.div>

            {/* Main Headline with high-contrast text shadows */}
            <h1 className="font-extrabold leading-tight text-white tracking-tight text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white"
                style={{
                  textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)',
                }}
              >
                An innovative
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.92 }}
                animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="block my-2 sm:my-3 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#22c55e] glow-text"
                style={{
                  textShadow: '0 0 35px rgba(34,197,94,0.7), 0 4px 24px rgba(0,0,0,0.95)',
                }}
              >
                <DecryptText text="Platform" />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white"
                style={{
                  textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)',
                }}
              >
                for Your Next Chapter
              </motion.span>
            </h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed"
              style={{
                textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9)',
              }}
            >
              Master high-demand tech skills, build real-world products, and unlock your career potential.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/products"
                className="px-7 py-3.5 rounded-xl font-bold bg-[#15803d] hover:bg-[#166534] dark:bg-[#22c55e] dark:hover:bg-[#16a34a] text-white dark:text-[#0a1f0c] shadow-xl shadow-black/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-xl font-bold bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/25 shadow-xl shadow-black/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom smooth fade to page bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none flex items-end justify-center pb-4"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)',
          }}
        >
          <ChevronDown className="scroll-cue text-accent h-7 w-7" />
        </div>
      </div>
    </section>
  )
}

const whyIcons = [Globe, Users, Zap, Award]

export function Why({ id = 'about' }) {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Heading
          title="Why Choose Codways?"
          sub="We're not just another online course platform. We're your career transformation partner."
        />

        {/* 4 Cards Grid with data-spot for Card Spotlight */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mb-24">
          {why.map((w, i) => {
            const Icon = whyIcons[i]
            return (
              <Reveal key={w.title} delay={i * 0.08} className="h-full">
                <motion.div
                  data-spot
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl p-7 border border-line bg-surface shadow-sm text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] floaty shrink-0"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-heading">{w.title}</h3>
                  <p className="text-sm text-muted leading-relaxed font-normal">{w.text}</p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        {/* Solutions Built Around You */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal y={0}>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-6 text-heading tracking-tight">
              {tailored.title}
            </h3>
            <p className="text-base sm:text-lg mb-8 text-muted leading-relaxed font-normal">
              {tailored.text}
            </p>
            <ul className="space-y-4">
              {tailored.points.map(p => (
                <li key={p} className="flex items-start gap-3 text-fg text-sm sm:text-base font-medium">
                  <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-line">
              <img
                src="/assets/pexels-photo-3184291.jpg"
                alt="Team collaboration at Codways"
                className="w-full h-auto object-cover max-h-[460px]"
              />
            </div>
            {/* 85% placement floating pill badge with CountUp */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="absolute -bottom-6 -left-4 sm:-left-6 rounded-2xl p-4 sm:p-5 bg-surface shadow-2xl border border-line flex items-center gap-3.5 z-20"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-accent">
                <CountUp text="85%" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-fg leading-tight">
                of our students<br />get placed within<br />3 months
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Stories({ id = 'success', showButton = true }) {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Heading
          title="Success Stories"
          sub="Real stories from real people who transformed their careers with Codways Technologies"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1} className="h-full">
              <motion.div
                data-spot
                whileHover={{ y: -6 }}
                className="h-full rounded-3xl p-7 border border-line bg-surface shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center mb-5">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-14 h-14 rounded-full mr-4 object-cover border border-line"
                    />
                    <div>
                      <h4 className="font-bold text-base text-heading">{s.name}</h4>
                      <p className="text-xs font-bold text-accent">{s.role}</p>
                      <p className="text-xs text-muted font-medium">{s.prev}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)]">
                      <TrendingUp size={13} className="shrink-0" />
                      <CountUp text={s.stat} />
                    </span>
                    <span className="text-xs font-semibold text-fg">{s.program}</span>
                  </div>

                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 text-[#f59e0b] mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={15} fill="#f59e0b" strokeWidth={0} />
                    ))}
                  </div>

                  <p className="text-sm text-muted leading-relaxed italic font-normal">
                    {s.quote}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {showButton && (
          <Reveal className="text-center mt-12">
            <Magnetic strength={0.28}>
              <Link
                to="/case-studies"
                className="inline-block px-8 py-3 rounded-lg font-bold bg-accent hover:bg-accent-hover text-white shadow-sm hover:scale-[1.02] transition"
              >
                Read More Success Stories
              </Link>
            </Magnetic>
          </Reveal>
        )}
      </div>
    </section>
  )
}

const contactSocials = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Youtube, href: '#' },
]

export function ContactSection({ id = 'contact' }) {
  const rows = [
    [Mail, 'Email Us', contact.email],
    [Phone, 'Call Us', contact.phone],
    [MapPin, 'Visit Us', contact.address],
  ]

  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-bg">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-heading tracking-tight">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base sm:text-lg mb-8 text-muted leading-relaxed font-normal">
            Join thousands of professionals who've accelerated their careers with Codways Technologies. Book a free career counseling session to find the right program for you.
          </p>

          <div className="space-y-6 mb-8">
            {rows.map(([I, t, v]) => (
              <div key={t} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] shrink-0 mt-1">
                  <I size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-heading text-sm">{t}</h4>
                  <p className="text-sm text-muted leading-relaxed font-normal">{v}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Icons row */}
          <div className="flex items-center space-x-2.5 pt-2">
            {contactSocials.map((s, i) => {
              const Icon = s.icon
              return (
                <a
                  key={i}
                  href={s.href}
                  aria-label="Social Link"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)] hover:bg-accent hover:text-white transition-all"
                >
                  <Icon size={17} />
                </a>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-3xl p-8 sm:p-10 border border-line bg-surface shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-heading">Book Free Career Counseling</h3>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function PageHero({ title, sub }) {
  return (
    <section className="pt-32 pb-14 px-4 bg-bg text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #15803d, transparent)',
          backgroundSize: '50px 50px',
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-4xl sm:text-5xl font-extrabold text-heading tracking-tight"
      >
        {title}
      </motion.h1>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="relative mt-4 text-base sm:text-lg max-w-3xl mx-auto text-muted leading-relaxed font-normal"
        >
          {sub}
        </motion.p>
      )}
    </section>
  )
}
