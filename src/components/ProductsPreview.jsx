import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Heading from './Heading.jsx'
import Reveal from './Reveal.jsx'
import CategoryCard from './CategoryCard.jsx'
import { productsData } from '../data/products.js'

export default function ProductsPreview() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Heading
          title="Our Product Categories"
          sub="Comprehensive solutions across education, legal, technology, and marketing domains"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mb-14">
          {productsData.map((category, idx) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={idx}
              compact={true}
            />
          ))}
        </div>

        <Reveal className="text-center">
          <motion.div
            whileHover={prefersReduced ? {} : { scale: 1.03 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
            className="inline-block"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold bg-accent hover:bg-accent-hover text-white shadow-md shadow-accent/20 transition-all duration-200 group"
            >
              <span>View all products</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
