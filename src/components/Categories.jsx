import React from 'react'
import { categories, getProductsByCategory } from '../data/products'
import { getCategoryIcon } from './icons'
import Reveal from './Reveal'
import './Categories.css'

const descriptions = {
  mac: '从 Apple I 到 M5，个人电脑的五十年。',
  iphone: '重新定义手机，也重新定义移动互联网。',
  ipad: '从初代 iPad 到 M5，一整条平板产品线。',
  ipod: '把一千首歌装进口袋，改变音乐产业。',
  watch: '腕上的健康监测与运动伙伴。',
  airpods: '无线音频、主动降噪与听觉健康。',
  appletv: '把影院级画质与声音搬进客厅。',
  homepod: '空间音频与智能家居的中枢。',
  vision: '空间计算的开端。',
  accessories: '显示器、打印机、路由器与其他配件。',
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const Categories = ({ onSelect }) => {
  const categoryData = categories
    .filter((c) => c.id !== 'all')
    .map((cat) => ({
      ...cat,
      count: getProductsByCategory(cat.id).length,
      description: descriptions[cat.id] || '',
    }))

  return (
    <section id="products" className="categories">
      <div className="categories__inner">
        <Reveal className="categories__header">
          <h2 className="categories__title">按产品线浏览</h2>
          <p className="categories__subtitle">
            十条产品线，覆盖 1976 年至今每一年发布的新机器。
          </p>
        </Reveal>

        <div className="categories__grid">
          {categoryData.map((cat, i) => {
            const Icon = getCategoryIcon(cat.id)
            return (
              <Reveal key={cat.id} className="categories__cell" delay={(i % 2) * 90}>
                <a
                  href="#timeline"
                  className={`categories__tile categories__tile--${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (onSelect) onSelect(cat.id)
                  }}
                >
                  <span className="categories__count">{cat.count} 款</span>

                  <div className="categories__tile-content">
                    <h3 className="categories__name">{cat.label}</h3>
                    <p className="categories__desc">{cat.description}</p>
                    <span className="categories__more">
                      查看全部
                      <Chevron />
                    </span>
                  </div>

                  <div className="categories__art" aria-hidden="true">
                    <Icon />
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories
