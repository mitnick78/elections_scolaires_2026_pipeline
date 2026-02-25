import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header as DsfrHeader } from '@codegouvfr/react-dsfr/Header'

const Header: FC = () => {
  const navigate = useNavigate()

  return (
    <DsfrHeader
      brandTop={<>Projet Data</>}
      serviceTitle="🏫 Tensions Scolaires 2026"
      serviceTagline="Projet indépendant — Données rentrée scolaire 2024 — Élections municipales 2026"
      homeLinkProps={{
        href: '/',
        title: 'Accueil — Tensions Scolaires 2026',
        onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('/') }
      }}
      navigation={[
        {
          text: 'Accueil',
          linkProps: { href: '/', onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('/') } }
        },
        {
          text: 'Dashboard',
          linkProps: { href: '/dashboard', onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('/dashboard') } }
        },
        {
          text: 'Départements',
          linkProps: { href: '/departements', onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('/departements') } }
        }
      ]}
    />
  )
}

export default Header