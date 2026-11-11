import React, { useEffect, useRef, useState } from 'react'
import { products, getDecades } from '../data/products'
import './Stats.css'

const Stats = () => {
  const totalProducts = products.length
  const decades = getDecades()
  const firstYear = Math.min(...products.map((p) => p.year))
  const lastYear = Math.max(...products.map((p) => p.year))

  const stats = [
    { value: totalProducts, label: '款产品' },
    { value: lastYear - firstYear, label: '年历史' },
    { value: decades.length, label: '个年代' },
    { value: 10, suffix: '+', label: '条产品线' },
  ]

  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [shown, setShown] = useState(() => stats.map(() => 0))

  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setStarted(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setShown(stats.map((s) => s.value))
      return
    }

    const duration = 1100
    const start = performance.now()
    let frame

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setShown(stats.map((s) => Math.round(s.value * eased)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stats__item">
              <div className="stats__value">
                {shown[i]}
                {stat.suffix || ''}
              </div>
              <div className="stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
