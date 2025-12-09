"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, laptop: 162 },
  { month: "February", desktop: 305, mobile: 200, laptop: 171 },
  { month: "March", desktop: 237, mobile: 120, laptop: 136 },
  { month: "April", desktop: 73, mobile: 190, laptop: 113 },
  { month: "May", desktop: 209, mobile: 130, laptop: 228 },
  { month: "June", desktop: 214, mobile: 140, laptop: 118 },
  { month: "July", desktop: 148, mobile: 216, laptop: 105 },
  { month: "August", desktop: 299, mobile: 91, laptop: 100 },
  { month: "September", desktop: 126, mobile: 196, laptop: 236 },
  { month: "October", desktop: 244, mobile: 134, laptop: 153 },
  { month: "November", desktop: 111, mobile: 167, laptop: 277 },
  { month: "December", desktop: 350, mobile: 198, laptop: 206 }
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  laptop: {
    label: "Laptop",
    color: "#764ba2",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        <Bar dataKey="laptop" fill="var(--color-laptop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
