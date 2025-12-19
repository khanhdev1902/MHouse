import React from 'react'
import { cn } from '@/lib/utils'

interface StatisticCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  className?: string
}

export default function StatisticCard({ title, value, icon, className }: StatisticCardProps) {
  return (
    <div
      className={cn(
        `
        bg-primary rounded-2xl px-5 py-4
        border shadow-sm
        transition-all duration-300
        hover:shadow-md hover:-translate-y-5 text-white
        `,
        className
      )}
    >
      {/* Header */}
      <div className='flex justify-between'>
        <span className='text-sm font-medium text-white-foreground'>{title}</span>
        <div
          className=' w-14 h-14 rounded-full
          flex items-center justify-center bg-primary text-white font-bold'
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className='text-2xl font-bold tracking-tight'>
        {typeof value === 'number' && value > 1000 ? value.toLocaleString('vi-VN') + '₫' : value}
      </div>
    </div>
  )
}
