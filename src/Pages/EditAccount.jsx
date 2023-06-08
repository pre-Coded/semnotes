import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useFireBase } from '../utilities/Firebase';
import {BiCloudUpload} from 'react-icons/bi'


const EditAccount = ({call, setCall}) => {
    const ref = useRef(null);

    const [username, setUsername] = useState("");
    const [usernameLabel, setUserlabel] = useState(false);

    const sems = [1,2,3,4,5,6,7,8];

    const firebase = useFireBase();

    const [sem, setSem] = useState('');
    const [img, setImg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
      setCall(prev => !prev);
      firebase.handleUploadEditAccount(username, sem, img);
      // navigate('/profile');
    }

  return (
    <div className={`${call ? "h-screen w-screen z-9999" : "h-0 w-0 -z-[9999]"} absolute flex items-center justify-center bg-transparent backdrop-blur-sm overflow-hidden`}>

        <div className={`${call ? "scale-100" : "scale-0"} h-[60%] border-y-[2px] border-y-[#FF5722] w-full m-4 bg-black rounded-md shadow-md flex flex-col p-4 space-y-4 overflow-x-hidden overflow-y-scroll hide-scrollbar transition-all`}>
            <div className='text-xl flex justify-between para-text items-center pb-4 border-b-[2px] border-b-[#121212]'><span>Edit Account</span>
            <RxCross1 onClick={()=>{setCall(prev => !prev)}} className='text-3xl text-main'/>
            </div>

            <div className='h-14 p-2 flex justify-start items-center relative rounded-md shadow-md bg-main'>
                <label for="username" className={`text-white absolute left-2 bg-transparent ${usernameLabel ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>Username</label>
                <input 
                onChange={(e)=>{
                  if(e.target.value !== "" && usernameLabel === false) setUserlabel(prev => !prev);
                  setUsername(e.target.value);
                  if(e.target.value === "" && usernameLabel === true) setUserlabel(prev => !prev);
                }} 
                value={username} className='w-full h-full bg-transparent outline-none text-white text-sm' type="email" name="" id="username" required spellCheck="off" placeholder='Add Username'/>
            </div>

            <div className='h-14 p-2 flex justify-center items-center relative rounded-md shadow-md bg-main overflow-hidden'>
              <div>{firebase.detailsOfUser.sem === "" ? "Change Semester" : "Semester "+firebase.detailsOfUser.sem}</div>
              <select onChange={(e)=>{
                setSem(e.target.value);
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

            <div className='h-14 p-2 flex justify-center items-center relative rounded-md shadow-md bg-main overflow-hidden'>
              <div className='flex items-center  justify-center'><BiCloudUpload className='text-2xl mr-2'/>Profile Photo</div>
              <input onChange={(e)=>{
                setImg(e.target.files[0]);
              }} className='h-full w-full outline-none text-white bg-transparent absolute opacity-0' type="file" required/>
            </div>
            <button onClick={handleSubmit} className='py-4 rounded-md text-xl tracking-wider bg-btn-success grid place-items-center brightness-125'>Save</button>
        </div>
    </div>
  )
}

export default EditAccount