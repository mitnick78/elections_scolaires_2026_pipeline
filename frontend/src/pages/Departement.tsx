import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useDepartements } from '../hooks/useCommunes'
import { getCommunesByDepartement } from '../services/api'
import type { Commune, Departement } from '../types'

const couleurs: Record<string, string> = {
  'Forte tension': '#e1000f',
  'Tension modérée': '#e67e22',
  'Normal': '#18753c',
  'Sous-capacité': '#0063cb'
}

const DepartementPage: FC = () => {
  const { departements, loading } = useDepartements()
  const [selected, setSelected] = useState<Departement | null>(null)
  const [communes, setCommunes] = useState<Commune[]>([])
  const [loadingCommunes, setLoadingCommunes] = useState(false)

  const handleSelect = async (dept: Departement) => {
    setSelected(dept)
    setLoadingCommunes(true)
    const data = await getCommunesByDepartement(dept.Département)
    setCommunes(data)
    setLoadingCommunes(false)
  }

  useEffect(() => {
    if (departements.length > 0 && communes.length === 0) {
      getCommunesByDepartement(departements[0].Département)
        .then(setCommunes)
    }
  }, [departements])

  const currentDept = selected ?? departements[0] ?? null

  return (
    <div>
      <h1 className="fr-h1">📍 Analyse par département</h1>
      <p className="fr-text--lead fr-mb-4w">
        Sélectionnez un département pour voir le détail des communes.
      </p>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-4">
          <h2 className="fr-h3">Départements</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {departements.map((dept) => (
                <div
                  key={dept['Code département']}
                  className="fr-card fr-card--shadow fr-mb-1w"
                  style={{
                    cursor: 'pointer',
                    borderLeft: currentDept?.Département === dept.Département
                      ? '4px solid #0063cb'
                      : '4px solid transparent'
                  }}
                  onClick={() => handleSelect(dept)}
                >
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <p className="fr-card__title" style={{ fontSize: '14px' }}>
                        {dept.Département}
                      </p>
                      <p className="fr-card__desc" style={{ fontSize: '12px' }}>
                        Ratio moyen : <strong>{dept.ratio_moyen}</strong> |
                        🔴 {dept.forte_tension} communes
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="fr-col-12 fr-col-md-8">
          {currentDept && (
            <>
              <h2 className="fr-h3">Communes — {currentDept.Département}</h2>
              {loadingCommunes ? (
                <p>Chargement...</p>
              ) : (
                <div className="fr-table fr-table--bordered">
                  <table>
                    <thead>
                      <tr>
                        <th>Commune</th>
                        <th>Ratio</th>
                        <th>Nb écoles</th>
                        <th>Type</th>
                        <th>Niveau</th>
                      </tr>
                    </thead>
                    <tbody>
                      {communes.map((commune, index) => (
                        <tr key={index}>
                          <td>{commune.Commune}</td>
                          <td>
                            <strong style={{ color: couleurs[commune.niveau_tension] }}>
                              {commune.ratio_eleves_par_classe.toFixed(1)}
                            </strong>
                          </td>
                          <td>{commune.nb_ecoles}</td>
                          <td>{commune.type_commune}</td>
                          <td>
                            <span style={{ color: couleurs[commune.niveau_tension] }}>
                              {commune.niveau_tension}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DepartementPage