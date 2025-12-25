export default function Loading() {
  return (
    <div className='w-full h-full sm:mt-52 flex justify-center items-center'>
      <div className='flex-col gap-4 w-full flex items-center justify-center'>
        <div className='w-20 h-20 border-4 border-transparent text-main text-4xl animate-spin flex items-center justify-center border-t-main rounded-full'>
          <div className='w-16 h-16 border-4 border-transparent text-[#00b09b] text-2xl animate-spin flex items-center justify-center border-t-[#00b09b] rounded-full'></div>
        </div>
      </div>
    </div>
  )
}
