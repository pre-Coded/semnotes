import React, {useState, useRef} from 'react'
import {BsMicrosoft, BsGoogle} from 'react-icons/bs'
import {AiFillGithub, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'

const SignUp = () => {
  const navigate = useNavigate();
  const firebase = useFireBase();

  const ref = useRef(null);

  const [eye, setEye] = useState(true);

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await firebase.signUpWithEmailAndPassword(email, pass);
    navigate('/');
  }

  const [block, setBlock] = useState('flex');

  return (
    <div className={`h-screen w-screen fade-bg ${block} flex-col justify-center items-center text-white relative`}>   
        <form onSubmit={handleSubmit} className='p-4 flex flex-col justify-center items-center w-full space-y-4 overflow-hidden'>
            <input  className='w-full h-12 p-2 outline-none rounded-lg shadow-white shadow-sm focus:scale-[103%] text-gray-600' placeholder='Username' type="text" name="" id="" required spellCheck="off"/>

            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='w-full h-12 p-2 outline-none rounded-lg shadow-white shadow-sm focus:scale-[103%] text-gray-600' placeholder='Email' type="email" name="" id="" required spellCheck="off"/>

            <div ref = {ref} className='w-full h-12 p-2 focus:scale-[103%] shadow-sm rounded-lg flex justify-between items-center bg-white'>
              <input onChange={(e)=>{setPass(e.target.value)}} value={pass} className='w-full h-full outline-none bg-transparent  text-gray-600' placeholder='Password' type="password" name="" id="" required spellCheck="off"/>
              {
                eye ? <AiFillEye className='text-gray-400 text-3xl'  onClick={()=>{
                  setEye(prev => !prev);
                  ref.current.children[0].type = "text";
                }}/> : <AiFillEyeInvisible className='text-gray-400 text-3xl' onClick={()=>{
                  setEye(prev => !prev);
                  ref.current.children[0].type = "password";
                }}/>
              }
            </div>

            <input className='px-16 py-4 rounded-lg shadow-lg shadow-blue-900 text-xl button-color' type="submit" value="Sign Up" />

        </form>
        <button className='px-16 py-4 rounded-lg shadow-lg shadow-blue-900 text-xl bg-white text-gray-600' onClick={()=>{ 
              if(block === 'flex') setBlock('hidden');
              else setBlock('flex');
              navigate("/login")
            }}>Already a user ?</button>

        <div className='absolute bottom-6 flex justify-around items-center p-2 space-x-8 text-4xl'>
            <div onClick={firebase.signInWithGoogle} className='bg-white p-2 rounded-md shadow-sm shadow-white text-black'><BsGoogle/></div>
            <div className='bg-white p-2 rounded-md shadow-sm shadow-white text-black'><BsMicrosoft/></div>
            <div className='bg-white p-2 rounded-md shadow-sm shadow-white text-black'><AiFillGithub/></div>
        </div>
    </div>
  )
}

export default SignUp 