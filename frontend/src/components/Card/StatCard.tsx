interface StatCardProps {
  value: string | number | undefined;
  label: string;
  borderColor?: string;
}

const StatCard = ({ value, label, borderColor }: StatCardProps) => {
  return (
    <div className="fr-col-12 fr-col-md-3">
      <div
        className="fr-card fr-card--shadow"
        style={
          borderColor ? { borderTop: `3px solid ${borderColor}` } : undefined
        }
      >
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h2 className="fr-card__title">{value}</h2>
            <p className="fr-card__desc">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
