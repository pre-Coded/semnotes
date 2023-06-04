import React, {useState, useRef} from 'react'
import {FcGoogle} from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'

const Login = () => {
  const navigate = useNavigate();

  const ref = useRef(null);

  const [eye, setEye] = useState(true);

  const firebase = useFireBase();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [block, setBlock] = useState('flex');

  const [emailLabel, setEmailLabel] = useState(false);
  const [passLabel, setPassLabel] = useState(false);



  return (
    <div className={`h-screen w-screen bg-black ${block}text-white relative overflow-hidden flex flex-col justify-center items-center`}>
        
        <div className='relative mt-20 w-full flex justify-center items-center'>
            <h1 className='text-3xl text-white flex flex-col justify-center'><span className='italic'>Welcome</span>
                      <span className='text-xl'>Let's Get you logged in to</span>
                      <span className='font-bold mt-2'><div>ExamRescue</div></span>
                      <div className='w-full animate-width bg-white h-[2px] mt-2 relative'>
                        <div className='bg-white rotate-[30deg] h-[2px] w-[10%] absolute right-0 origin-[100%_50%]'></div>
                        <div className='bg-white rotate-[-30deg] h-[2px] w-[10%] absolute right-0 origin-[100%_50%]'></div>
                      </div>
            </h1>
        </div>

        <form onSubmit={(e)=>{
          e.preventDefault();
          firebase.signInUser(email,pass);
        }} className='h-full flex flex-col justify-center items-center w-full space-y-4 relative'>

              <div className='w-[90%] h-14 p-2 flex justify-start items-center relative border-[1px] border-white'>
                <label for="email" className={`text-white absolute left-2 bg-black ${emailLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Email</label>
                <input 
                // onFocus={(e)=>{
                //   if(e.target.value === "") setEmailLabel(prev => !prev);
                // }}
                onChange={(e)=>{
                  if(e.target.value !== "" && emailLabel === false)setEmailLabel(prev => !prev);
                  setEmail(e.target.value);
                  if(e.target.value === "" && emailLabel === true) setEmailLabel(prev => !prev);
                }} 
                value={email} className='w-full h-full bg-black outline-none text-white text-sm' type="email" name="" id="email" required spellCheck="off" placeholder='Email'/>
              </div>

            <div ref = {ref} className='w-[90%] h-14 p-2 flex justify-between items-center border-[1px] border-white relative'>
              <label for="pass" className={`text-white absolute left-2 bg-black ${passLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Password</label>
              <input onChange={(e)=>{
                  if(e.target.value !== "" && passLabel === false) setPassLabel(prev => !prev);
                  setPass(e.target.value);
                  if(e.target.value === "" && passLabel === true) setPassLabel(prev => !prev);
                }}value={pass} className='w-full h-full outline-none bg-transparent text-sm text-white' placeholder='Password' type="password" name="" id="pass" required spellCheck="off"/>
              {
                eye ? <AiFillEyeInvisible className='text-white text-3xl'  onClick={()=>{
                  setEye(prev => !prev);
                  ref.current.children[1].type = "text";
                }}/> : <AiFillEye className='text-white text-3xl' onClick={()=>{
                  setEye(prev => !prev);
                  ref.current.children[1].type = "password";
                }}/>
              }
            </div>
            
            <div className='text-gray-400 text-sm py-2'>New Here?<span onClick={()=>{
              navigate('/signup')
            }} className='text-white border-b-[2px] pb-[2px]'>{" "}Register</span></div>
            <input className='py-4 px-24 bg-white text-xl button-color' type="submit" value="Log In"/>
        </form>

    </div>
  )
}

export default Login 