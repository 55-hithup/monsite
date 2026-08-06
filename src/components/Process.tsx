import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionReveal from './SectionReveal';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Découverte',
      desc: "J'échange avec vous sur vos objectifs, votre marché et vos utilisateurs pour poser des bases solides.",
    },
    {
      num: '02',
      title: 'Conception',
      desc: 'Architecture de l\'information, maquettes et direction artistique sont validées avant tout développement.',
    },
    {
      num: '03',
      title: 'Développement',
      desc: 'Un code propre, performant et évolutif donne vie au design pixel près, animations comprises.',
    },
    {
      num: '04',
      title: 'Livraison',
      desc: 'Tests, optimisation des performances et mise en ligne accompagnée, en toute sérénité.',
    },
    {
      num: '05',
      title: 'Suivi',
      desc: 'Un accompagnement continu pour faire évoluer votre site avec votre activité.',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tlItems = gsap.utils.toArray('.tl-item');
    const tlProgress = document.getElementById('tlProgress');

    let trigger: ScrollTrigger | null = null;

    if (tlProgress && tlItems.length > 0) {
      trigger = ScrollTrigger.create({
        trigger: '.timeline',
        start: 'top 60%',
        end: 'bottom 70%',
        scrub: 0.6,
        onUpdate: (self) => {
          tlProgress.style.height = (self.progress * 100) + '%';
          const idx = Math.floor(self.progress * tlItems.length);
          tlItems.forEach((it: any, i: number) => {
            it.classList.toggle('active', i <= idx);
          });
        },
      });
    }

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <SectionReveal id="process" className="section-pad">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="eyebrow reveal">Process</div>
            <h2 className="section-title reveal">Une méthode claire,<br />du premier échange<br />à la mise en ligne.</h2>
          </div>
        </div>
        
        <div className="timeline">
          <div className="timeline-line"></div>
          <div className="timeline-progress" id="tlProgress"></div>
          
          {steps.map((step) => (
            <div key={step.num} className="cursor-target tl-item reveal" data-tl>
              <div className="tl-num">{step.num}</div>
              <div className="tl-body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
