import { type LucideIcon } from 'lucide-react'

type KpiCardProps = {
  title: string
  value: number
  icon: LucideIcon
}

export function KpiCard({ title, value, icon: Icon }: KpiCardProps) {
  const formattedValue =
    value >= 1_000_000
      ? `${(value / 1_000_000).toLocaleString('vi-VN')} Tr`
      : value.toLocaleString('vi-VN')

  return (
    <div
      className='
    relative flex flex-col justify-between p-5 rounded-2xl
    bg-primary shadow-lg hover:shadow-2xl
    transition-all duration-300 transform hover:-translate-y-1
    text-white w-full
    '
    >
      {/* Title */}
      <p className='text-sm font-medium opacity-80'>{title}</p>

      {/* Value + Icon */}
      <div className='flex items-center justify-between mt-2'>
        <p className='text-3xl font-bold'>{formattedValue}</p>
        <div className='p-3 bg-white/20 rounded-xl flex items-center justify-center'>
          <Icon className='w-10 h-10 text-white' />
        </div>
      </div>

      {/* Optional underline gradient */}
      <div className='absolute bottom-0 left-0 w-full h-1 rounded-full bg-white/30' />
    </div>
  )
}
