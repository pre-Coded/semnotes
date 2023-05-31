import React from 'react'
import {BsClockHistory} from 'react-icons/bs'
import {CgNotes} from 'react-icons/cg'

const TopBar = ({handleWidth}) => {
  return (
    <div className='h-20 w-full p-4 flex flex-col space-y-11 relative'>

        <div className='flex justify-between items-center relative'>
            <h1 className=' text-3xl italic text-red-200 overflow-hidden'>semNotes</h1>

            <div className='text-white flex justify-center items-center space-x-6 text-2xl'>
                <BsClockHistory onClick={handleWidth} className="cursor-pointer"/>
                <CgNotes/>
            </div>
            <div className='w-full h-[2px] bg-white absolute -bottom-6'></div>
        </div>

    </div>
  )
}

export default TopBar