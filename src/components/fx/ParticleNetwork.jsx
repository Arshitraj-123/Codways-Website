import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ParticleNetwork() {
  const canvasRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes = []
    let animationFrameId = null
    let isVisible = true
    let isTabVisible = !document.hidden

    const cursor = { x: -9999, y: -9999, active: false }

    const initNodes = () => {
      if (width === 0 || height === 0) return
      // Node count = min(90, floor(width * height / 15000))
      const count = Math.min(90, Math.max(15, Math.floor((width * height) / 15000)))
      nodes = []

      for (let i = 0; i < count; i++) {
        const isCyan = Math.random() < 0.25
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4, // +-0.2
          vy: (Math.random() - 0.5) * 0.4, // +-0.2
          radius: 0.9 + Math.random() * 1.6, // 0.9 - 2.5
          isCyan,
          color: isCyan ? 'rgba(38,198,218,' : 'rgba(76,175,80,',
        })
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      initNodes()
      if (prefersReduced) {
        drawFrame()
      }
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw connections between nearby nodes (< 135px)
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 18225) { // 135^2
            const d = Math.sqrt(d2)
            const alpha = (1 - d / 135) * 0.38
            ctx.strokeStyle = `rgba(76,175,80,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // 2. Cursor connections and gentle drift
      if (cursor.active) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          const dx = cursor.x - node.x
          const dy = cursor.y - node.y
          const d2 = dx * dx + dy * dy
          if (d2 < 28900) { // 170^2
            const d = Math.sqrt(d2)
            if (!prefersReduced && d > 2) {
              node.x += (dx / d) * 0.28
              node.y += (dy / d) * 0.28
            }
            const alpha = (1 - d / 170) * 0.6
            ctx.strokeStyle = `rgba(38,198,218,${alpha})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(cursor.x, cursor.y)
            ctx.stroke()
          }
        }
      }

      // 3. Draw nodes with soft glow (shadowBlur 8)
      ctx.shadowBlur = 8
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (!prefersReduced) {
          node.x += node.vx
          node.y += node.vy

          // Wrap edges smoothly
          if (node.x < -10) node.x = width + 10
          else if (node.x > width + 10) node.x = -10
          if (node.y < -10) node.y = height + 10
          else if (node.y > height + 10) node.y = -10
        }

        const fillColor = `${node.color}0.85)`
        ctx.shadowColor = fillColor
        ctx.fillStyle = fillColor

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    const animate = () => {
      if (isVisible && isTabVisible && !prefersReduced) {
        drawFrame()
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    // Mouse Listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      cursor.x = e.clientX - rect.left
      cursor.y = e.clientY - rect.top
      cursor.active =
        cursor.x >= 0 &&
        cursor.x <= rect.width &&
        cursor.y >= 0 &&
        cursor.y <= rect.height
    }

    const handleMouseLeave = () => {
      cursor.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Visibility / Intersection Observers
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden
      if (isTabVisible && isVisible && !prefersReduced) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && isTabVisible && !prefersReduced) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = requestAnimationFrame(animate)
      }
    })
    observer.observe(canvas)

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(canvas)

    resize()
    if (!prefersReduced) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  )
}
