import { useEffect, useRef } from 'react'

/**
 * Simple scroll reveal wrapper.
 * Usage:
 *  <ScrollReveal>
 *    <section className="reveal reveal-up">...</section>
 *  </ScrollReveal>
 */
export default function ScrollReveal({ children, threshold = 0.15 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const elements = node.querySelectorAll('.reveal')

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return <div ref={containerRef}>{children}</div>
}

