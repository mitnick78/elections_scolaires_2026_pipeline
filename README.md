# 🏫 Tensions Scolaires dans les Communes Françaises
### Élections Municipales 2026 — Pipeline ETL

![Python](https://img.shields.io/badge/Python-3.12-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Docker](https://img.shields.io/badge/Docker-✓-blue)
![Data](https://img.shields.io/badge/Source-data.gouv.fr-orange)

## Description

Ce projet analyse les tensions scolaires dans les communes françaises à l'approche des élections municipales 2026. Il identifie les communes où le ratio élèves/classe est le plus élevé, révélant les besoins en matière d'infrastructure scolaire.

Architecture **Medallion complète** — Bronze, Silver et Gold sont stockés directement dans PostgreSQL, sans fichiers CSV intermédiaires.

---

## Résultats Clés

- **10 093 communes** analysées (avec 5+ classes)
- **Ratio moyen national** : 21.87 élèves/classe
- **632 communes** en forte tension (≥ 25 élèves/classe)
- **4 817 communes** en tension modérée

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
├── notebooks/
│   └── analyse.ipynb     # Analyse connectée directement à PostgreSQL
│
├── docker/
│   ├── docker-compose.yml    # PostgreSQL + PgAdmin
│   
├── requirements.txt
└── README.md
```

---

##Architecture Medallion

| Couche | Table PostgreSQL | Description |
|--------|-----------------|-------------|
| Bronze | `bronze_ecoles` | Données brutes téléchargées depuis data.gouv.fr |
| Silver | `silver_communes` | Agrégation par commune, ratio calculé, géocodage |
| Gold   | `gold_communes_tension` | Données finales prêtes à l'analyse |

```
data.gouv.fr
     ↓ extract.py
bronze_ecoles        ← données brutes (809 225 lignes)
     ↓ transform.py
silver_communes      ← nettoyées + ratio + géocode (10 093 communes)
     ↓ load.py
gold_communes_tension ← prêtes à l'analyse et la visualisation
```

---

## Lancer le Projet

### Prérequis
- Python 3.12+
- Docker & Docker Compose

### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/ton-username/elections-scolaires-2026.git
cd elections-scolaires-2026

# 2. Créer et activer l'environnement virtuel
python -m venv .env_scolaire
source .env_scolaire/bin/activate  # Mac/Linux
.env_scolaire\Scripts\activate     # Windows

# 3. Installer les dépendances
pip install -r requirements.txt

# 4. Lancer PostgreSQL et PgAdmin
docker-compose up -d

# 5. Lancer le pipeline ETL complet
python pipeline/main.py
```

### Accès PgAdmin
- URL : http://localhost:5050
- Email : admin@admin.com
- Password : admin123

---

## 📊 Méthodologie

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

---


## Stack Technique

- **Python** — Pandas, Requests, SQLAlchemy, tqdm
- **PostgreSQL** — Stockage Bronze / Silver / Gold
- **Docker** — Containerisation de la base de données
- **API data.gouv.fr** — Source des données
- **API adresse.data.gouv.fr** — Géocodage des communes

---

## 📦 Source des Données

- **Dataset** : [Effectifs et nombre de classes par école](https://www.data.gouv.fr/fr/datasets/606d2e53a6b3c9d4089baccd/)
- **Producteur** : Ministère de l'Éducation Nationale
- **Mise à jour** : Chaque rentrée scolaire
- **Licence** : Licence Ouverte / Open Licence

---

## 👤 Auteur

<p align="center">
  Fait avec ❤️ pour le Challenge Data.gouv 2026.<br>
  Architecturé et développé par <b>Christophe Millière</b>.<br>
  <i>Projet Data Engineering | Challenge Data.gouv 2026</i>
</p>
