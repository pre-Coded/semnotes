import React, {useState, useRef} from 'react'
import { RxCross1 } from 'react-icons/rx'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useFireBase } from '../utilities/Firebase';
import {BiCloudUpload} from 'react-icons/bi'


const EditAccount = ({call, setCall}) => {
    const ref = useRef(null);

    const [username, setUsername] = useState("");
    const [usernameLabel, setUserlabel] = useState(false);

    const [email, setemail] = useState("");
    const [emailLabel, setEmailLabel] = useState(false);

    const [pass, setPass] = useState("");
    const [passLabel, setPassLabel] = useState(false);
    const [eye, setEye] = useState(true);

    const sems = [1,2,3,4,5,6,7,8];

    const firebase = useFireBase();

  return (
    <div className={`${call ? "block" : "hidden"} h-screen w-screen absolute flex items-center justify-center bg-transparent backdrop-blur-sm overflow-hidden`}>

        <div className='h-[60%] w-full m-4 bg-black text-white border-[1px] flex flex-col p-4 space-y-4 overflow-x-hidden overflow-y-scroll hide-scrollbar'>
            <div className='text-xl flex justify-between items-center border-b-[1px] pb-1'><span>Edit Account</span>
            <RxCross1 onClick={()=>{setCall(prev => !prev)}} className='text-3xl'/>
            </div>

            <div className='h-14 p-2 flex justify-start items-center relative border-[1px] border-white'>
                <label for="username" className={`text-white absolute left-2 bg-black ${usernameLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Username</label>
                <input 
                onChange={(e)=>{
                  if(e.target.value !== "" && usernameLabel === false) setUserlabel(prev => !prev);
                  setUsername(e.target.value);
                  if(e.target.value === "" && usernameLabel === true) setUserlabel(prev => !prev);
                }} 
                value={username} className='w-full h-full bg-black outline-none text-white text-sm' type="email" name="" id="username" required spellCheck="off" placeholder='Add Username'/>
            </div>

            <div className='h-14 p-2 flex justify-start items-center relative border-[1px] border-white'>
                <label for="email" className={`text-white absolute left-2 bg-black ${emailLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Email</label>
                <input 
                onChange={(e)=>{
                  if(e.target.value !== "" && emailLabel === false) setEmailLabel(prev => !prev);
                  setemail(e.target.value);
                  if(e.target.value === "" && emailLabel === true) setEmailLabel(prev => !prev);
                }} 
                value={email} className='w-full h-full bg-black outline-none text-white text-sm' type="email" name="" id="email" required spellCheck="off" placeholder='Update Email'/>
            </div>

            <div ref = {ref} className='h-14 p-2 flex justify-between items-center border-[1px] border-white relative'>
              <label for="pass" className={`text-white absolute left-2 bg-black ${passLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Password</label>
              <input onChange={(e)=>{
                  if(e.target.value !== "" && passLabel === false) setPassLabel(prev => !prev);
                  setPass(e.target.value);
                  if(e.target.value === "" && passLabel === true) setPassLabel(prev => !prev);
                }}value={pass} className='w-full h-full outline-none bg-transparent text-sm text-white' placeholder='Update Password' type="password" name="" id="pass" required spellCheck="off"/>
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

            <div className='w-full h-14 relative flex justify-center items-center bg-black text-white border-[1px] overflow-hidden'>
              <div>{firebase.detailsOfUser.sem === "" ? "Change Semester" : "Semester "+firebase.detailsOfUser.sem}</div>
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

            <div className='w-full h-14 relative flex justify-center items-center bg-black text-white border-[1px] overflow-hidden'>
              <div className='flex items-center  justify-center'><BiCloudUpload className='text-2xl mr-2'/>Profile Photo</div>
              <input onChange={(e)=>{
              }} className='h-full w-full outline-none text-white bg-transparent absolute opacity-0' type="file" required/>
            </div>
            <button className='py-4 bg-white grid place-items-center text-black brightness-150'>Save</button>
        </div>
    </div>
  )
}

export default EditAccount