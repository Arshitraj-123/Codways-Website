import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Clock,
  Award
} from 'lucide-react'
import ProductIcon from '../components/ProductIcon.jsx'
import ProductCard3D from '../components/ProductCard3D.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { productsData, getCategoryBySlug } from '../data/products.js'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)
  const prefersReduced = useReducedMotion()

  // SEO document title
  useEffect(() => {
    if (category) {
      document.title = `${category.title} | Codways Technologies`
    }
  }, [category])

  // Unknown slug -> redirect to /products
  if (!category) {
    return <Navigate to="/products" replace />
  }

  const isMarketing = category.slug === 'marketing'
  const isLegal = category.slug === 'legal-entrepreneurial'
  const otherCategories = productsData.filter(c => c.slug !== category.slug)

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Category Hero Banner with Dynamic Accent Theme */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-line/60">
        {/* Dynamic Category Accent Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-20"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${category.accent}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb: Home / Products / <Category> */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs sm:text-sm text-muted font-medium mb-8"
          >
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-muted/60" aria-hidden="true" />
            <Link to="/products" className="hover:text-accent transition-colors">
              Products
            </Link>
            <ChevronRight size={14} className="text-muted/60" aria-hidden="true" />
            <span className="text-heading font-semibold" aria-current="page">
              {category.title}
            </span>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-6 shadow-sm"
                style={{
                  backgroundColor: `${category.accent}20`,
                  color: category.accent,
                }}
              >
                <ProductIcon name={category.icon} size={36} />
              </motion.div>

              <motion.h1
                initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight"
              >
                {category.title}
              </motion.h1>

              <motion.p
                initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mt-5 text-base sm:text-xl text-muted leading-relaxed font-normal max-w-2xl"
              >
                {category.tagline}
              </motion.p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="w-full sm:w-auto"
              >
                {isMarketing ? (
                  <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white mb-3">
                      <Sparkles size={13} />
                      Coming Soon
                    </div>
                    <p className="text-xs sm:text-sm text-fg/80 leading-relaxed font-medium">
                      Our marketing suite is currently being finalized. Pre-register your interest to receive early access.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>Join waiting list</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                ) : (
                  <SmartLink
                    href={category.heroCta.href}
                    external={category.heroCta.external}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 transition-all text-base group"
                  >
                    <span>{category.heroCta.label}</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </SmartLink>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Catalog & Offerings
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-heading mt-1">
                Explore Available Products
              </h2>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-muted">
              {category.products.length} {category.products.length === 1 ? 'solution' : 'solutions'} available
            </div>
          </div>

          {/* 3D Tilt Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products.map((product, idx) => (
              <ProductCard3D
                key={product.name}
                product={product}
                accent={category.accent}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Clean Detail Section for Legal & Entrepreneurial */}
      {isLegal && (
        <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-surface border-y border-line">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-3">
                <ShieldCheck size={14} />
                Full-Service Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
                Corporate Compliance & Legal Advisory Made Effortless
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed font-normal">
                Whether you are founding a private limited company, navigating monthly GST filings, or executing investor agreements, our accredited corporate attorneys and chartered accountants protect your business every step of the way.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-14">
              <div className="rounded-3xl border border-line bg-bg p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-5">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">
                    Fast Incorporation
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 font-normal">
                    End-to-end registration for Private Limited, LLP, OPC, and Section 8 entities with DIN, DSC, PAN, TAN, and MSME registration included.
                  </p>
                  <ul className="space-y-2.5 text-xs text-fg font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Name approval & MOA/AOA drafting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Zero hidden government filing fees
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Bank account opening assistance
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-bg p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-5">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">
                    GST & Tax Filing
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 font-normal">
                    Timely monthly & quarterly GST return filings (GSTR-1, GSTR-3B, GSTR-9), input tax credit reconciliations, and notice resolutions.
                  </p>
                  <ul className="space-y-2.5 text-xs text-fg font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Automated invoice & ledger auditing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Penalty avoidance guarantees
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Dedicated CA support desk
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-bg p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-5">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">
                    Legal & Contract Vault
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 font-normal">
                    Customized Non-Disclosure Agreements, Founder Vesting Contracts, Employment Terms, and Intellectual Property / Trademark filings.
                  </p>
                  <ul className="space-y-2.5 text-xs text-fg font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Bespoke commercial contracts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Trademark & brand IP protection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      Dispute mitigation counsel
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-heading">
                  Schedule an advisory call with our legal desk
                </h4>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Connect directly with our legal experts to evaluate your company incorporation or compliance requirements.
                </p>
              </div>
              <Link
                to="/contact"
                className="shrink-0 px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center gap-2"
              >
                <PhoneCall size={16} />
                <span>Book Legal Consultation</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Side/Bottom "Other Categories" Row to Jump Between Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-line/60 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-heading">
              Explore Other Categories
            </h3>
            <p className="text-sm text-muted mt-1">
              Discover other pillars of the Codways ecosystem
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCategories.map(other => {
              const otherIsSoon = Boolean(other.comingSoon || other.status === 'Coming Soon')
              return (
                <Link
                  key={other.slug}
                  to={`/products/${other.slug}`}
                  className="group rounded-3xl border border-line bg-surface p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${other.accent}18`,
                          color: other.accent,
                        }}
                      >
                        <ProductIcon name={other.icon} size={24} />
                      </div>
                      {otherIsSoon && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-heading group-hover:text-accent transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-xs text-muted mt-1.5 leading-relaxed font-normal">
                      {other.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-line/50 flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: other.accent }}>
                      View category
                    </span>
                    <ArrowRight
                      size={15}
                      className="text-muted group-hover:translate-x-1 group-hover:text-accent transition-all"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom Contact CTA Band */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-3xl border border-line bg-surface p-8 sm:p-14 text-center shadow-lg relative overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: category.accent }}
          />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight mb-4">
            Have questions about {category.title.replace(' Products', '')}?
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Our specialized team is ready to answer questions, guide your onboarding, or tailor enterprise solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl font-bold bg-accent hover:bg-accent-hover text-white shadow-md transition"
            >
              Get in Touch with an Advisor
            </Link>
            <Link
              to="/products"
              className="px-8 py-3.5 rounded-xl font-bold border border-line hover:bg-bg text-heading transition"
            >
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
