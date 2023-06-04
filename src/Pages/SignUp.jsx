import React, {useState, useRef} from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'

const SignUp = () => {
  const navigate = useNavigate();

  const ref = useRef(null);

  const [eye, setEye] = useState(true);

  const firebase = useFireBase();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  const [emailLabel, setEmailLabel] = useState(false);
  const [passLabel, setPassLabel] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    firebase.signUpWithEmailAndPassword(email,pass);
  }

  const [block, setBlock] = useState('flex');

  const sems = [1,2,3,4,5,6,7,8];
  const branches = ["Information Technology"]

  return (
    <div className={`h-screen w-screen bg-black ${block}text-white relative overflow-hidden flex flex-col justify-center items-center`}>   
    
        <form onSubmit={handleSubmit} className='h-full flex flex-col justify-center items-center w-full space-y-4 relative'>
              <div className='text-3xl text-white self-start pl-6 flex relative'>Registere Here
              <div className='flex space-x-1 absolute bottom-2 -right-8'>
                <span className='h-1 aspect-square rounded-full animate-first bg-white'></span>
                <span className='h-1 aspect-square rounded-full animate-second bg-white'></span>
                <span className='h-1 aspect-square rounded-full animate-third bg-white'></span>
                <span className='h-1 aspect-square rounded-full animate-fourth bg-white'></span>
              </div>
              </div>
              <div className='w-[90%] h-14 p-2 flex justify-start items-center relative border-[1px] border-white'>
                <label for="email" className={`text-white absolute left-2 bg-black ${emailLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Email</label>
                <input 
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

            <div className='w-[90%] h-14 relative flex justify-center items-center bg-black text-white border-[1px]'>
              <div>{firebase.detailsOfUser.sem === "" ? "Select Semester" : "Semester "+firebase.detailsOfUser.sem}</div>
              <select onChange={(e)=>{
                firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value});
              }} className='h-full outline-none text-white bg-transparent absolute opacity-0' name="sem" required>
                <option className='' defaultValue={"Select Semester"}>Select Semester</option>
                {
                  sems.map((sem)=>{
                    return (
                      <option value={sem}>Sem {sem}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className='w-[90%] h-14 relative flex justify-center items-center bg-black text-white border-[1px]'>
              <div>{firebase.detailsOfUser.branch === "" ? "Select Branch" : firebase.detailsOfUser.branch}</div>
              <select onChange={(e)=>{
                firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value})
              }} className='h-full outline-none text-white bg-transparent absolute opacity-0 ' name='branch' required>
                <option className='' defaultValue={"Select Branch"}>Select Branch</option>
                {
                  branches.map((branch)=>{
                    return (
                      <option value={branch}>{branch}</option>
                    )
                  })
                }
              </select>
            </div>
            
            <div className='text-gray-400 text-sm py-2'>Already a user?<span onClick={()=>{
              navigate('/')
                      }} className='text-white border-b-[2px] pb-[2px]'>{"  "}Log In</span></div>
            <input className='py-4 px-24 bg-white text-xl button-color' type="submit" value="Register"/>
        </form>
    </div>
  )
}

export default SignUp 