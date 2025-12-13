type InvoiceCardProps = {
  title: string
  value: string | number
}
export default function InvoiceCard({
  title,
  value,
}: InvoiceCardProps) {
  return (
    <div className=' relative rounded-xl shadow-lg hover:scale-110 duration-300 w-full min-h-32 border'>
      <div className=' absolute top-0 left-0 w-full text-center p-2 font-semibold'>{title}</div>
      <div className='w-full min-h-32 flex items-center justify-center font-bold text-2xl'>
        {value.toLocaleString('vi-VN')}
      </div>
    </div>
  )
}
