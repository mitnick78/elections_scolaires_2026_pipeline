import type { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Stats } from "../../types";

interface BarChartProps {
  stats: Stats;
}

const couleurs = ["#e1000f", "#e67e22", "#18753c", "#0063cb"];

const TensionBarChart: FC<BarChartProps> = ({ stats }) => {
  const data = [
    { name: "Forte tension", value: stats.highTension },
    { name: "Tension modérée", value: stats.moderateTension },
    { name: "Normal", value: stats.normal },
    { name: "Sous-capacité", value: stats.underCapacity },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={0}
          textAnchor="middle"
          tick={{ fontSize: 12 }}
          interval={0}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number | undefined) => [
            `${value ?? 0} communes`,
            "Nombre",
          ]}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={couleurs[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TensionBarChart;
