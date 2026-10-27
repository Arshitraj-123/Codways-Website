import { useState } from 'react'
import { motion } from 'framer-motion'

const field = 'w-full px-4 py-3 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 text-sm font-medium'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  
  const submit = e => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
        <p className="text-xl font-bold text-accent">Thank you! We will get in touch shortly.</p>
      </motion.div>
    )
  }

  const L = ({ children }) => <label className="block text-sm font-bold mb-1.5 text-heading">{children}</label>

  return (
    <form className="space-y-5" onSubmit={submit}>
      <div>
        <L>Full Name *</L>
        <input required type="text" className={field} placeholder="Enter your full name" />
      </div>
      <div>
        <L>Email Address *</L>
        <input required type="email" className={field} placeholder="Enter your email" />
      </div>
      <div>
        <L>Phone Number *</L>
        <input required type="tel" className={field} placeholder="Enter your phone number" />
      </div>
      <div>
        <L>Current Role</L>
        <input type="text" className={field} placeholder="e.g. Software Engineer, Marketing Manager" />
      </div>
      <div>
        <L>Interested Program</L>
        <select className={field} defaultValue="">
          <option value="">Select a program</option>
          <option>Growth Marketing</option>
          <option>Product Management</option>
          <option>Data Science</option>
          <option>Digital Marketing</option>
          <option>Business Analytics</option>
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="w-full py-3.5 rounded-lg font-bold bg-accent hover:bg-accent-hover text-white transition text-sm shadow-sm"
      >
        Book Free Session
      </motion.button>
      <p className="text-xs text-center text-muted pt-1 font-normal">
        By submitting this form, you agree to our Terms &amp; Conditions and Privacy Policy
      </p>
    </form>
  )
}
