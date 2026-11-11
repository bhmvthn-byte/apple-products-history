import React from 'react'
import { getCategoryColor } from '../data/products'
import { getProductIcon } from './icons'
import './ProductCard.css'

const ProductCard = ({ product, onClick, variant = 'default' }) => {
  const Icon = getProductIcon(product)
  const color = getCategoryColor(product.category)

  return (
    <article
      className={`product-card ${variant === 'rail' ? 'product-card--rail' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      style={{ '--card-accent': color }}
    >
      <div className="product-card__year">{product.year}</div>
      <div className="product-card__icon">
        <Icon />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>
      </div>
      <div className="product-card__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </article>
  )
}

export default ProductCard
