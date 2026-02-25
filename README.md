<div align="center">
  <img src="images/logo-tension.png" width="300" alt="Carte des tensions scolaires"/>
</div>

# 🏫 Tensions Scolaires dans les Communes Françaises
### Élections Municipales 2026 — Full Stack Data

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)
![React](https://img.shields.io/badge/React-TypeScript-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Docker](https://img.shields.io/badge/Docker-✓-blue)
![Data](https://img.shields.io/badge/Source-data.gouv.fr-orange)

## 📋 Description

Projet indépendant d'analyse des tensions scolaires dans les communes françaises à l'approche des élections municipales 2026. Il identifie les communes où le ratio élèves/classe est le plus élevé, révélant les besoins en matière d'infrastructure scolaire.

> ⚠️ Ce projet est indépendant et n'est pas affilié au gouvernement français. Les données proviennent du Ministère de l'Éducation Nationale via data.gouv.fr — Rentrée scolaire 2024.

Architecture **Medallion complète** — Bronze, Silver et Gold sont stockés directement dans PostgreSQL, sans fichiers CSV intermédiaires.

---

## 🎯 Résultats Clés

- 📊 **10 093 communes** analysées (avec 5+ classes)
- 📈 **Ratio moyen national** : 21.87 élèves/classe
- 🔴 **632 communes** en forte tension (≥ 25 élèves/classe)
- 🟠 **4 817 communes** en tension modérée
- 🗺️ Carte interactive avec clustering par niveau de tension

---

## 🏗️ Architecture du Projet

```
elections-scolaires-2026/
│
├── pipeline/
│   ├── extract.py        # Bronze → télécharge et charge dans PostgreSQL
│   ├── transform.py      # Silver → nettoie, calcule, géocode
│   ├── load.py           # Gold → transfère le Silver en Gold
│   └── main.py           # Orchestration du pipeline ETL complet
│
├── api/
│   ├── main.py           # FastAPI — point d'entrée
│   ├── routes.py         # 8 routes disponibles
│   ├── database.py       # Connexion PostgreSQL
│   ├── requirements.txt  # Dépendances API
│   └── Dockerfile        # Containerisation API
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Map, Charts, Layout
│   │   ├── pages/        # Home, Dashboard, Départements
│   │   ├── services/     # Appels API
│   │   ├── hooks/        # Hooks personnalisés
│   │   └── types/        # Types TypeScript
│   └── Dockerfile        # Containerisation Frontend
│
├── docker-compose.yml    # Orchestre tout le projet
├── requirements.txt
└── README.md
```

---

## Architecture Medallion

| Couche | Table PostgreSQL | Description |
|--------|-----------------|-------------|
| Bronze | `bronze_ecoles` | Données brutes téléchargées depuis data.gouv.fr |
| Silver | `silver_communes` | Agrégation par commune, ratio calculé, géocodage |
| Gold | `gold_communes_tension` | Données finales prêtes à l'analyse |

```
data.gouv.fr
     ↓ extract.py
bronze_ecoles         ← données brutes (809 225 lignes)
     ↓ transform.py
silver_communes       ← nettoyées + ratio + géocode (10 093 communes)
     ↓ load.py
gold_communes_tension ← prêtes à l'analyse et la visualisation
     ↓ FastAPI
React Frontend        ← dashboard interactif
```

---

## API Disponible

| Route | Description |
|-------|-------------|
| `GET /` | Route de test |
| `GET /stats` | Stats nationales |
| `GET /communes/map` | Toutes les communes géolocalisées |
| `GET /communes/top10` | Top 10 communes en tension |
| `GET /departements` | Liste des départements |
| `GET /communes/departement/{dept}` | Communes par département |
| `GET /communes/tension/{niveau}` | Communes par niveau de tension |
| `GET /communes/type/{type}` | Communes par type |

Documentation Swagger disponible sur `http://localhost:8000/docs`

---

## 🚀 Lancer le Projet

### Prérequis
- Docker & Docker Compose

### Installation complète avec Docker

```bash
# 1. Cloner le projet
git clone https://github.com/ton-username/elections-scolaires-2026.git
cd elections-scolaires-2026

# 2. Lancer tous les services
docker-compose up -d --build

# 3. Lancer le pipeline ETL
python pipeline/main.py
```

### Accès aux services
| Service | URL |
|---------|-----|
| Frontend React | http://localhost:5173 |
| API FastAPI | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |
| PgAdmin | http://localhost:5050 |

### Accès PgAdmin
- Email : admin@admin.com
- Password : admin123

---

## Méthodologie

### Calcul du ratio
```
ratio_eleves_par_classe = total_élèves / total_classes
```

### Niveaux de tension
| Niveau | Ratio | Couleur |
|--------|-------|---------|
| Forte tension | ≥ 25 élèves/classe | 🔴 |
| Tension modérée | 22-25 élèves/classe | 🟠 |
| Normal | 18-22 élèves/classe | 🟢 |
| Sous-capacité | < 18 élèves/classe | 🔵 |

### Classification des communes
| Type | Critère |
|------|---------|
| Urbaine | ≥ 10 écoles |
| Périurbaine | 3-9 écoles |
| Rurale | 1-2 écoles |

### Limites connues
- Les élèves ULIS/UEEA sont inclus dans le calcul du ratio
- Les zones REP/REP+ ne sont pas analysées séparément
- Le géocodage couvre 87% des communes

---

## 🛠️ Stack Technique

- **Python** — Pandas, Requests, SQLAlchemy, tqdm
- **FastAPI** — API REST avec documentation Swagger
- **React + TypeScript** — Vite, DSFR, Leaflet, Recharts
- **PostgreSQL** — Stockage Bronze / Silver / Gold
- **Docker** — Containerisation complète du projet
- **API data.gouv.fr** — Source des données
- **API adresse.data.gouv.fr** — Géocodage des communes

---

## 📦 Source des Données

- **Dataset** : [Effectifs et nombre de classes par école](https://www.data.gouv.fr/fr/datasets/606d2e53a6b3c9d4089baccd/)
- **Producteur** : Ministère de l'Éducation Nationale
- **Rentrée** : 2024
- **Licence** : Licence Ouverte / Open Licence

---

<p align="center">
  Fait avec ❤️ pour le Challenge Data.gouv 2026.<br>
  Architecturé et développé par <b>Christophe Millière</b>.<br>
  <i>Projet Data Engineering | Challenge Data.gouv 2026</i>
</p>
