import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierTopBar() {
  const { isEn } = useLanguage();

  return (
    <div className="glacier-top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          {isEn
            ? '13 ALLÉE DES ROSES, 55300 SAINT-MIHIEL (FRANCE) | OPEN MON-FRI 8AM TO 6PM'
            : '13 ALLÉE DES ROSES, 55300 SAINT-MIHIEL (MEUSE 55) | OUVERT DU LUNDI AU VENDREDI DE 8H À 18H'}
        </div>
        <div className="top-bar-right">
          <a href="mailto:contact@devsupai.fr">CONTACT@DEVSUPAI.FR</a>
          <span className="top-sep">|</span>
          <span className="top-badge font-bold">
            {isEn ? 'FRANCE & WORLDWIDE' : 'GRAND EST & FRANCE'}
          </span>
        </div>
      </div>
    </div>
  );
}

