// import { Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   type ChartOptions,
//   type ChartData,
// } from 'chart.js'
// import { cn } from '@/lib/utils'
// import { useMemo, useRef } from 'react'

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

// interface SparklineProps {
//   dataValues: number[]
//   lineColor?: string
//   className?: string
// }

// export default function Sparkline({
//   dataValues,
//   lineColor = '#4f46e5',
//   className,
// }: SparklineProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)

//   const data: ChartData<'line'> = useMemo(() => {
//     let gradient: CanvasGradient | string = 'rgba(79,70,229,0.2)'

//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext('2d')
//       if (ctx) {
//         gradient = ctx.createLinearGradient(0, 0, 0, 80)
//         gradient.addColorStop(0, 'rgba(79,70,229,0.35)')
//         gradient.addColorStop(1, 'rgba(79,70,229,0)')
//       }
//     }

//     return {
//       labels: dataValues.map((_, i) => i + 1),
//       datasets: [
//         {
//           data: dataValues,
//           borderColor: lineColor,
//           backgroundColor: gradient,
//           fill: true,
//           tension: 0.45,
//           pointRadius: 0,
//           borderWidth: 2,
//         },
//       ],
//     }
//   }, [dataValues, lineColor])

//   const options: ChartOptions<'line'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//     scales: {
//       x: { display: false },
//       y: { display: false },
//     },
//   }

//   return (
//     <div className={cn('h-16 w-full', className)}>
//       <Line ref={canvasRef} data={data} options={options} />
//     </div>
//   )
// }
