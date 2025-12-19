import { ChevronRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const pathNames = {
  '': 'Trang chủ',
  statistic: 'Thống kê',
  service: 'Dịch vụ',
  room: 'Phòng',
  invoice: 'Hóa đơn',
  groupchat: 'Trò chuyện',
  contract: 'Hợp đồng',
  user: 'Người dùng',
} as const

type PathKey = keyof typeof pathNames

export default function Breadcrumb() {
  const location = useLocation().pathname
  const key = location.split('/')[1] as PathKey
  const navigate = useNavigate()
  console.log(location)
  return (
    <div className=' text-textmain font-bold flex flex-row items-center p-2 cursor-pointer select-none w-full'>
      <span onClick={() => navigate('/')} className=' hover:underline'>
        Trang chủ
      </span>
      {key !== '' && (
        <div className='flex flex-row items-center'>
          <ChevronRight size={19}/>
          <span className=' hover:underline'>{pathNames[key]}</span>
        </div>
      )}
    </div>
  )
}
