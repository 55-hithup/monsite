import SectionReveal from '../components/SectionReveal';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function PrivacyPolicy() {
  useDocumentMetadata(
    "Politique de Confidentialité | DevSupAi",
    "Découvrez notre politique de confidentialité, le traitement de vos données personnelles et vos droits relatifs aux RGPD."
  );

  return (
    <SectionReveal className="section-pad" style={{ background: 'var(--color-bg-deep)', minHeight: '80vh', paddingTop: '140px' }}>
      <div className="wrap max-w-3xl">
        <div className="eyebrow">Sécurité</div>
        <h1 className="section-title mt-4 mb-10">Politique de Confidentialité</h1>
        
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">1. Collecte des données personnelles</h2>
            <p>
              Dans le cadre de l'utilisation du site internet <strong>devsupai.fr</strong>, notamment via le formulaire de contact, certaines données à caractère personnel sont collectées :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Nom et prénom</strong> (pour vous identifier et vous adresser mes réponses)</li>
              <li><strong>Adresse e-mail</strong> (pour pouvoir vous répondre directement)</li>
              <li><strong>Numéro de téléphone</strong> (optionnel, pour vous recontacter si demandé)</li>
              <li><strong>Message</strong> (contenant les détails de votre demande de projet)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">2. Finalité du traitement</h2>
            <p>
              Ces informations sont collectées uniquement dans le but de :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Répondre à vos demandes d'informations ou de devis via le formulaire.</li>
              <li>Assurer le suivi de la relation commerciale si un contrat de prestation est établi.</li>
            </ul>
            <p>
              Aucune donnée n'est cédée, vendue ou louée à des tiers à des fins publicitaires ou commerciales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">3. Durée de conservation</h2>
            <p>
              Les données personnelles transmises via le formulaire de contact sont conservées pour une durée maximale de <strong>3 ans</strong> à compter de votre dernier échange, sauf si une relation contractuelle s'établit (auquel cas les données sont conservées pendant toute la durée légale de facturation et de garantie).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">4. Vos droits (RGPD)</h2>
            <p>
              Conformément à la réglementation européenne relative à la protection des données (RGPD), vous disposez des droits suivants concernant vos informations :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Droit d'accès et de rectification.</li>
              <li>Droit d'effacement (droit à l'oubli) de vos données.</li>
              <li>Droit à la limitation du traitement.</li>
            </ul>
            <p>
              Vous pouvez exercer ces droits à tout moment en envoyant simplement un e-mail à : <strong>contact@devsupai.fr</strong>. Je traiterai votre demande sous 30 jours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary">5. Sécurité des données</h2>
            <p>
              Toutes les connexions vers le site sont cryptées via le protocole SSL/TLS (HTTPS). Vos messages sont acheminés de manière sécurisée vers ma boîte de réception OVH protégée, afin de prévenir tout accès non autorisé à vos données.
            </p>
          </section>
        </div>
      </div>
    </SectionReveal>
  );
}
