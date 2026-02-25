export interface Commune {
  Commune: string
  Département: string
  total_classes: number
  total_eleves: number
  nb_ecoles: number
  ratio_eleves_par_classe: number
  niveau_tension: 'Forte tension' | 'Tension modérée' | 'Normal' | 'Sous-capacité'
  type_commune: 'Urbaine' | 'Périurbaine' | 'Rurale'
  latitude: number | null
  longitude: number | null
}

export interface Stats {
  total_communes: number
  ratio_moyen: number
  ratio_max: number
  ratio_min: number
  forte_tension: number
  tension_moderee: number
  normal: number
  sous_capacite: number
}

export interface Departement {
  Département: string
  "Code département": string
  nb_communes: number
  ratio_moyen: number
  forte_tension: number
}

export type NiveauTension = 'Forte tension' | 'Tension modérée' | 'Normal' | 'Sous-capacité'
export type TypeCommune = 'Urbaine' | 'Périurbaine' | 'Rurale'