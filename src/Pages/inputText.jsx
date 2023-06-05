import React from 'react'

const inputText = ({info, setInfo ,lebel, setLabel}) => {
  return (
    <div className='h-14 p-2 flex justify-start items-center relative border-[1px] border-white'>
                <label for="username" className={`text-white absolute left-2 bg-black ${label ? "-translate-y-7 rounded text-xs opacity-100" : "opacity-0"} transition-all text-sm`}>{info}</label>
                <input 
                onChange={(e)=>{
                  if(e.target.value !== "" && usernameLabel === false) setUserlabel(prev => !prev);
                  setUsername(e.target.value);
                  if(e.target.value === "" && usernameLabel === true) setUserlabel(prev => !prev);
                }} 
                value={username} className='w-full h-full bg-black outline-none text-white text-sm' type="email" name="" id="email" required spellCheck="off" placeholder='Add Username'/>
    </div>
  )
}

export default inputText