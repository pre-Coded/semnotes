import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import UserProfile from "./Components/Profile/UserProfile";
import { useFireBase } from './utilities/Firebase';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NoPage from "./Pages/NoPage";
import SemDetailsSelected from "./Pages/semDetailsSelected";
import LoadingOverlay from "./Pages/LoadingOverlay";
import { useState } from "react";
import Chat from "./Components/Chat/chat";


function App() {
    const firebase = useFireBase();

    return (
        <div className={`w-full h-screen bg-black relative hide-scrollbar overflow-hidden`}>
            <LoadingOverlay isLoading={firebase.isLoading}></LoadingOverlay>
            {
                firebase.isLoggedIn ?
                    <>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="profile" element={<UserProfile />}></Route>
                            <Route path="semselected" element={<SemDetailsSelected />}></Route>
                            <Route path="chat" element={<Chat />}></Route>
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </> :
                    <>
                        <Routes>
                            <Route path='/' element={<Login />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/signup" element={<SignUp />}></Route>
                        </Routes>
                    </>
            }
        </div>
    );
}

export default App;
