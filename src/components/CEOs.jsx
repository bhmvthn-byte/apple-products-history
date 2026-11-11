import React from 'react'
import { ceos } from '../data/ceos'
import './CEOs.css'

const CEOs = () => {
  return (
    <section id="ceos" className="ceos">
      <div className="container">
        <div className="ceos__header">
          <h2 className="ceos__title">历任 CEO</h2>
          <p className="ceos__subtitle">
            从 1977 年的第一任到今天，七位掌舵者接力书写了苹果的五十年。
          </p>
        </div>

        <div className="ceos__list">
          {ceos.map((ceo) => (
            <article className="ceos__row" key={ceo.id}>
              <div
                className="ceos__monogram"
                style={{ '--ceo-color': ceo.color }}
                aria-hidden="true"
              >
                {ceo.initial}
              </div>

              <div className="ceos__identity">
                <h3 className="ceos__name">{ceo.name}</h3>
                <p className="ceos__cn">{ceo.cn}</p>
              </div>

              <div className="ceos__tenure">
                <span className="ceos__years">{ceo.tenure}</span>
                <span className="ceos__role">{ceo.role}</span>
              </div>

              <p className="ceos__summary">{ceo.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CEOs
