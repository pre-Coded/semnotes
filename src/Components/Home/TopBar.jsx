import React from 'react'

const TopBar = () => {
  return (
    <div className='h-20 w-[90%] absolute top-2 mt-2
    p-2 flex flex-col items-center justify-center lg:hidden'>
        <div className='h-full w-full flex justify-center items-center relative rounded-md shadow-2xl'>
            <h1 className='text-3xl overflow-hidden '>ExamRescue</h1>   
            <div className='h-[2px] w-[27%] bg-[#00BFFF] absolute left-0 rounded-xl top-0'></div>
            <div className='h-full w-[2px] bg-[#0080FF] absolute left-0 rounded-xl top-0'></div>
            <div className='h-full w-[2px] bg-[#FF5F1F] absolute rounded-xl right-0 bottom-0'></div>
            <div className='h-[2px] w-[27%] bg-[#FF5F1F] absolute rounded-xl right-0 bottom-0'></div>
        </div>
    </div>
  )
}

// #00BFFF
// #0080FF

export default TopBar