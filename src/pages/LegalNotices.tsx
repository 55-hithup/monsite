import SectionReveal from '../components/SectionReveal';

export default function LegalNotices() {
  return (
    <SectionReveal className="section-pad" style={{ background: 'var(--color-bg-deep)', minHeight: '80vh', paddingTop: '140px' }}>
      <div className="wrap max-w-3xl">
        <div className="eyebrow">Juridique</div>
        <h1 className="section-title mt-4 mb-10">Mentions Légales</h1>
        
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">1. Présentation du site</h2>
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>devsupai.fr</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Propriétaire / Éditeur :</strong> Alexandre PABST EI (sous le nom commercial DevSupAi), entrepreneur individuel, domicilié au 13 Allée des Roses, 55300 Saint-Mihiel, France.</li>
              <li><strong>SIRET :</strong> 106 295 678 00010 (Immatriculé au Registre National des Entreprises - RNE).</li>
              <li><strong>TVA :</strong> TVA non applicable, article 293 B du CGI.</li>
              <li><strong>Contact Email :</strong> contact@devsupai.fr</li>
              <li><strong>Responsable de la publication :</strong> Alexandre PABST — contact@devsupai.fr</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">2. Hébergement</h2>
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong>, située au 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis (téléphone : +1 (559) 288-7156, site web : vercel.com).
            </p>
            <p>
              Les noms de domaine sont gérés auprès de la société <strong>OVH SAS</strong>, ayant son siège social au 2 rue Kellermann, 59100 Roubaix, France (site web : ovhcloud.com).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">3. Propriété intellectuelle</h2>
            <p>
              DevSupAi est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de DevSupAi.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">4. Limitation de responsabilité</h2>
            <p>
              DevSupAi ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site internet. DevSupAi s'efforce de fournir des informations aussi précises que possible, mais ne saurait garantir l'exactitude ou l'exhaustivité des informations diffusées sur le site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">5. Cookies & traceurs</h2>
            <p>
              Le site <strong>devsupai.fr</strong> n'utilise pas de cookies de ciblage publicitaire ni de traceurs tiers invasifs. Seuls des cookies techniques essentiels ou de mesure d'audience anonymes peuvent être déposés pour assurer le bon fonctionnement technique et analyser l'utilisation générale du site.
            </p>
          </section>
        </div>
      </div>
    </SectionReveal>
  );
}
