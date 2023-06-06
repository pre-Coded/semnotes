import React from 'react'
import { useFireBase } from '../../utilities/Firebase'

const AccountInfo = () => {
    const firebase = useFireBase();


  return (
    <div className='flex flex-col p-2 space-y-3'>
        <div className='flex items-center space-x-2'>
            <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Username :</span>
            <span className='text-sm'>{firebase.detailsOfUser.username ? firebase.detailsOfUser.username : "Not set" }</span>
        </div>
        <div className='flex items-center space-x-2'>
            <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Email :</span>
            <span className='text-sm'>{firebase.user.email ? firebase.user.email : "Not set" }</span>
        </div>
        <div className='flex items-center space-x-2'>
            <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Branch :</span>
            <span className='text-sm'>{firebase.detailsOfUser.branch ? firebase.detailsOfUser.branch : "Not set" }</span>
        </div>

        <div className='flex items-center space-x-2'>
            <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Semester :</span>
            <span className='text-sm'>{firebase.detailsOfUser.sem ? firebase.detailsOfUser.sem : "Not set" }</span>
        </div>
    </div>
  )
}

export default AccountInfo
