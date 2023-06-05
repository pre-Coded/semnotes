import React, { useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { AiFillCaretDown} from 'react-icons/ai'
import { useFireBase } from '../../utilities/Firebase'
import EditAccount from '../../Pages/EditAccount'

const UserProfile = () => {
    const firebase = useFireBase();
    const [call, setCall] = useState(false);

    const refAcc = useRef();
    const refContact = useRef();
    const refAbout = useRef();

    const handleBoxes = (ref)=>{
        ref.current.classList.toggle("h-0");
    }
  return (
    <div className='h-full w-full text-white text-s flex flex-col overflow-hidden'>
        <EditAccount call={call} setCall={setCall}/>
        <div className='flex justify-start items-center border-b-[1px]'>
            <div className='text-6xl p-4 text-white'><CgProfile/></div>
            <h1>{firebase.user.email}</h1>
        </div>

        <div className='flex justify-between items-center p-4 w-full'>
            <button onClick={()=>{
                setCall(prev => !prev);
            }} className='border-[1px] text-sm mt-4 px-6 py-2 bg-white text-black'>Edit Account</button>
            <button onClick={firebase.handleSignOut} className='border-[1px] text-sm mt-4 px-6 py-2 bg-white text-black'>Log Out</button>
        </div>

        <div className='flex flex-col px-2 border-t-2 w-full overflow-y-scroll'>
            <div className='p-2 text-xl flex flex-col space-y-2'>
                <button onClick={()=>{
                    handleBoxes(refAcc);
                }} className='w-full py-4 bg-black space-x-2 text-white flex items-center justify-between p-2 border-[1px]'>
                    <span>Account Details</span><AiFillCaretDown/>
                </button>
                <div ref={refAcc} className='w-full h-0 transition-all overflow-hidden'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt rem impedit fugit, tenetur obcaecati quasi nisi incidunt possimus minus tempora corporis ea nobis in distinctio error. Cumque temporibus odit magnam.
                </div>

                <button onClick={()=>{
                    handleBoxes(refContact);
                }} className='w-full py-4 bg-black space-x-2 text-white flex items-center justify-between p-2 border-[1px]'>
                    <span>Contact Us</span><AiFillCaretDown/>
                </button>
                <div ref={refContact} className='w-full h-0 transition-all overflow-hidden'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt rem impedit fugit, tenetur obcaecati quasi nisi incidunt possimus minus tempora corporis ea nobis in distinctio error. Cumque temporibus odit magnam.
                </div>
                <button onClick={()=>{
                    handleBoxes(refAbout);
                }} className='w-full py-4 bg-black space-x-2 text-white flex items-center justify-between p-2 border-[1px]'>
                    <span>About Us</span><AiFillCaretDown/>
                </button>
                <div ref={refAbout} className='w-full h-0 transition-all overflow-hidden'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt rem impedit fugit, tenetur obcaecati quasi nisi incidunt possimus minus tempora corporis ea nobis in distinctio error. Cumque temporibus odit magnam.
                </div>
                <button className='w-full py-4 bg-black space-x-2 text-white flex items-center justify-between p-2 border-[1px]'>
                    <span>Provide Feedback</span><AiFillCaretDown/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default UserProfile