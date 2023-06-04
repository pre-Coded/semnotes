import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import SemDetails from "./Components/semDetails/semDetails";
import Form from "./Components/Form/Form.jsx";
import NavBar from "./Components/NavBar/NavBar";
import Notes from "./Pages/Notes";
import {useState} from 'react';
import {MdOutlineAdd} from 'react-icons/md'
import AbtCollege from "./Components/AbtCollege/AbtCollege";
import UserProfile from "./Components/Profile/UserProfile";
import {useFireBase} from './utilities/Firebase';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import {useEffect} from 'react'
import NoPage from "./Pages/NoPage";
import Loading from "./Pages/Loading";
import SemDetailsSelected from "./Pages/semDetailsSelected";
import BG from './assets/bg.jpeg'

function App() {
    const [height, setHeight] = useState(100);

    const handleNoteHeight = () =>{
      return height === 0 ? setHeight(100) : setHeight(0);
    }

    const navigate = useNavigate();

    const firebase = useFireBase();

    if(firebase.isLoggedIn === false){
      return <div>
        <Loading isLoading={firebase.isLoading}/>
        <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </div>
    }


    return (
        <div className={`w-full bg-black h-screen  relative hide-scrollbar overflow-hidden`}>
            <Loading isLoading={firebase.isLoading}/>
          
            <button onClick={handleNoteHeight} className='fixed z-[49] bottom-20 right-4 text-black p-4 rounded-full flex justify-center items-center btn-prm brightness-200 border-[1px]'>
            <MdOutlineAdd className='text-2xl'/></button>
            <Notes height={height} handleNoteHeight = {handleNoteHeight} />
            <NavBar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="semnotes" element={<SemDetails/>}></Route>
                <Route path="addresource" element={<Form/>}></Route>
                <Route path="abtcollege" element={<AbtCollege/>}></Route>
                <Route path="profile" element={<UserProfile/>}></Route>
                <Route path="semselected" element={<SemDetailsSelected/>}></Route>
                <Route path="*" element={<NoPage/>} />
            </Routes>
        </div>
  );
}

export default App;
