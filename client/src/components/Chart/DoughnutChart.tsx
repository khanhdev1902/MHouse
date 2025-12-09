import { cn } from "@/lib/utils";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

interface RevenueDoughnutProps {
  dataValues?: number[];
  labels?: string[];
  className?: string;
}

export default function DoughnutChart({
  className,
  dataValues = [],
  labels = [],
}: RevenueDoughnutProps) {
  const data: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["#764ba2", "#3f2b96", "#3f5efb", "#ff070b"],
        hoverBackgroundColor: ["#dd1818", "#0575e6", "#fc4a1a"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "55%",
    plugins: {
      tooltip: { enabled: true },
      legend: {
        position: "right",
        labels: {
          // usePointStyle: true,
          // pointStyle:"circle",
          padding: 40,
          font: { size: 16, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
