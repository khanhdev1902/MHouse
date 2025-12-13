import { type LucideIcon } from 'lucide-react'

type KpiCardProps = {
  title: string
  value: number
  icon: LucideIcon
}

export function KpiCard({ title, value, icon: Icon }: KpiCardProps) {
  const v =
    value >= 1_000_000
      ? `${(value / 1_000_000).toLocaleString('vi-VN')} Tr`
      : value.toLocaleString('vi-VN')

  return (
    <div
      className='px-5 py-2 rounded-3xl border w-full shadow-sm 
      bg-primary text-white hover:scale-105 active:scale-95 duration-300 '
    >
      <p className='text-sm'>{title}</p>
      <div className=' flex justify-between items-center min-h-16'>
        <p className='text-3xl font-bold text-center w-full'>{v}</p>
        <Icon className='w-14 h-12' />
      </div>
    </div>
  )
}
