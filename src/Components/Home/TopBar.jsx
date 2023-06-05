import React from 'react'
import {BsClockHistory} from 'react-icons/bs'
import {CgNotes} from 'react-icons/cg'

const TopBar = ({handleWidth, handleNoteWidth}) => {
  return (
    <div className='h-20 w-full mt-2 p-4 flex flex-col space-y-11 relative'>

        <div className='flex justify-center items-center relative'>
            <h1 className='text-3xl overflow-hidden'>ExamRescue</h1>
            {/* <div className='text-white flex justify-center items-center space-x-6 text-2xl'>
                <BsClockHistory onClick={handleWidth} className="cursor-pointer"/>
                <CgNotes onClick={handleNoteWidth} className="cursor-pointer"/>
            </div> */}
            <div className='animate-BottomWidth w-full h-[2px] bg-white absolute -bottom-4'></div>
            <div className='animate-TopWidth w-full h-[2px] bg-white absolute -top-4'></div>
            <div className='animate-LeftHeight h-[180%] w-[2px] bg-white absolute left-0'></div>
            <div className='animate-RightHeight  h-[180%] w-[2px] bg-white absolute right-0'></div>
        </div>

    </div>
  )
}

export default TopBar