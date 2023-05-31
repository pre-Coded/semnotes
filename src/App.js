import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import SemDetails from "./Components/semDetails/semDetails";
import Form from "./Components/Form/Form.jsx";
import NavBar from "./Components/NavBar/NavBar";
import Notes from "./Pages/Notes";
import {useState} from 'react';
import {MdOutlineAdd} from 'react-icons/md'
import AbtCollege from "./Components/AbtCollege/AbtCollege";
import UserProfile from "./Components/Profile/UserProfile";

function App() {
    const [height, setHeight] = useState(100);

    const handleNoteHeight = () =>{
      return height === 0 ? setHeight(100) : setHeight(0);
    }

  return (
        <div className="w-full h-screen fade-bg relative overflow-hidden">
            <button onClick={handleNoteHeight} className='fixed z-[49] bottom-20 right-4 button-color text-white py-3 px-6 rounded-md flex justify-center items-center space-x-1'>
            <MdOutlineAdd className='text-white text-2xl'/><span>Notes</span></button>

            <Notes height={height} handleNoteHeight = {handleNoteHeight} />

            <NavBar/>

            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="semnotes" element={<SemDetails/>}></Route>
              <Route path="addresource" element={<Form/>}></Route>
              <Route path="abtcollege" element={<AbtCollege/>}></Route>
              <Route path="profile" element={<UserProfile/>}></Route>
            </Routes>
        </div>
  );
}

export default App;
