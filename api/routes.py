from fastapi import APIRouter, Depends
from sqlalchemy import text
from database import get_db

router = APIRouter()

# Route de test
@router.get("/")
def home():
    return {"message": "🏫 API Tensions Scolaires 2026"}

# Stats nationales
@router.get("/stats")
def get_stats(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            COUNT(*) as total_communes,
            ROUND(AVG(ratio_eleves_par_classe)::numeric, 2) as ratio_moyen,
            ROUND(MAX(ratio_eleves_par_classe)::numeric, 2) as ratio_max,
            ROUND(MIN(ratio_eleves_par_classe)::numeric, 2) as ratio_min,
            COUNT(*) FILTER (WHERE niveau_tension = 'Forte tension') as forte_tension,
            COUNT(*) FILTER (WHERE niveau_tension = 'Tension modérée') as tension_moderee,
            COUNT(*) FILTER (WHERE niveau_tension = 'Normal') as normal,
            COUNT(*) FILTER (WHERE niveau_tension = 'Sous-capacité') as sous_capacite
        FROM gold_communes_tension
    """))
    return result.mappings().first()

# Toutes les communes pour la carte
@router.get("/communes/map")
def get_communes_map(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            "Commune",
            "Département",
            total_classes,
            total_eleves,
            nb_ecoles,
            ratio_eleves_par_classe,
            niveau_tension,
            type_commune,
            latitude,
            longitude
        FROM gold_communes_tension
        WHERE latitude IS NOT NULL 
        AND longitude IS NOT NULL
    """))
    return result.mappings().all()

# Liste des départements
@router.get("/departements")
def get_departements(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            "Département",
            "Code département",
            COUNT(*) as nb_communes,
            ROUND(AVG(ratio_eleves_par_classe)::numeric, 2) as ratio_moyen,
            COUNT(*) FILTER (WHERE niveau_tension = 'Forte tension') as forte_tension
        FROM gold_communes_tension
        GROUP BY "Département", "Code département"
        ORDER BY ratio_moyen DESC
    """))
    return result.mappings().all()

# Communes par département
@router.get("/communes/departement/{departement}")
def get_communes_by_departement(departement: str, db=Depends(get_db)):
    result = db.execute(text("""
        SELECT * FROM gold_communes_tension
        WHERE "Département" = :dept
        ORDER BY ratio_eleves_par_classe DESC
    """), {"dept": departement.upper()})
    return result.mappings().all()

# Communes par niveau de tension
@router.get("/communes/tension/{niveau}")
def get_communes_by_tension(niveau: str, db=Depends(get_db)):
    result = db.execute(text("""
        SELECT * FROM gold_communes_tension
        WHERE niveau_tension = :niveau
        ORDER BY ratio_eleves_par_classe DESC
    """), {"niveau": niveau})
    return result.mappings().all()

# Communes par type
@router.get("/communes/type/{type_commune}")
def get_communes_by_type(type_commune: str, db=Depends(get_db)):
    result = db.execute(text("""
        SELECT * FROM gold_communes_tension
        WHERE type_commune = :type
        ORDER BY ratio_eleves_par_classe DESC
    """), {"type": type_commune})
    return result.mappings().all()

# Top 10 communes les plus en tension
@router.get("/communes/top10")
def get_top10(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT * FROM gold_communes_tension
        ORDER BY ratio_eleves_par_classe DESC
        LIMIT 10
    """))
    return result.mappings().all()