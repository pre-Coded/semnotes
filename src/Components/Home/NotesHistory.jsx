import React from 'react'
import {AiOutlineArrowLeft, AiOutlineDelete, AiFillDelete} from 'react-icons/ai'
import { useState } from 'react'
import { useFireBase } from '../../utilities/Firebase'

const NoteHistory = ({width, handleNoteWidth}) => {
    const firebase = useFireBase();

    const [showAll, setShowAll] = useState(20);

    const handleDelete = () => {

    }

  return (
    <div className={ `lg:w-[30%] absolute h-full w-4/5 backdrop-blur-lg top-0 right-0 p-4 ${width === 0? "translate-x-0" : "translate-x-full"} transition-all z-[100] overflow-hidden` }>
        <div className='w-full flex justify-between items-center border-b-2 pb-4'>
            <h1 className="flex items-center justify-start space-x-3 text-white"><AiOutlineArrowLeft onClick={handleNoteWidth} className='text-white text-2xl cursor-pointer'/><span className='text-xl'>Notes</span></h1>

            <AiFillDelete onClick={()=>{
                localStorage.removeItem(`${firebase.user.email+"Notes"}`);
            }} className='text-3xl text-red-800 brightness-200'/>
        </div>
        <div className='w-full h-[80%] overflow-y-scroll hide-scrollbar relative'>
            <ul className='flex flex-col space-y-3  p-2 text-white w-full h-full'>
                {
                    !localStorage.getItem(`${firebase.user.email+"Notes"}`) ? 
                    <pre className='absolute left-1/2 top-1/2 -translate-x-1/2 -tranlate-y-1/2'>Nothing to show </pre> :
                    JSON.parse(localStorage.getItem(`${firebase.user.email+"Notes"}`)).map((notes)=>{
                        return(
                            <li  id={Date.now()} className='border-b-[2px] border-gray-600 p-2 flex justify-between items-center'>
                                <span className='w-full'>{notes}</span>
                                <AiOutlineDelete onClick={handleDelete} className='text-2xl text-red-600'/>
                            </li>
                        )
                    })
                }
            </ul>
            <div className='h-10 w-full'></div>
        </div>
    </div>
  )
}

export default NoteHistory