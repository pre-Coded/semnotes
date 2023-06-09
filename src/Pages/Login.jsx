import React, { useState, useRef } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validator.isEmail(email)) {
      return toast.error('Please enter valid email.');
    }

    if (validator.isEmpty(pass)) {
      return toast.error('Please enter valid password.');
    }


    firebase.setLoading(prev => !prev);
    try{
      const user = await firebase.signInUser(email, pass);
      firebase.setUser(user);
      navigate('/');
    }catch(e){
      toast.error("Email or password is incorrect.");
      console.log(e);
    }
    firebase.setLoading(prev => !prev);
  }

  return (
    <div className='flex items-center justify-center h-screen w-screen bg-black' >
      <ToastContainer />

      <div className={`h-full w-full bg-transparent relative overflow-hidden flex flex-col justify-center items-center md:flex-row md:w-[90%] md:h-[50%] lg:w-[60%] lg:h-[60%] 
      bg-black rounded-md shadow-md md:border-2 md:border-[#222222]`}>

        <div className='flex-[1] md:border-r-2 md:border-[#222222] h-full relative w-full flex justify-center items-end md:items-center'>
          <h1 className='text-3xl para-text flex flex-col justify-center'><span className='italic'>Welcome</span>
            <span className='text-xl'>Let's Get you logged in to</span>
            <span className='font-bold mt-2 main-text'><div>ExamRescue</div></span>
            <div className='w-full animate-width bg-btn-primary h-[2px] mt-2 relative '>
              <div className='bg-btn-primary rotate-[30deg] h-[2px] w-[10%] absolute right-0 origin-[100%_50%]'></div>
              <div className='bg-btn-primary rotate-[-30deg] h-[2px] w-[10%] absolute right-0 origin-[100%_50%]'></div>
            </div>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className='flex-[2] md:flex-[1] h-full flex flex-col justify-center items-center w-full relative'>
          
          <div className='w-[90%] m-2 h-14 p-2 flex justify-start items-center relative bg-main rounded-md shadow-lg'>
            <label for="email" className={`main-text absolute left-2 bg-transparent ${emailLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Email</label>
            <input
              // onFocus={(e)=>{
              //   if(e.target.value === "") setEmailLabel(prev => !prev);
              // }}
              onChange={(e) => {
                if (e.target.value !== "" && emailLabel === false) setEmailLabel(prev => !prev);
                setEmail(e.target.value);
                if (e.target.value === "" && emailLabel === true) setEmailLabel(prev => !prev);
              }}
              value={email} className='w-full h-full bg-transparent outline-none text-white text-sm' type="email" name="" id="email" spellCheck="off" placeholder='Email' />
          </div>

          <div ref={ref} className='w-[90%] m-2 h-14 p-2 bg-main flex justify-between items-center rounded-md shadow-lg relative'>
            <label for="pass" className={`text-white absolute left-2 bg-trasparent ${passLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Password</label>
            <input onChange={(e) => {
              if (e.target.value !== "" && passLabel === false) setPassLabel(prev => !prev);
              setPass(e.target.value);
              if (e.target.value === "" && passLabel === true) setPassLabel(prev => !prev);
            }} value={pass} className='w-full h-full outline-none bg-transparent text-sm text-white' placeholder='Password' type="password" name="" id="pass" spellCheck="off" />
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

          <div className='para-text text-sm py-2 m-4'>New Here ?<span onClick={() => {
            navigate('/signup')
          }} className='link tracking-wide cursor-pointer'>{" "}Register</span></div>
          <input className='py-4 tracking-wider px-24 bg-btn-primary rounded-md main-text text-xl' type="submit" value="Log In" />
        </form>
      </div>
    </div>
  )
}

export default Login 