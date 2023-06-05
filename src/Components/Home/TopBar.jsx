import React from 'react'

const TopBar = () => {
  return (
    <div className='h-20 w-full absolute top-0 mt-2 p-4 flex flex-col items-center justify-center'>
        <div className='h-full w-full flex justify-center items-center relative'>
            <h1 className='text-3xl overflow-hidden'>ExamRescue</h1>
            <div className='animate-BottomWidth w-0 h-[2px] bg-[#FF5F1F] absolute -bottom-4 left-0'></div>
            <div className='animate-TopWidth w-0 h-[2px] bg-[#FF5F1F] absolute -top-4 right-0'></div>
            <div className='h-full w-[2px] bg-[#FF5F1F] absolute left-0 top-0'></div>
            <div className='h-full w-[2px] bg-[#FF5F1F] absolute right-0 bottom-0'></div>
        </div>

    </div>
  )
}

export default TopBar