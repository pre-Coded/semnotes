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

    const index = email.indexOf(".com");
    if(email.indexOf(".com") === -1){
      return;
    }

    await firebase.signUpWithEmailAndPassword(email,pass);

    await firebase.putData(`ExamRescue/${email.substring(0,index)}/academicDetails`, {
      branch : firebase.detailsOfUser.branch,
      sem : firebase.detailsOfUser.sem,
    }).then((res)=>{
      console.log("Uploaded Successfully", res);
    }).catch((err)=>{
      console.log("Error in uploading",err);
    })
  }

  const sems = [1,2,3,4,5,6,7,8];
  const branches = ["Information Technology"]

  return (
    <div className={`h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center`}>   
        <form onSubmit={handleSubmit} className='h-full flex flex-col justify-center items-center w-full space-y-4 relative'>
              
              <div className='flex flex-col items-center justify-center relative'>
                  <span className='para-text text-xl'>Take the Next Step</span>
                  <span className='main-text text-2xl'>Register</span>
              </div>

              <div className='w-[90%] h-14 p-2 flex justify-start items-center bg-main rounded-md shadow-md relative'>
                <label for="email" className={`text-white absolute left-2 bg-transparent ${emailLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Email</label>
                <input 
                onChange={(e)=>{
                  if(e.target.value !== "" && emailLabel === false)setEmailLabel(prev => !prev);
                  setEmail(e.target.value);
                  if(e.target.value === "" && emailLabel === true) setEmailLabel(prev => !prev);
                }} 
                value={email} className='w-full h-full bg-transparent outline-none text-sm' type="email" name="" id="email" required spellCheck="off" placeholder='Email'/>
              </div>

            <div ref = {ref} className='w-[90%] h-14 p-2 flex justify-between items-center relative bg-main rounded-md shadow-md'>
              <label for="pass" className={`text-white absolute left-2 bg-transparent ${passLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Password</label>
              <input onChange={(e)=>{
                  if(e.target.value !== "" && passLabel === false) setPassLabel(prev => !prev);
                  setPass(e.target.value);
                  if(e.target.value === "" && passLabel === true) setPassLabel(prev => !prev);
                }}value={pass} className='w-full h-full outline-none bg-transparent text-sm text-white' placeholder='Password' type="password" name="" id="pass" required spellCheck="off"/>
              {
                eye ? <AiFillEyeInvisible className='para-text text-3xl'  onClick={()=>{
                  setEye(prev => !prev);
                  ref.current.children[1].type = "text";
                }}/> : <AiFillEye className='para-text text-3xl' onClick={()=>{
                  setEye(prev => !prev);
                  ref.current.children[1].type = "password";
                }}/>
              }
            </div>

            <div className='w-[90%] h-14 relative flex justify-center items-center bg-main rounded-md shadow-md para-text overflow-hidden'>
              <div>{firebase.detailsOfUser.sem === "" ? "Select Semester" : "Semester "+firebase.detailsOfUser.sem}</div>
              <select onChange={(e)=>{
                firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value});
              }} className='h-full w-full outline-none text-white bg-transparent absolute opacity-0' name="sem" required>
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

            <div className='w-[90%] h-14 relative flex justify-center items-center bg-main rounded-md shadow-md para-text overflow-hidden'>
              <div>{firebase.detailsOfUser.branch === "" ? "Select Branch" : firebase.detailsOfUser.branch}</div>
              <select onChange={(e)=>{
                firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value})
              }} className='h-full w-full outline-none text-white bg-transparent absolute opacity-0 ' name='branch' required>
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
            <div className='para-text text-sm py-2'>Already a user?<span onClick={()=>{
              navigate('/')
                      }} className='link'>{"  "}Log In</span></div>
            <input className='tracking-wider py-4 px-24 bg-btn-primary rounded-md shadow-md text-xl button-color main-text' type="submit" value="Register"/>
        </form>
    </div>
  )
}

export default SignUp 