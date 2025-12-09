import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { cn } from "@/lib/utils";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StackedBarProps {
  className?: string;
  labels?: string[];
  electricity?: number[];
  water?: number[];
  internet?: number[];
}

export default function StackedBarChart({
  className,
  labels = [],
  electricity = [],
  water = [],
  internet = [],
}: StackedBarProps) {
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Điện",
        data: electricity,
        backgroundColor: "#2563EB",
      },
      {
        label: "Nước",
        data: water,
        backgroundColor: "#764ba2",
      },
      {
        label: "Mạng",
        data: internet,
        backgroundColor: "#ec38bc",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            context.dataset.label +
            ": " +
            (context.parsed?.y ?? 0).toLocaleString("vi-VN") +
            "₫",
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return (
    <div className={cn("h-full w-full", className)}>
      <Bar data={data} options={options} />
    </div>
  );
}
