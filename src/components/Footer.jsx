import React from 'react'
import './Footer.css'

const iconUrl = `${import.meta.env.BASE_URL}icon.svg`

const Footer = () => {
  return (
    <footer id="about" className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={iconUrl} alt="" width="28" height="28" />
            <p>苹果纪年</p>
          </div>

          <div className="footer__columns">
            <div className="footer__column">
              <h4>产品线</h4>
              <a href="#products">Mac</a>
              <a href="#products">iPhone</a>
              <a href="#products">iPad</a>
              <a href="#products">Watch</a>
              <a href="#products">AirPods</a>
              <a href="#products">Apple TV</a>
              <a href="#products">HomePod</a>
              <a href="#products">Vision Pro</a>
            </div>

            <div className="footer__column">
              <h4>探索</h4>
              <a href="#timeline">产品时间线</a>
              <a href="#ceos">历任 CEO</a>
              <a href="#products">全部产品线</a>
              <a href="#hero">返回顶部</a>
            </div>

            <div className="footer__column">
              <h4>关于本站</h4>
              <p>非官方苹果产品历史展示页面，仅用于学习与展示。</p>
              <p>产品命名与时间依据 Apple Newsroom 及官方支持文档整理。</p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            本网站与 Apple Inc. 无关联。所有产品名称与商标归 Apple Inc. 所有。
          </p>
          <p>数据截至 2026 年 11 月 · © {new Date().getFullYear()} Apple Chronicle</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
