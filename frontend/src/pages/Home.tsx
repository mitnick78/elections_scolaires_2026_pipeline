import type { FC } from "react";
import { useStats, useTop10 } from "../hooks/useCommunes";
import TensionBarChart from "../components/Charts/BarChart";
import CommuneTable from "../components/CommuneTable/CommuneTable";
import { TENSION_COLORS } from "../constants/tensionColors";
import StatCard from "../components/Card/StatCard";

const Home: FC = () => {
  const { stats, loading, error } = useStats();
  const { top10, loading: loadingTop10 } = useTop10();

  if (loading) return <p className="fr-text">Chargement...</p>;
  if (error) return <p className="fr-text">{error}</p>;

  return (
    <div>
      {/* Titre */}
      <div className="fr-mb-4w">
        <h1 className="fr-h1 fr-grid-row fr-grid-row--center">
          Tensions Scolaires 2026
        </h1>
        <p className="fr-text--lead">
          Analyse des communes françaises en tension scolaire à l'approche des
          élections municipales 2026.
        </p>
      </div>

      {/* Stats nationales */}
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-4w">
        <StatCard value={stats?.totalCommunes} label="Communes analysées" />
        <StatCard value={stats?.averageRatio} label="Ratio moyen national" />

        <StatCard
          value={stats?.highTension}
          label="Communes en forte tension"
          borderColor="#e1000f"
        />

        <StatCard
          value={stats?.moderateTension}
          label="Communes en tension modérée"
          borderColor="#e67e22"
        />
      </div>

      {/* Graphique */}
      {stats && (
        <div className="fr-mb-4w">
          <h2 className="fr-h2 fr-grid-row fr-grid-row--center">
            Répartition des communes par niveau de tension
          </h2>
          <TensionBarChart stats={stats} />
        </div>
      )}

      {/* Top 10 */}
      <div className="fr-mb-4w">
        <h2 className="fr-h2 fr-grid-row fr-grid-row--center">
          Top 10 communes les plus en tension
        </h2>
        {loadingTop10 ? (
          <p>Chargement...</p>
        ) : (
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-8">
              <CommuneTable colors={TENSION_COLORS} communes={top10} showRang />
            </div>
          </div>
        )}
      </div>
      {/* Limites méthodologiques */}
      <div className="fr-notice fr-notice--info fr-mt-4w">
        <div className="fr-container">
          <div className="fr-notice__body">
            <p className="fr-notice__title">Limites méthodologiques</p>
            <p className="fr-notice__desc">
              Les élèves <strong>ULIS</strong> (Unités Localisées pour
              l'Inclusion Scolaire) et
              <strong> UEEA</strong> (Unités d'Enseignement Élémentaire Autisme)
              sont inclus dans le calcul du ratio, ce qui peut légèrement
              minorer la tension réelle dans certaines communes. Les zones{" "}
              <strong>REP/REP+</strong> (Réseaux d'Éducation Prioritaire) ne
              sont pas analysées séparément. Le géocodage couvre{" "}
              <strong>87% des communes</strong> — les 13% restants ne sont pas
              affichés sur la carte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
