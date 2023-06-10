import React, { useState, useRef } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlankPhoto from '../assets/blankProfile.png';

const SignUp = () => {
  const navigate = useNavigate();

  const ref = useRef(null);

  const [eye, setEye] = useState(true);

  const firebase = useFireBase();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  const [emailLabel, setEmailLabel] = useState(false);
  const [passLabel, setPassLabel] = useState(false);
  const [sem , setSem] = useState("");
  const [branch, setBranch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try
    {
      await firebase.signUpWithEmailAndPassword(email, pass, branch, sem);
    }
    catch(e)
    {
      firebase.setLoading(prev => !prev);
      toast.error("User already exists");
    }
    
  }

  const sems = [1, 2, 3, 4, 5, 6, 7, 8];
  const branches = ["Information Technology"]

  return (
    <div className='flex items-center justify-center h-screen w-screen bg-black' >
      <ToastContainer />

      <div className={`h-full w-full bg-transparent relative overflow-hidden flex flex-col justify-center items-center md:flex-row md:w-[90%] md:h-[50%] lg:w-[60%] lg:h-[60%] 
      bg-black rounded-md shadow-md md:border-2 md:border-[#222222]`}>

        <div className='flex-[1] md:border-r-2 md:border-[#222222] h-full relative w-full flex flex-col justify-end items-center md:justify-center'>
          <span className='para-text text-xl'>Take the Next Step</span>
          <span className='main-text text-2xl'>Register</span>
        </div>

        <form onSubmit={handleSubmit} className='flex-[2] md:flex-[1] h-full flex flex-col justify-center items-center w-full relative space-y-2'>

          <div className='w-[90%] h-14 p-2 flex justify-start items-center bg-main rounded-md shadow-md relative'>
            <label for="email" className={`text-white absolute left-2 bg-transparent ${emailLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Email</label>
            <input
              onChange={(e) => {
                if (e.target.value !== "" && emailLabel === false) setEmailLabel(prev => !prev);
                setEmail(e.target.value);
                if (e.target.value === "" && emailLabel === true) setEmailLabel(prev => !prev);
              }}
              value={email} className='w-full h-full bg-transparent outline-none text-sm main-text' type="email" name="" id="email" required spellCheck="off" placeholder='Email' />
          </div>

          <div ref={ref} className='w-[90%] h-14 p-2 flex justify-between items-center relative bg-main rounded-md shadow-md'>
            <label for="pass" className={`text-white absolute left-2 bg-transparent ${passLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Password</label>
            <input onChange={(e) => {
              if (e.target.value !== "" && passLabel === false) setPassLabel(prev => !prev);
              setPass(e.target.value);
              if (e.target.value === "" && passLabel === true) setPassLabel(prev => !prev);
            }} value={pass} className='w-full h-full outline-none bg-transparent text-sm text-white' placeholder='Password' type="password" name="" id="pass" required spellCheck="off" />
            {
              eye ? <AiFillEyeInvisible className='para-text text-3xl' onClick={() => {
                setEye(prev => !prev);
                ref.current.children[1].type = "text";
              }} /> : <AiFillEye className='para-text text-3xl' onClick={() => {
                setEye(prev => !prev);
                ref.current.children[1].type = "password";
              }} />
            }
          </div>

          <div className='w-[90%] h-14 relative flex justify-center items-center bg-main rounded-md shadow-md para-text overflow-hidden'>
            <div>{sem === "" ? "Select Semester" : "Semester " + sem}</div>
            <select onChange={(e) => {
              setSem(e.target.value);
            }} className='h-full w-full outline-none text-white bg-transparent absolute opacity-0' name="sem" required>
              <option className='' defaultValue={"Select Semester"}>Select Semester</option>
              {
                sems.map((sem) => {
                  return (
                    <option value={sem}>Sem {sem}</option>
                  )
                })
              }
            </select>
          </div>

          <div className='w-[90%] h-14 relative flex justify-center items-center bg-main rounded-md shadow-md para-text overflow-hidden'>
            <div>{branch === "" ? "Select Branch" : branch}</div>
            <select onChange={(e) => {
              setBranch(e.target.value);
            }} className='h-full w-full outline-none text-white bg-transparent absolute opacity-0 ' name='branch' required>
              <option className='' defaultValue={"Select Branch"}>Select Branch</option>
              {
                branches.map((branch) => {
                  return (
                    <option value={branch}>{branch}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='para-text text-sm py-2'>Already a user?<span onClick={() => {
            navigate('/')
          }} className='link'>{"  "}Log In</span></div>
          <input className='tracking-wider py-4 px-24 bg-btn-primary rounded-md shadow-md text-xl button-color main-text' type="submit" value="Register" />
        </form>
      </div>


    </div>
  )
}

export default SignUp 