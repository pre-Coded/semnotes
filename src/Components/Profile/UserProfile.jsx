import React, { useRef, useState, useEffect, } from 'react'
import AnimatedButton from './AnimatedButton'
import AccountInfo from './AccountInfo'
import ContactUs from './ContactUs'
import Feedback from './Feedback'
import { RiAddCircleLine } from 'react-icons/ri'

import { useFireBase } from '../../utilities/Firebase'


const UserProfile = () => {
  const firebase = useFireBase();

  const [account, setAccount] = useState(false);
  const [contact, setContact] = useState(false);
  const [follow, setFollow] = useState(false);

  return (
    <div className='main-text h-full w-full relative flex flex-col space-y-4 overflow-hidden'>

      <div className='w-full flex flex-col lg:flex-row items-center justify-center space-y-3 relative px-2'>

        <div className='h-full w-full flex justify-start items-center relative space-x-4 space-y-4'>

          <div></div>
          <div className='h-24 aspect-square border-2 border-white rounded-full relative flex  items-center justify-center'>

            <RiAddCircleLine className='absolute top-1 right-1 text-xl bg-black rounded-full shadow-sm' />
            <input onChange={(e) => {
              if (e !== null) firebase.handleProfilePhotoUpload(firebase.user.uid, e.target.files[0]);
            }} type="file" name="" id="" className=' h-full w-full aspect-square opacity-0 absolute' />
            <img src={firebase.userDetails.profileUrl} alt="ProfilePhoto" className='h-full aspect-square object-cover rounded-full text-sm' />

          </div>

          <h1 className='main-text text-xl'>{!firebase.userDetails.username ? firebase.user.email : firebase.userDetails.username}</h1>

        </div>

        <button onClick={firebase.handleSignOut} className='tracking-wider w-[90%] lg:w-48 h-14 text-sm py-3 bg-btn-primary main-text rounded-md shadow-md'>Log Out</button>
      </div>

      <div className='flex flex-col px-2 w-full overflow-y-scroll h-full'>
        <div className='p-2 text-sm flex flex-col space-y-2 h-full w-full'>
          <AnimatedButton state={account} setState={setAccount} btn={"Account Info"} data={<AccountInfo />} />
          <AnimatedButton state={contact} setState={setContact} btn={"Contact Us"} data={<ContactUs />} />
          <AnimatedButton state={follow} setState={setFollow} btn={"Provide Feedback"} data={<Feedback />} />
        </div>
      </div>

      <div className='h-36 bg-black w-full'></div>
    </div>
  )
}

export default UserProfile