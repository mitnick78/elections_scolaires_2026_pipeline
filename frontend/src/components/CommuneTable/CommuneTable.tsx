interface CommuneData {
  name: string;
  department?: string;
  studentClassRatio: number;
  schoolCount: number;
  communeType: string;
  tensionLevel: string;
}

interface CommuneTableProps {
  communes: CommuneData[];
  colors: Record<string, string>;
  showRang?: boolean;
  showDepartement?: boolean;
}

const CommuneTable = ({
  communes,
  colors,
  showRang = false,
  showDepartement = false,
}: CommuneTableProps) => {
  return (
    <div className="fr-table fr-table--bordered">
      <table>
        <thead>
          <tr>
            {showRang && <th>Rang</th>}
            <th>Commune</th>
            {showDepartement && <th>Département</th>}
            <th>Ratio élèves/classe</th>
            <th>Nb écoles</th>
            <th>Type</th>
            <th>Niveau</th>
          </tr>
        </thead>
        <tbody>
          {communes.map((commune, index) => (
            <tr key={index}>
              {showRang && (
                <td>
                  <strong>#{index + 1}</strong>
                </td>
              )}
              <td>{commune.name}</td>
              {showDepartement && <td>{commune.department}</td>}
              <td>
                <strong style={{ color: colors[commune.tensionLevel] }}>
                  {commune.studentClassRatio.toFixed(1)}
                </strong>
              </td>
              <td>{commune.schoolCount}</td>
              <td>{commune.communeType}</td>
              <td>
                <span style={{ color: colors[commune.tensionLevel] }}>
                  {commune.tensionLevel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommuneTable;
