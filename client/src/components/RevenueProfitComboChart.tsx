import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import type { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ComboProps {
  labels?: string[];
  revenue?: number[];
  profit?: number[];
}

const RevenueProfitComboChart: FC<ComboProps> = ({
  labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
  revenue = [35000000, 42000000, 28000000, 50000000],
  profit = [12000000, 15000000, 8000000, 20000000],
}) => {
  const data: ChartData<"bar" | "line"> = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Doanh thu",
        data: revenue,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        type: "line" as const,
        label: "Lợi nhuận",
        data: profit,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            context.dataset.label +
            ": " +
            // context.parsed.y.toLocaleString("vi-VN") +
            "₫",
        },
      },
    },
    scales: {
      x: { stacked: false },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full h-[350px] p-4 bg-white rounded-xl shadow-lg">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default RevenueProfitComboChart;
