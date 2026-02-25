import { useState, useEffect } from 'react'
import type { Commune, Stats, Departement } from '../types'
import { getStats, getCommunesMap, getTop10, getDepartements } from '../services/api'

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setError('Erreur lors du chargement des stats'))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}

export const useCommunesMap = () => {
  const [communes, setCommunes] = useState<Commune[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCommunesMap()
      .then(setCommunes)
      .catch(() => setError('Erreur lors du chargement des communes'))
      .finally(() => setLoading(false))
  }, [])

  return { communes, loading, error }
}

export const useTop10 = () => {
  const [top10, setTop10] = useState<Commune[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTop10()
      .then(setTop10)
      .finally(() => setLoading(false))
  }, [])

  return { top10, loading }
}

export const useDepartements = () => {
  const [departements, setDepartements] = useState<Departement[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Departement | null>(null)

  useEffect(() => {
    getDepartements().then((data) => {
      setDepartements(data)
      setSelected(data[0]) // ← premier département par défaut
    }).finally(() => setLoading(false))
  }, [])

  return { departements, loading, selected, setSelected }
}
