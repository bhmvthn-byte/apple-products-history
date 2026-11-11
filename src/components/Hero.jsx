import React from 'react'
import { products } from '../data/products'
import './Hero.css'

const Chevron = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__aurora" aria-hidden="true" />

      <div className="hero__inner">
        <p className="hero__eyebrow">
          1976 — 2026 · {products.length} 款产品 · 50 年
        </p>

        <h1 className="hero__title">
          苹果
          <br />
          纪年
        </h1>

        <p className="hero__subtitle">
          从车库里诞生的 Apple I，到会折叠的 iPhone Duo。五十年，每一次重新发明。
        </p>

        <div className="hero__cta">
          <a href="#timeline" className="hero__btn">
            浏览产品时间线
          </a>
          <a href="#ceos" className="hero__link">
            了解历任 CEO
            <Chevron />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
