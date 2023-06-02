import React, { useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import {MdDownloadDone} from 'react-icons/md'
import {CgNotes} from 'react-icons/cg'
import { useFireBase } from '../utilities/Firebase'


const Notes = ({height, handleNoteHeight}) => {
  const [text, setText] = useState("");

  const firebase = useFireBase();

  const handleSubmit = ()=>{
    firebase.setLoading( prev => !prev);
    if(localStorage.getItem(`${firebase.user.email+"Notes"}`)){
      const stringArr = localStorage.getItem(`${firebase.user.email+"Notes"}`);
      const array = JSON.parse(stringArr);
      array.push(text);
      localStorage.setItem(`${firebase.user.email+"Notes"}`, JSON.stringify(array));
    }else {
      const arr = [text,];
      localStorage.setItem(`${firebase.user.email+"Notes"}`, JSON.stringify(arr));
    }

    firebase.setLoading( prev => !prev);
    setText("");
    handleNoteHeight();
  }


  return (
    <div className={`lg:h-4/5 lg:w-[30%] lg:right-0 bottom-0 ${height === 0 ? "translate-y-0" : "translate-y-full"} w-full h-3/5  absolute transition-all bg-white z-[100] flex flex-col p-4 rounded-t-lg text-black overflow-hidden`}>
        <div className='flex justify-between items-center
        text-3xl'>
            <h1 className='flex space-x-1 items-center justify-center'><CgNotes/><span className='text-xl'>Notes</span></h1>
            <span onClick={handleNoteHeight} className='cursor-pointer absolute right-4 text-[#215BF0]'><RxCross2/></span>
        </div>

        <textarea onChange={(e) =>{setText(e.target.value);}} value={text} name="" id="" cols="30" rows="10" className='mt-4 resize-none outline-none p-2 text-gray-400 overflow-x-scroll' placeholder='Take Notes here....' spellCheck="false"
        ></textarea>

        <button onClick={handleSubmit} className='btn-mn absolute
        right-4 bottom-6 aspect-square p-3 font-bold text-2xl flex justify-center items-center text-white rounded-full' type="submit">
            <MdDownloadDone/>
        </button>
    </div>
  )
}

export default Notes
