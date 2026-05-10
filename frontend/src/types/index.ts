export interface Commune {
  name: string;
  department: string;
  totalClasses: number;
  totalStudents: number;
  schoolCount: number;
  studentClassRatio: number;
  tensionLevel: TensionLevel;
  communeType: TypeCommune;
  latitude: number | null;
  longitude: number | null;
}

export interface Stats {
  totalCommunes: number;
  averageRatio: number;
  maxRatio: number;
  minRatio: number;
  highTension: number;
  moderateTension: number;
  normal: number;
  underCapacity: number;
}

export interface Department {
  name: string;
  code: string;
  communeCount: number;
  averageRatio: number;
  highTension: number;
}

export type TensionLevel =
  | "Forte tension"
  | "Tension modérée"
  | "Normal"
  | "Sous-capacité";
export type TypeCommune = "Urbaine" | "Périurbaine" | "Rurale";
