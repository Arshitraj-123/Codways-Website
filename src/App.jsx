import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProductsLanding from './pages/ProductsLanding.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import About from './pages/About.jsx'
import Resources from './pages/Resources.jsx'
import Contact from './pages/Contact.jsx'

// FX components and hooks
import ReadyContext from './components/fx/ReadyContext.jsx'
import ScrollProgress from './components/fx/ScrollProgress.jsx'
import CursorGlow from './components/fx/CursorGlow.jsx'
import useSpotlight from './components/fx/useSpotlight.js'
import LogoLoader from './components/fx/LogoLoader.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  // Always default to Light Mode matching the original website design
  const [dark, setDark] = useState(false)

  // Initialize ready / loader state from session storage
  const [ready, setReady] = useState(() => {
    try {
      return sessionStorage.getItem('cw_loaded') === '1'
    } catch (e) {
      return false
    }
  })

  const [showLoader, setShowLoader] = useState(() => {
    try {
      return sessionStorage.getItem('cw_loaded') !== '1'
    } catch (e) {
      return true
    }
  })

  // Global card spotlight hook
  useSpotlight()

  useEffect(() => {
    try {
      localStorage.removeItem('theme')
      localStorage.removeItem('codways_theme')
    } catch (e) {}
    document.documentElement.classList.remove('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <ReadyContext.Provider value={ready}>
      <div className="min-h-screen bg-bg text-fg">
        <ScrollProgress />
        <CursorGlow />
        <ScrollTop />
        <Navbar dark={dark} toggleTheme={() => setDark(d => !d)} />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsLanding />} />
              <Route path="/products/:slug" element={<CategoryPage />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />

        {/* Logo Assembly Loader (first session load) */}
        {showLoader && (
          <LogoLoader
            onReveal={() => setReady(true)}
            onDone={() => setShowLoader(false)}
          />
        )}
      </div>
    </ReadyContext.Provider>
  )
}
