import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface SparklineProps {
  dataValues: number[];
  lineColor?: string;
  fillColor?: string;
  className?: string;
}

export default function Sparkline({
  dataValues,
  lineColor = "#667eea",
  fillColor = "#c2e9fb",
  className,
}: SparklineProps) {
  const data = {
    labels: dataValues.map((_, i) => i + 1),
    datasets: [
      {
        data: dataValues,
        borderColor: lineColor,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className={cn("w-full h-full",className)}>
      <Line data={data} options={options} />
    </div>
  );
}
