import type { FC } from 'react'
import { useCommunesMap } from '../hooks/useCommunes'
import MapView from '../components/Map/MapView'

const Dashboard: FC = () => {
  const { communes, loading, error } = useCommunesMap()

  return (
    <div>
      <h1 className="fr-h1">Carte des tensions scolaires</h1>
      <p className="fr-text--lead fr-mb-4w">
        Visualisation des communes françaises par niveau de tension scolaire.
      </p>

      {/* Légende */}
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-2w">
        {[
          { label: 'Forte tension (≥25)', color: '#e1000f' },
          { label: 'Tension modérée (22-25)', color: '#e67e22' },
          { label: 'Normal (18-22)', color: '#18753c' },
          { label: 'Sous-capacité (<18)', color: '#0063cb' }
        ].map(({ label, color }) => (
          <div key={label} className="fr-col-auto">
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: color,
              marginRight: '6px'
            }} />
            {label}
          </div>
        ))}
      </div>

      {/* Carte */}
      {loading && <p>Chargement de la carte...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <MapView communes={communes} />}
    </div>
  )
}

export default Dashboard