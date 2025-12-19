import type { ReactNode } from 'react'

type InvoiceCardProps = {
  title: string
  value: string | number
  icon?: ReactNode
}

export default function InvoiceCard({ title, value, icon }: InvoiceCardProps) {
  return (
    <div
      className='
        group relative w-full rounded-2xl border
        bg-white p-5
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
      '
    >
      {/* Icon */}
      {icon && (
        <div
          className='
            absolute -top-4 right-4
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-primary text-white
            shadow-md
          '
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div className={icon ? 'pt-0' : ''}>
        <p className='text-sm font-medium text-muted-foreground'>{title}</p>

        <div className='mt-3 flex items-end gap-1'>
          <span className='text-3xl font-bold text-gray-900'>
            {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
          </span>
        </div>
      </div>

      {/* Accent line */}
      <div
        className='
          absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl
          bg-primary transition-all duration-300
          group-hover:w-full
        '
      />
    </div>
  )
}
