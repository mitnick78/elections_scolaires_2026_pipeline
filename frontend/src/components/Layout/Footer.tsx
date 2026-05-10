const Footer = () => {
  return (
    <footer className="fr-footer">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand">
            <p className="fr-logo">République Française</p>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              ⚠️ Ce site est un projet indépendant à des fins d'analyse et n'est
              pas affilié au gouvernement français. Les données proviennent du
              Ministère de l'Éducation Nationale via data.gouv.fr sous licence
              ouverte.
            </p>
            <p className="fr-footer__content-desc">
              Analyse des tensions scolaires dans les communes françaises à
              l'approche des élections municipales 2026. Données issues du
              Ministère de l'Éducation Nationale via data.gouv.fr
            </p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  href="https://www.data.gouv.fr"
                  target="_blank"
                  rel="noreferrer"
                >
                  data.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  href="https://github.com/mitnick78/elections_scolaires_2026_pipeline"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <span className="fr-footer__bottom-link">
                © 2026 Christophe — Données : Ministère de l'Éducation Nationale
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
