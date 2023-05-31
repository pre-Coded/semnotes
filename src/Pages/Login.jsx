import React from 'react'
import {BsMicrosoft, BsGoogle} from 'react-icons/bs'
import {AiFillGithub} from 'react-icons/ai'


const Login = () => {
  return (
    <div className='h-screen w-screen fade-bg flex flex-col justify-center items-center text-white relative'>   
        <form className='p-4 flex flex-col justify-center items-center w-full space-y-4 overflow-hidden'>
            <input className='w-full h-12 p-2 outline-none rounded-lg shadow-white shadow-sm focus:scale-[103%] text-gray-600' placeholder='Email' type="email" name="" id="" />

            <input className='w-full h-12 p-2 outline-none rounded-lg shadow-white shadow-sm focus:scale-[103%] text-gray-600' placeholder='Password' type="password" name="" id="" />

            <input className='px-16 py-4 rounded-lg shadow-lg shadow-blue-900 text-xl button-color' type="submit" value="Log In" />

            <button className='px-20 py-4 rounded-lg shadow-lg shadow-blue-900 text-xl bg-white text-gray-600'>Sign Up</button>
        </form>

        <div className='absolute bottom-6 flex justify-around items-center p-2 space-x-8 text-4xl'>
            <div className='bg-white p-2 rounded-md shadow-sm shadow-white text-black'><BsGoogle/></div>
            <div className='bg-white p-2 rounded-md shadow-sm shadow-white text-black'><BsMicrosoft/></div>
            <div className='bg-white p-2 rounded-md shadow-sm shadow-white text-black'><AiFillGithub/></div>
        </div>
    </div>
  )
}

export default Login 