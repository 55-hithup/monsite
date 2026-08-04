import SectionReveal from './SectionReveal';

export default function Comparison() {
  return (
    <SectionReveal className="section-pad" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="eyebrow reveal">Pourquoi investir</div>
            <h2 className="section-title reveal">L'écart se voit<br />immédiatement.</h2>
          </div>
        </div>
        <div className="compare-wrap reveal">
          <div className="compare-col before">
            <span className="compare-label">Avant</span>
            <ul className="compare-list">
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Un site générique qui ne reflète pas votre valeur
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Des visiteurs qui repartent sans agir
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Un design daté, lent sur mobile
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Une image qui freine la confiance
              </li>
            </ul>
          </div>
          <div className="compare-col after">
            <span className="compare-label">Après</span>
            <ul className="compare-list">
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#66E6FF" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Une identité forte qui vous ressemble
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#66E6FF" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Un parcours pensé pour convertir
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#66E6FF" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Une expérience rapide, fluide, moderne
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#66E6FF" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Une crédibilité immédiate, à la hauteur de vos ambitions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
