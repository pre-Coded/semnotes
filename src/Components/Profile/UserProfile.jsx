import React from 'react'
import { CgProfile } from 'react-icons/cg'

const UserProfile = () => {
  return (
    <div className='h-full w-full p-4 text-white text-s'>
        <div className='flex justify-start items-center'>
            <div className='text-6xl p-4 text-white'><CgProfile/></div>
            <button className='border-[1px] p-[6px] rounded-md bg-white text-black px-4'>Edit Account</button>
        </div>
    </div>
  )
}

export default UserProfile