import React, { useEffect } from 'react'
import { getCategoryColor, getCategoryLabel } from '../data/products'
import { getProductIcon, CloseIcon } from './icons'
import './ProductModal.css'

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    if (!product) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  const Icon = getProductIcon(product)
  const color = getCategoryColor(product.category)

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div className="modal__backdrop" />

      <div
        className="modal__panel"
        style={{ '--modal-accent': color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="关闭"
        >
          <CloseIcon />
        </button>

        <div className="modal__header">
          <div className="modal__icon">
            <Icon />
          </div>
          <div className="modal__meta">
            <span
              className="modal__category"
              style={{ color }}
            >
              {getCategoryLabel(product.category)}
            </span>
            <h2 id="modal-title" className="modal__title">
              {product.name}
            </h2>
            <p className="modal__year">{product.year} 年发布</p>
          </div>
        </div>

        <p className="modal__tagline">{product.tagline}</p>

        <div className="modal__description">
          <p>{product.description}</p>
        </div>

        {product.specs && product.specs.length > 0 && (
          <div className="modal__section">
            <h3 className="modal__section-title">技术规格</h3>
            <ul className="modal__specs">
              {product.specs.map((spec, i) => (
                <li key={i} className="modal__spec">
                  <span className="modal__spec-dot" style={{ background: color }} />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.significance && (
          <div className="modal__section modal__section--significance">
            <h3 className="modal__section-title">历史意义</h3>
            <p className="modal__significance">{product.significance}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductModal
