import React, { useRef, useState , useEffect, } from 'react'
import { CgProfile } from 'react-icons/cg'
import { AiFillCaretDown} from 'react-icons/ai'
import { useFireBase } from '../../utilities/Firebase'
import EditAccount from '../../Pages/EditAccount'
import AnimatedButton from './AnimatedButton'
import AccountInfo from './AccountInfo'
import ContactUs from './ContactUs'
import Feedback from './Feedback'
import { MdGroupAdd } from 'react-icons/md'
import {RiAddCircleLine} from 'react-icons/ri'
import Bg from '../../assets/blankProfile.png'

const UserProfile = () => {
    const firebase = useFireBase();

    const [account, setAccount] = useState(false);
    const [contact, setContact] = useState(false);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("userprofile");

            const snapshot = await firebase.getData(`ExamRescue/${firebase.user.uid}/userDetails`);
            const data = snapshot.val(); // Extract the data from the snapshot using .val()

            console.log(data);
            const profileUrl = data.profileUrl;
            const username = data.username;
            
            firebase.setprofileUrl(profileUrl);
            firebase.setusername(username);

            await firebase.getData(`ExamRescue/${firebase.user.uid}/academicDetails`).then((snapshot) => {
                const { branch, sem } = snapshot.val();
    
                // firebase.getSyllabusURL(`Syllabus/Sem${sem}.pdf`).then((url) => {
                //     firebase.setLoading(prev => !prev);
                //     firebase.setsyllabusURL(url);
                // });
                firebase.setDetails({
                    branch: branch,
                    sem: sem,
                    sub: ""
                });
            })

          } catch (err) {
            console.log(err);
          }
        };

        fetchData();
    }, []);

  return (
    <div className='h-full w-full main-text text-s flex flex-col overflow-hidden'>

        <div className='flex w-full h-32 justify-start pt-8 px-6 pb-4 space-x-4 items-center bg-main relative'>

        <div className='flex justify-start items-center lg:flex-col lg:justify-center space-x-4 w-full h-full'>

        <div className='h-full aspect-square border-[2px] border-white rounded-full relative flex justify-center items-center'>
            <RiAddCircleLine className='absolute top-0 right-0 text-xl bg-black rounded-full shadow-sm'/>
            <input onChange={(e)=>{
                if(e !== null) firebase.handleProfilePhotoUpload(firebase.user.uid, e.target.files[0]);
            }} type="file" name="" id="" className=' h-full w-full aspect-square opacity-0 absolute' />
            <img src={firebase.profileUrl === null || firebase.profileUrl === "" ? Bg : firebase.profileUrl} alt="ProfilePhoto" className='h-full w-full object-cover p-0.5 rounded-full text-sm'/>
        </div>

        <h1 className='main-text text-[1.2rem]'>{ !firebase.username ? firebase.user.email : firebase.username}</h1>
        
        </div>
        
        <button onClick={firebase.handleSignOut} className='tracking-wider lg:h-full w-48 text-sm py-3 bg-btn-primary main-text rounded-md shadow-md'>Log Out</button>

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