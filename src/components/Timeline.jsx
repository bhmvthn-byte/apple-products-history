import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { categories, getProductsByCategory, getCategoryColor } from '../data/products'
import { getCategoryIcon } from './icons'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import Reveal from './Reveal'
import './Timeline.css'

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points={dir === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
)

const Timeline = ({ activeCategory = 'all', onCategoryChange }) => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [thumb, setThumb] = useState({ width: 100, offset: 0 })

  const railRef = useRef(null)
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false })
  const suppressClick = useRef(false)

  const products = useMemo(() => getProductsByCategory(activeCategory), [activeCategory])

  // Chronological order for the horizontal axis
  const sorted = useMemo(
    () =>
      [...products].sort(
        (a, b) => a.year - b.year || (a.month || 0) - (b.month || 0)
      ),
    [products]
  )

  const updateScrollState = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const ratio = max > 0 ? el.scrollLeft / max : 0
    const visible = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(max <= 2 || el.scrollLeft >= max - 2)
    setThumb({ width: visible * 100, offset: ratio * (1 - visible) * 100 })
  }, [])

  // Reset the rail whenever the filter changes
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    el.scrollTo({ left: 0, behavior: 'auto' })
    const id = requestAnimationFrame(updateScrollState)
    return () => cancelAnimationFrame(id)
  }, [activeCategory, sorted.length, updateScrollState])

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [updateScrollState])

  const scrollByPage = (dir) => {
    const el = railRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return // native touch scrolling
    const el = railRef.current
    if (!el) return
    dragState.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      pointerId: e.pointerId,
    }
  }

  const onPointerMove = (e) => {
    const state = dragState.current
    if (!state.down) return
    const el = railRef.current
    if (!el) return
    const dx = e.clientX - state.startX
    if (!state.moved && Math.abs(dx) > 4) {
      state.moved = true
      // Capture only after a real drag starts, so plain clicks
      // still reach the product card underneath.
      try {
        el.setPointerCapture(state.pointerId)
      } catch {
        /* pointer capture unsupported — dragging still works */
      }
      el.classList.add('is-dragging')
    }
    if (!state.moved) return
    el.scrollLeft = state.startScroll - dx
    e.preventDefault()
  }

  const onPointerUp = (e) => {
    const state = dragState.current
    if (!state.down) return
    state.down = false
    const el = railRef.current
    if (el) {
      el.classList.remove('is-dragging')
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    }
    if (state.moved) {
      suppressClick.current = true
      window.setTimeout(() => {
        suppressClick.current = false
      }, 120)
    }
  }

  const openProduct = (product) => {
    if (suppressClick.current) return
    setSelectedProduct(product)
  }

  return (
    <section id="timeline" className="timeline">
      <div className="container">
        <Reveal className="timeline__header">
          <h2 className="timeline__title">产品时间线</h2>
          <p className="timeline__subtitle">
            左右拖动浏览，点击任意卡片查看详细信息。
          </p>
        </Reveal>

        {/* Category filters */}
        <div className="timeline__filters">
          <div className="timeline__filters-track">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.id)
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  className={`timeline__filter ${isActive ? 'timeline__filter--active' : ''}`}
                  onClick={() => onCategoryChange && onCategoryChange(cat.id)}
                  style={isActive ? { '--cat-color': getCategoryColor(cat.id) } : {}}
                >
                  <span className="timeline__filter-icon">
                    <Icon />
                  </span>
                  <span className="timeline__filter-label">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Horizontal timeline */}
        {sorted.length === 0 ? (
          <p className="timeline__empty">暂无该分类的产品。</p>
        ) : (
          <>
            <div className="timeline__rail-wrap">
              <button
                className="timeline__arrow timeline__arrow--prev"
                onClick={() => scrollByPage(-1)}
                disabled={atStart}
                aria-label="向前浏览"
              >
                <Arrow dir="prev" />
              </button>

              <div
                className="timeline__rail"
                ref={railRef}
                onScroll={updateScrollState}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') {
                    e.preventDefault()
                    scrollByPage(-1)
                  } else if (e.key === 'ArrowRight') {
                    e.preventDefault()
                    scrollByPage(1)
                  }
                }}
                tabIndex={0}
                role="region"
                aria-label="产品时间轴，可左右拖动浏览"
              >
                {sorted.map((product) => (
                  <div
                    key={product.id}
                    className="timeline__point"
                    style={{ '--point-color': getCategoryColor(product.category) }}
                  >
                    <div className="timeline__year">{product.year}</div>
                    <div className="timeline__marker">
                      <span className="timeline__dot" />
                    </div>
                    <div className="timeline__card">
                      <ProductCard
                        product={product}
                        variant="rail"
                        onClick={() => openProduct(product)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="timeline__arrow timeline__arrow--next"
                onClick={() => scrollByPage(1)}
                disabled={atEnd}
                aria-label="向后浏览"
              >
                <Arrow dir="next" />
              </button>
            </div>

            <div className="timeline__rail-meta">
              <div className="timeline__progress">
                <span
                  style={{
                    width: `${thumb.width}%`,
                    marginLeft: `${thumb.offset}%`,
                  }}
                />
              </div>
              <span className="timeline__hint">左右拖动浏览 · 共 {sorted.length} 款</span>
            </div>
          </>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}

export default Timeline
