import type { FC } from 'react'
import { useStats, useTop10 } from '../hooks/useCommunes'
import TensionBarChart from '../components/Charts/BarChart'

const niveauCouleur: Record<string, string> = {
  'Forte tension': '#e1000f',
  'Tension modérée': '#e67e22',
  'Normal': '#18753c',
  'Sous-capacité': '#0063cb'
}

const Home: FC = () => {
  const { stats, loading, error } = useStats()
  const { top10, loading: loadingTop10 } = useTop10()

  if (loading) return <p className="fr-text">Chargement...</p>
  if (error) return <p className="fr-text">{error}</p>

  return (
    <div>
      {/* Titre */}
      <div className="fr-mb-4w">
        <h1 className="fr-h1">Tensions Scolaires 2026</h1>
        <p className="fr-text--lead">
          Analyse des communes françaises en tension scolaire
          à l'approche des élections municipales 2026.
        </p>
      </div>

      {/* Stats nationales */}
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-4w">
        <div className="fr-col-12 fr-col-md-3">
          <div className="fr-card fr-card--shadow">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h2 className="fr-card__title">{stats?.total_communes}</h2>
                <p className="fr-card__desc">Communes analysées</p>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-3">
          <div className="fr-card fr-card--shadow">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h2 className="fr-card__title">{stats?.ratio_moyen}</h2>
                <p className="fr-card__desc">Ratio moyen national</p>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-3">
          <div className="fr-card fr-card--shadow" style={{ borderTop: '3px solid #e1000f' }}>
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h2 className="fr-card__title">{stats?.forte_tension}</h2>
                <p className="fr-card__desc">Communes en forte tension</p>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-3">
          <div className="fr-card fr-card--shadow" style={{ borderTop: '3px solid #e67e22' }}>
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h2 className="fr-card__title">{stats?.tension_moderee}</h2>
                <p className="fr-card__desc">Communes en tension modérée</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique */}
      {stats && (
        <div className="fr-mb-4w">
          <h2 className="fr-h2">Répartition des communes par niveau de tension</h2>
          <TensionBarChart stats={stats} />
        </div>
      )}

      {/* Top 10 */}
      <div className="fr-mb-4w">
        <h2 className="fr-h2">Top 10 communes les plus en tension</h2>
        {loadingTop10 ? (
          <p>Chargement...</p>
        ) : (
          <div className="fr-table fr-table--bordered">
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Commune</th>
                  <th>Département</th>
                  <th>Ratio élèves/classe</th>
                  <th>Nb écoles</th>
                  <th>Type</th>
                  <th>Niveau</th>
                </tr>
              </thead>
              <tbody>
                {top10.map((commune, index) => (
                  <tr key={index}>
                    <td><strong>#{index + 1}</strong></td>
                    <td>{commune.Commune}</td>
                    <td>{commune.Département}</td>
                    <td>
                      <strong style={{ color: niveauCouleur[commune.niveau_tension] }}>
                        {commune.ratio_eleves_par_classe.toFixed(1)}
                      </strong>
                    </td>
                    <td>{commune.nb_ecoles}</td>
                    <td>{commune.type_commune}</td>
                    <td>
                      <span style={{ color: niveauCouleur[commune.niveau_tension] }}>
                        {commune.niveau_tension}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home