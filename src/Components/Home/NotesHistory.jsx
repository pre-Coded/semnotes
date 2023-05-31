import React from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const NoteHistory = ({width, handleWidth}) => {
  return (
    <div className={ `lg:w-[30%] absolute h-screen w-4/5 backdrop-blur-lg top-0 right-0 p-4 translate-x-[${width}%] transition-all` }>
        <div className='w-full'>
            <h1 className="flex items-center justify-start space-x-3 text-white border-b-2 pb-4"><AiOutlineArrowLeft onClick={handleWidth} className='text-white text-2xl'/><span className='text-xl'>Notes</span></h1>
        </div>
    </div>
  )
}

export default NoteHistory