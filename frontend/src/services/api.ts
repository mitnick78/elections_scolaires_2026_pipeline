import axios from 'axios'
import type { Commune, Stats, Departement } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

// Stats nationales
export const getStats = async (): Promise<Stats> => {
  const { data } = await api.get('/stats')
  return data
}

// Toutes les communes pour la carte
export const getCommunesMap = async (): Promise<Commune[]> => {
  const { data } = await api.get('/communes/map')
  return data
}

// Top 10 communes en tension
export const getTop10 = async (): Promise<Commune[]> => {
  const { data } = await api.get('/communes/top10')
  return data
}

// Tous les départements
export const getDepartements = async (): Promise<Departement[]> => {
  const { data } = await api.get('/departements')
  return data
}

// Communes par département
export const getCommunesByDepartement = async (departement: string): Promise<Commune[]> => {
  const { data } = await api.get(`/communes/departement/${departement}`)
  return data
}

// Communes par niveau de tension
export const getCommunesByTension = async (niveau: string): Promise<Commune[]> => {
  const { data } = await api.get(`/communes/tension/${niveau}`)
  return data
}

// Communes par type
export const getCommunesByType = async (type: string): Promise<Commune[]> => {
  const { data } = await api.get(`/communes/type/${type}`)
  return data
}