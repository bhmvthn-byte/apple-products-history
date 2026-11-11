import React, { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: '产品时间线', href: '#timeline' },
  { label: '历任 CEO', href: '#ceos' },
  { label: '产品线', href: '#products' },
  { label: '关于', href: '#about' },
]

const markUrl = `${import.meta.env.BASE_URL}mark.svg`

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo" aria-label="返回首页">
          <img src={markUrl} alt="" width="28" height="28" />
        </a>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#timeline" className="navbar__cta">
          全部产品
        </a>

        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
        </button>
      </div>

      <span
        className="navbar__progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  )
}

export default Navbar
