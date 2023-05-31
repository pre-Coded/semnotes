import React from 'react'
import { CgProfile } from 'react-icons/cg'
import {AiFillGoogleCircle,AiFillInstagram, AiFillTwitterCircle} from 'react-icons/ai'
import { useFireBase } from '../../utilities/Firebase'

const UserProfile = () => {
    const firebase = useFireBase();
    
  return (
    <div className='h-full w-full p-4 text-white text-s flex flex-col'>
        <div className='flex justify-start items-center'>
            <div className='text-6xl p-4 text-white'><CgProfile/></div>
            <h1>{firebase.user.email}</h1>
        </div>
        <button onClick={firebase.handleSignOut} className='border-[1px] mt-4 p-3 rounded-md bg-white text-black px-4'>Log Out</button>

        <div className='flex flex-col mt-8 p-2 border-t-2'>
            <ul className='p-2 text-xl'>
                <li className='border-b-2 p-2'>Account Information</li>
                <li className='border-b-2 p-2'>About Us</li>
                <li className='border-b-2 p-2'>Follow us on<br/>
                <div className='flex justify-start mt-4 text-4xl items-center space-x-4'>
                <AiFillGoogleCircle className='hover:bg-green-400 rounded-full shadow-lg'/>
                <AiFillInstagram className='hover:bg-red-400 rounded-full shadow-lg'/>
                <AiFillTwitterCircle className='hover:bg-blue-400 rounded-full shadow-lg'/>
                </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default UserProfile