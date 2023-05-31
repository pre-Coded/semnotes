import React from 'react'
import {RxCross2} from 'react-icons/rx'
import {MdDownloadDone} from 'react-icons/md'
import {CgNotes} from 'react-icons/cg'


const Notes = ({height, handleNoteHeight}) => {
  return (
    <div className={`lg:h-4/5 lg:w-[30%] lg:right-0 bottom-0 ${height === 0 ? "translate-y-0" : "translate-y-full"} w-full h-3/5  absolute transition-all bg-white z-[100] flex flex-col p-4 rounded-t-lg text-black overflow-hidden`}>
        <div className='flex justify-between items-center
        text-3xl'>
            <h1 className='flex space-x-1 items-center justify-center'><CgNotes/><span className='text-xl'>Notes</span></h1>
            <span onClick={handleNoteHeight} className='cursor-pointer absolute right-4 text-[#215BF0]'><RxCross2/></span>
        </div>

        <textarea name="" id="" cols="30" rows="10" className='mt-4 resize-none outline-none p-2 text-gray-400 overflow-x-scroll' placeholder='Take Notes here....' spellCheck="false"
        ></textarea>

        <button className='button-color absolute
        right-4 bottom-6 aspect-square p-3 font-bold text-2xl flex justify-center items-center text-white rounded-full' type="submit">
            <MdDownloadDone/>
        </button>
    </div>
  )
}

export default Notes
