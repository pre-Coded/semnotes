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



function App() {

    const firebase = useFireBase();
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
