import { Routes, Route} from "react-router-dom";
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form.jsx";
import NavBar from "./Components/NavBar/NavBar";
import AbtCollege from "./Components/AbtCollege/AbtCollege";
import UserProfile from "./Components/Profile/UserProfile";
import {useFireBase} from './utilities/Firebase';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NoPage from "./Pages/NoPage";
import SemDetailsSelected from "./Pages/semDetailsSelected";
import LoadingOverlay from "./Pages/LoadingOverlay";
import { useState } from "react";
import { async } from "@firebase/util";

function App() {
    const firebase = useFireBase();

    useState(()=>{
          const fetchAcademicDetails = async ()=> {  
          await firebase.getData(`ExamRescue/${firebase.user.uid}/academicDetails`).then((snapshot) => {
              const { branch, sem } = snapshot.val();
  
              firebase.getSyllabusURL(`Syllabus/Sem${sem}.pdf`).then((url) => {
                  firebase.setLoading(prev => !prev);
                  firebase.setsyllabusURL(url);
              });
  
              firebase.setDetails({
                  branch: branch,
                  sem: sem,
                  sub: ""
              });
          
          })
          fetchAcademicDetails();
    }
    }, [])

    return (
        <div className={`w-full h-screen bg-black relative hide-scrollbar overflow-hidden`}>
           <LoadingOverlay isLoading ={firebase.isLoading}></LoadingOverlay>
            {
              firebase.isLoggedIn ? 
              <>
              <NavBar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="addresource" element={<Form/>}></Route>
                  <Route path="abtcollege" element={<AbtCollege/>}></Route>
                  <Route path="profile" element={<UserProfile/>}></Route>
                  <Route path="semselected" element={<SemDetailsSelected/>}></Route>
                  <Route path="*" element={<NoPage/>} />
              </Routes>
              </> :
              <>
              <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<SignUp/>}></Route>
              </Routes>
              </>
            }
        </div>
  );
}

export default App;
