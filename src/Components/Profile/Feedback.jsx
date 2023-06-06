import React from 'react'
import { useFireBase } from '../../utilities/Firebase'

const Feedback = () => {
    const firebase = useFireBase();


  return (
    <div className='flex flex-col p-2 space-y-3'>
        <div className='flex items-center space-x-2'>
            <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Email :</span>
            <span className='text-sm'>{firebase.user.email ? firebase.user.email : "Not set" }</span>
        </div>
        <textarea name="" id="" cols="30" rows="10"
        className='bg-[#333333] p-2 rounded-md resize-none para-text outline-none main-text' placeholder='Type here...'></textarea>
        <button className='py-3 px-6 bg-[#222222] 
         main-text tracking-wider rounded-md shadow-md'>
            Send
        </button>
    </div>
  )
}

export default Feedback