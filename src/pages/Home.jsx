import { Hero, Why, Stories, ContactSection } from '../components/sections.jsx'
import ProductsPreview from '../components/ProductsPreview.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsPreview />
      <Why />
      <Stories />
      <ContactSection />
    </>
  )
}
