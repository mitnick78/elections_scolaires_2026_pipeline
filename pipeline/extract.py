from turtle import clear

import requests
import pandas as pd
from sqlalchemy import create_engine
import io
import os

DATASET_URL = "https://www.data.gouv.fr/api/1/datasets/606d2e53a6b3c9d4089baccd/"
ENGINE = create_engine('postgresql://admin:admin123@localhost:5432/elections_scolaires')

def extract():
    print("Récupération du dataset depuis data.gouv.fr...")

    # Récupérer l'URL du CSV
    response = requests.get(DATASET_URL)
    dataset = response.json()

    csv_url = None
    for resource in dataset['resources']:
        if resource['format'].lower() == 'csv':
            csv_url = resource['url']
            break

    if not csv_url:
        raise Exception("Fichier CSV introuvable !")

    print(f"Téléchargement depuis : {csv_url}")

    # Télécharger le CSV en mémoire
    csv_response = requests.get(csv_url)
    df = pd.read_csv(io.StringIO(csv_response.content.decode('utf-8')), sep=';', low_memory=False)
    print(f"{len(df)} lignes téléchargées")

    # Charger directement en Bronze PostgreSQL
    df.to_sql('bronze_ecoles', ENGINE, if_exists='replace', index=False)
    print(f"🥉 Bronze chargé dans PostgreSQL — {len(df)} lignes !")

if __name__ == "__main__":
    extract()