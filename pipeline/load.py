import pandas as pd
from sqlalchemy import create_engine

ENGINE = create_engine('postgresql://admin:admin123@localhost:5432/elections_scolaires')

def load():
    print("⏳ Chargement Silver → Gold...")

    # Lire depuis le Silver
    df = pd.read_sql("SELECT * FROM silver_communes", ENGINE)
    print(f"{len(df)} communes chargées depuis Silver")

    # Charger en Gold — aucune transformation
    df.to_sql('gold_communes_tension', ENGINE, if_exists='replace', index=False)
    print(f"Gold chargé dans PostgreSQL — {len(df)} communes !")

if __name__ == "__main__":
    load()