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

const createGradient = (ctx: CanvasRenderingContext2D, color1: string, color2: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

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
        backgroundColor: (ctx) =>
          createGradient(ctx.chart.ctx, "#89216b", "#3B82F6"),
        borderRadius: 10,
        barThickness: 28,
      },
      {
        label: "Nước",
        data: water,
        backgroundColor: (ctx) =>
          createGradient(ctx.chart.ctx, "#006AB2", "#7303c0"),
        borderRadius: 10,
        barThickness: 28,
      },
      {
        label: "Internet",
        data: internet,
        backgroundColor: (ctx) =>
          createGradient(ctx.chart.ctx, "#667eea", "#89f7fe"),
        borderRadius: 10,
        barThickness: 28,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          padding: 20,
          font: {
            size: 12,
            weight: 'bolder',
          },
        },
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#E5E7EB",
        bodyColor: "#E5E7EB",
        padding: 14,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed?.y ?? 0;
            return `${ctx.dataset.label}: ${value.toLocaleString("vi-VN")}₫`;
          },
          footer: (items) => {
            const total = items.reduce(
              (sum, item) => sum + (item.parsed?.y ?? 0),
              0
            );
            return `Tổng: ${total.toLocaleString("vi-VN")}₫`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          font: { size: 12, weight: 'lighter' },
          color: "#6f86d6",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.06)",
          // drawBorder: false,
        },
        ticks: {
          callback: (value) =>
            Number(value).toLocaleString("vi-VN") + "₫",
          font: { size: 11 },
          color: "#89216b",
        },
      },
    },
  };

  return (
    <div
      className={cn(
        "h-full w-full rounded-xl bg-white p-5 shadow-md border",
        className
      )}
    >
      <Bar data={data} options={options} />
    </div>
  );
}
