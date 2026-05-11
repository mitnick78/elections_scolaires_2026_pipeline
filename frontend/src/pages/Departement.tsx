import type { FC } from "react";
import { useState, useEffect } from "react";
import { useDepartements } from "@/hooks/useCommunes";
import { getCommunesByDepartement } from "@/services/api";
import type { Commune, Department } from "@/types";
import CommuneTable from "@/components/CommuneTable/CommuneTable";
import { TENSION_COLORS } from "@/constants/tensionColors";
import AsyncWrapper from "@/components/AsyncWrapper/AsyncWrapper";

const DepartementPage: FC = () => {
  const { departements, loading } = useDepartements();
  const [selected, setSelected] = useState<Department | null>(null);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loadingCommunes, setLoadingCommunes] = useState(false);

  const handleSelect = async (dept: Department) => {
    setSelected(dept);
    setLoadingCommunes(true);
    const data = await getCommunesByDepartement(dept.name);
    setCommunes(data);
    setLoadingCommunes(false);
  };

  useEffect(() => {
    if (departements.length > 0 && communes.length === 0) {
      getCommunesByDepartement(departements[0].name).then(setCommunes);
    }
  }, [communes.length, departements]);

  const currentDept = selected ?? departements[0] ?? null;

  return (
    <div>
      <h1 className="fr-h1">Analyse par département</h1>
      <p className="fr-text--lead fr-mb-4w">
        Sélectionnez un département pour voir le détail des communes.
      </p>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-4">
          <h2 className="fr-h3">Départements</h2>
          <AsyncWrapper loading={loading} error={null}>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {departements.map((dept) => (
                <div
                  key={dept.code}
                  className="fr-card fr-card--shadow fr-mb-1w"
                  style={{
                    cursor: "pointer",
                    borderLeft:
                      currentDept?.name === dept.name
                        ? "4px solid #0063cb"
                        : "4px solid transparent",
                  }}
                  onClick={() => handleSelect(dept)}
                >
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <p
                        className="fr-card__title"
                        style={{ fontSize: "14px" }}
                      >
                        {dept.name}
                      </p>
                      <p className="fr-card__desc" style={{ fontSize: "12px" }}>
                        Ratio moyen : <strong>{dept.averageRatio}</strong> |
                        {dept.highTension} communes
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AsyncWrapper>
        </div>

        <div className="fr-col-12 fr-col-md-8">
          {currentDept && (
            <>
              <h2 className="fr-h3">Communes — {currentDept.name}</h2>
              <AsyncWrapper loading={loadingCommunes} error={null}>
                <CommuneTable
                  colors={TENSION_COLORS}
                  communes={communes}
                  showDepartement
                />
              </AsyncWrapper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartementPage;
