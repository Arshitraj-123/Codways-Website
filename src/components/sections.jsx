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

import HeroHud from './fx/HeroHud.jsx'
import DecryptText from './fx/DecryptText.jsx'
import { useSiteReady } from './fx/ReadyContext.jsx'
import CountUp from './fx/CountUp.jsx'
import Magnetic from './fx/Magnetic.jsx'

export function Hero() {
  const ready = useSiteReady()
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()

  const videoY = useTransform(scrollY, [0, 700], [0, 70])

  return (
    <section className="relative w-full overflow-hidden bg-bg">
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 'calc(100vh - 88px)',
          minHeight: '600px',
        }}
      >
        {/* Background video */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            y: prefersReduced ? 0 : videoY,
            scale: 1.04,
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/intro-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              backgroundColor: '#000000',
              opacity: 1,
            }}
          />
        </motion.div>

        {/* Dark cinematic overlay matching the reference */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.24) 45%, rgba(0,0,0,0.32) 78%, rgba(0,0,0,0.08) 100%)',
          }}
        />

        {/* Centered translucent glass panel */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={
              ready
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
            className="w-full max-w-[850px] mx-auto text-center"
            style={{
              background: 'rgba(8, 12, 13, 0.57)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(9px)',
              border: '1px solid rgba(255,255,255,0.055)',
              borderRadius: '25px',
              paddingTop: '30px',
              paddingBottom: '30px',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              boxShadow: '0 12px 45px rgba(0,0,0,0.10)',
            }}
          >
            <h1
              className="text-center font-extrabold text-white"
              style={{
                margin: 0,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                fontFamily: 'inherit',
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={
                  ready
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{ delay: 0.12, duration: 0.55 }}
                className="block font-extrabold text-white"
                style={{
                  fontSize: 'clamp(38px, 5.1vw, 82px)',
                  lineHeight: 1.12,
                  textShadow: '0 3px 10px rgba(0,0,0,0.25)',
                }}
              >
                An innovative
              </motion.span>

              <motion.span
                initial={{ opacity: 0, scale: 0.97 }}
                animate={
                  ready
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.97 }
                }
                transition={{ delay: 0.24, duration: 0.55 }}
                className="block font-black text-[#287f32]"
                style={{
                  fontSize: 'clamp(48px, 6.2vw, 100px)',
                  lineHeight: 1.15,
                  marginTop: '8px',
                  marginBottom: '8px',
                  letterSpacing: '-0.025em',
                  textShadow: '0 3px 12px rgba(0,0,0,0.12)',
                }}
              >
                Platform
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={
                  ready
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{ delay: 0.36, duration: 0.55 }}
                className="block font-extrabold text-white"
                style={{
                  fontSize: 'clamp(32px, 4.9vw, 80px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.035em',
                  textShadow: '0 3px 10px rgba(0,0,0,0.25)',
                }}
              >
                for Your Next Chapter
              </motion.span>
            </h1>
          </motion.div>
        </div>

        {/* Soft white fade at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: '110px',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.20) 45%, var(--bg) 100%)',
          }}
        >
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <ChevronDown className="scroll-cue text-accent h-7 w-7" />
          </div>
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
