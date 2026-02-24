import pandas as pd
import requests
import io
from sqlalchemy import create_engine
from tqdm import tqdm
import time

ENGINE = create_engine('postgresql://admin:admin123@localhost:5432/elections_scolaires')

def geocode_batch(communes_batch, retries=3):
    csv_data = "q\n" + "\n".join(communes_batch)
    
    for attempt in range(retries):
        try:
            response = requests.post(
                "https://api-adresse.data.gouv.fr/search/csv/",
                files={"data": ("communes.csv", csv_data.encode('utf-8'), "text/csv")},
                timeout=30
            )
            return pd.read_csv(io.StringIO(response.text))
        except Exception as e:
            print(f"Tentative {attempt + 1}/{retries} échouée : {e}")
            time.sleep(2)  # attend 2 secondes avant de réessayer
    
    print(f"Batch échoué après {retries} tentatives")
    return pd.DataFrame()

def transform():
    print("⏳ Transformation Bronze → Silver...")

    # Lire depuis le Bronze
    df = pd.read_sql("SELECT * FROM bronze_ecoles", ENGINE)
    print(f"{len(df)} lignes chargées depuis Bronze")

    # Filtrer sur la dernière rentrée
    derniere_rentree = df['Rentrée scolaire'].max()
    df = df[df['Rentrée scolaire'] == derniere_rentree]
    print(f"Rentrée {derniere_rentree} : {len(df)} lignes")

    # Agrégation par commune
    df_communes = df.groupby(['Commune', 'Département', 'Code département']).agg(
        total_classes=('Nombre total de classes', 'sum'),
        total_eleves=('Nombre total d\'élèves', 'sum'),
        nb_ecoles=('Numéro de l\'école', 'count')
    ).reset_index()

    # Calcul du ratio
    df_communes['ratio_eleves_par_classe'] = df_communes['total_eleves'] / df_communes['total_classes']

    # Filtrer communes avec 5+ classes
    df_communes = df_communes[df_communes['total_classes'] >= 5].copy()

    # Niveau de tension
    def niveau_tension(ratio):
        if ratio >= 25:
            return 'Forte tension'
        elif ratio >= 22:
            return 'Tension modérée'
        elif ratio >= 18:
            return 'Normal'
        else:
            return 'Sous-capacité'

    df_communes['niveau_tension'] = df_communes['ratio_eleves_par_classe'].apply(niveau_tension)

    # Type de commune
    def type_commune(nb_ecoles):
        if nb_ecoles >= 10:
            return 'Urbaine'
        elif nb_ecoles >= 3:
            return 'Périurbaine'
        else:
            return 'Rurale'

    df_communes['type_commune'] = df_communes['nb_ecoles'].apply(type_commune)

    # Géocodage
    print("📍 Géocodage des communes...")
    batch_size = 1000
    communes_list = df_communes['Commune'].tolist()
    batches = [communes_list[i:i+batch_size] for i in range(0, len(communes_list), batch_size)]

    results = []
    for batch in tqdm(batches, desc="📍 Géocodage"):
        result = geocode_batch(batch)
        results.append(result)

    df_coords = pd.concat(results, ignore_index=True)
    df_coords = df_coords[df_coords['result_type'] == 'municipality']
    df_coords = df_coords.rename(columns={'q': 'Commune'})

    # Fusionner avec les coordonnées
    df_communes = df_communes.merge(
        df_coords[['Commune', 'latitude', 'longitude']],
        on='Commune',
        how='left'
    )

    # Charger en Silver PostgreSQL
    df_communes.to_sql('silver_communes', ENGINE, if_exists='replace', index=False)

    matched = df_communes['latitude'].notna().sum()
    print(f"Silver chargé dans PostgreSQL — {len(df_communes)} communes ({matched} géolocalisées) !")

if __name__ == "__main__":
    transform()