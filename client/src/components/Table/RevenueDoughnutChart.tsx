import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import type { FC } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
  labels?: string[];
  dataValues?: number[];
  colors?: string[];
}

const RevenueDoughnutChart: FC<DoughnutProps> = ({
  labels = ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C"],
  dataValues = [35000000, 42000000, 28000000],
  colors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(255, 99, 132, 0.8)",
  ],
}) => {
  const data: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 14, weight: "bold" } },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            context.label + ": " + context.parsed.toLocaleString("vi-VN") + "₫",
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] p-4 bg-white rounded-xl shadow-lg">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default RevenueDoughnutChart;
