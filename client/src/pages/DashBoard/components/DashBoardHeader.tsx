import { Button } from '@/components/ui/button'
import React from 'react'

export default function DashBoardHeader() {
  return (
    <div className='flex flex-row justify-end gap-2'>
      <Button variant={'outline'} className='rounded-full hover:scale-105 active:scale-95 duration-300'>
        Tạo hợp đồng
      </Button>
      <Button variant={'outline'} className='rounded-full hover:scale-105 active:scale-95 duration-300'>
        Tạo phòng
      </Button>
    </div>
  )
}
