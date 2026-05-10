from fastapi import APIRouter, Depends
from sqlalchemy import text
from database import get_db

router = APIRouter()

COMMUNE_COLUMNS = """
    name,
    department,
    total_classes as "totalClasses",
    total_students as "totalStudents",
    school_count as "schoolCount",
    student_class_ratio as "studentClassRatio",
    tension_level as "tensionLevel",
    commune_type as "communeType",
    latitude,
    longitude
"""

@router.get("/")
def home():
    return {"message": "🏫 API Tensions Scolaires 2026"}

@router.get("/stats")
def get_stats(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            COUNT(*) as "totalCommunes",
            ROUND(AVG(student_class_ratio)::numeric, 2) as "averageRatio",
            ROUND(MAX(student_class_ratio)::numeric, 2) as "maxRatio",
            ROUND(MIN(student_class_ratio)::numeric, 2) as "minRatio",
            COUNT(*) FILTER (WHERE tension_level = 'Forte tension') as "highTension",
            COUNT(*) FILTER (WHERE tension_level = 'Tension modérée') as "moderateTension",
            COUNT(*) FILTER (WHERE tension_level = 'Normal') as normal,
            COUNT(*) FILTER (WHERE tension_level = 'Sous-capacité') as "underCapacity"
        FROM gold_communes_tension
    """))
    return result.mappings().first()

@router.get("/communes/map")
def get_communes_map(db=Depends(get_db)):
    result = db.execute(text(f"""
        SELECT {COMMUNE_COLUMNS}
        FROM gold_communes_tension
        WHERE latitude IS NOT NULL 
        AND longitude IS NOT NULL
    """))
    return result.mappings().all()

@router.get("/departements")
def get_departements(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            department as name,
            department_code as code,
            COUNT(*) as "communeCount",
            ROUND(AVG(student_class_ratio)::numeric, 2) as "averageRatio",
            COUNT(*) FILTER (WHERE tension_level = 'Forte tension') as "highTension"
        FROM gold_communes_tension
        GROUP BY department, department_code
        ORDER BY "averageRatio" DESC
    """))
    return result.mappings().all()

@router.get("/communes/departement/{departement}")
def get_communes_by_departement(departement: str, db=Depends(get_db)):
    result = db.execute(text(f"""
        SELECT {COMMUNE_COLUMNS}
        FROM gold_communes_tension
        WHERE department = :dept
        ORDER BY student_class_ratio DESC
    """), {"dept": departement.upper()})
    return result.mappings().all()

@router.get("/communes/tension/{niveau}")
def get_communes_by_tension(niveau: str, db=Depends(get_db)):
    result = db.execute(text(f"""
        SELECT {COMMUNE_COLUMNS}
        FROM gold_communes_tension
        WHERE tension_level = :niveau
        ORDER BY student_class_ratio DESC
    """), {"niveau": niveau})
    return result.mappings().all()

@router.get("/communes/type/{type_commune}")
def get_communes_by_type(type_commune: str, db=Depends(get_db)):
    result = db.execute(text(f"""
        SELECT {COMMUNE_COLUMNS}
        FROM gold_communes_tension
        WHERE commune_type = :type
        ORDER BY student_class_ratio DESC
    """), {"type": type_commune})
    return result.mappings().all()

@router.get("/communes/top10")
def get_top10(db=Depends(get_db)):
    result = db.execute(text(f"""
        SELECT {COMMUNE_COLUMNS}
        FROM gold_communes_tension
        ORDER BY student_class_ratio DESC
        LIMIT 10
    """))
    return result.mappings().all()