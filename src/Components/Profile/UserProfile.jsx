import React, { useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { AiFillCaretDown} from 'react-icons/ai'
import { useFireBase } from '../../utilities/Firebase'
import EditAccount from '../../Pages/EditAccount'
import AnimatedButton from './AnimatedButton'
import AccountInfo from './AccountInfo'
import ContactUs from './ContactUs'
import Feedback from './Feedback'

const UserProfile = () => {
    const firebase = useFireBase();
    const [call, setCall] = useState(false);

    const [account, setAccount] = useState(false);
    const [contact, setContact] = useState(false);
    const [follow, setFollow] = useState(false);

  return (
    <div className='h-full w-full main-text text-s flex flex-col overflow-hidden'>
        <EditAccount call={call} setCall={setCall}/>

        <div className='flex w-full justify-start pt-8 px-6 pb-4 space-x-4 items-center bg-main shadow-md rounded-b-md'>
            <div className='text-6xl text-white'><CgProfile/></div>
            <h1>{firebase.user.email}</h1>
        </div>

        <div className='flex justify-between items-center p-4 w-full'>
            <button onClick={()=>{
                setCall(prev => !prev);
            }} className='text-sm mt-4 px-9 py-3 bg-btn-secondry main-text rounded-md shadow-md tracking-wider'>Edit Account</button>
            <button onClick={firebase.handleSignOut} className='tracking-wider text-sm mt-4 px-9 py-3 bg-btn-primary main-text rounded-md shadow-md'>Log Out</button>
        </div>

        <div className='flex flex-col px-2 mt-4 w-full overflow-y-scroll'>
            <div className='p-2 text-sm flex flex-col space-y-2'>
                <AnimatedButton state={account} setState={setAccount} btn={"Account Info"} data={<AccountInfo/>}/>
                <AnimatedButton state={contact} setState={setContact} btn={"Contact Us"} data={<ContactUs/>}/>
                <AnimatedButton state={follow} setState={setFollow} btn={"Provide Feedback"} data={<Feedback/>}/>
            </div>
        </div>
        <div className='h-36 bg-black w-full'></div>
    </div>
  )
}

export default UserProfile