import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import type { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface MultiLineProps {
  labels?: string[];
  electricity?: number[];
  water?: number[];
  internet?: number[];
}

const RevenueMultiLineChart: FC<MultiLineProps> = ({
  labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
  electricity = [3500000, 4200000, 2800000, 5000000],
  water = [1500000, 1800000, 1200000, 2000000],
  internet = [900000, 900000, 900000, 900000],
}) => {
  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Điện",
        data: electricity,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Nước",
        data: water,
        fill: true,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
      },
      {
        label: "Mạng",
        data: internet,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full h-[350px] p-4 bg-white rounded-xl shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueMultiLineChart;
