import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from extract import extract
from transform import transform
from load import load

def main():
    print(" Lancement du pipeline ETL\n")
    print("=" * 40)

    # Étape 1 — Extract
    print("\n ÉTAPE 1 — EXTRACT")
    extract()

    # Étape 2 — Transform
    print("\n🔧 ÉTAPE 2 — TRANSFORM")
    transform()

    # Étape 3 — Load
    print("\n ÉTAPE 3 — LOAD")
    load()

    print("\n" + "=" * 40)
    print(" Pipeline ETL terminé avec succès !")

if __name__ == "__main__":
    main()