import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import BlankPhoto from '../assets/blankProfile.png'

import { getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    signInWithEmailAndPassword, 
} from "firebase/auth";

import { getDatabase, 
        set, 
        get, 
        child, 
        update,
        ref as dataBaseRef,
        onValue,
} from "firebase/database";

import { collection, getDocs, getFirestore,
} from 'firebase/firestore'

import { getStorage, uploadBytes, getDownloadURL, ref as storageRef, deleteObject
} from "firebase/storage";

const fireBaseConfig = {
    apiKey: "AIzaSyDSfVhefruIb6v0zCzLq4B3GU3njMbTKPc",
    authDomain: "semnotes-7bb62.firebaseapp.com",
    databaseURL: "https://semnotes-7bb62-default-rtdb.firebaseio.com",
    projectId: "semnotes-7bb62",
    storageBucket: "semnotes-7bb62.appspot.com",
    messagingSenderId: "7235148731",
    appId: "1:7235148731:web:34562f22b5cc9de823c29e",
};

const fireBaseApp = initializeApp(fireBaseConfig);
const fireBaseAuth = getAuth(fireBaseApp);
const auth = getAuth(fireBaseApp);

const googleProvider = new GoogleAuthProvider();

const database = getDatabase(fireBaseApp);
const storage = getStorage(fireBaseApp);

const firestore = getFirestore(fireBaseApp);

const FireBaseContext = createContext(null);
export const useFireBase = () => {
    return useContext(FireBaseContext);
}

export const FireBaseProvider = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [detailsOfUser, setDetails] = useState({
        branch : "",
        sem : "",
        sub : ""
    })

    const [videoList, setVideoList] = useState(null);
    const [noteList, setNoteList] = useState(null);
    const [user, setUser] = useState(null);

    const authStateChange = () => {
        onAuthStateChanged(auth, user => {
            console.log("Auth State Changed");

            setLoading(prev => !prev);
            if (user) {
                console.log("running")
                setUser(user);
            }
            else{
                setUser(null);
            }
            setLoading(prev => !prev);
        })     
    }

    useEffect( () => {
        authStateChange();
    }, []);


    const navigate = useNavigate();

    const signUpWithEmailAndPassword = async (email, password) => {
        setLoading(prev => !prev);

        try {
          const userCredential = await createUserWithEmailAndPassword(
            fireBaseAuth,
            email,
            password
          );
          const user = userCredential.user;

          setUser(user);
            
          await putData(`ExamRescue/${user.uid}/academicDetails`, {
              branch: detailsOfUser.branch,
              sem: detailsOfUser.sem,
            })

        } catch (error) {
          // Handle any errors during the sign-up process
          console.log("Sign up error:", error.message);
          throw error;
        }

        navigate('/');
        setLoading(prev => !prev);
      };

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const signInUser = async (email, pass) => {
        return await signInWithEmailAndPassword(auth, email, pass);
    }
    const handleSignOut = async () => {
        setLoading(prev => !prev);
        await signOut(auth).then(() => {
            setUser(null);
            setDetails({
                branch : "",
                sem: "",
                sub : "",
            })
            navigate('/')
        })
        setLoading(prev => !prev);
    }

    const putData = async (path, data) => {
        return await set( dataBaseRef(database, path), data);
    }

    const getData = async (path) =>{
        return await get(child(dataBaseRef(database), path))
    }


    const [profileUrl, setprofileUrl] = useState('');
    const [username, setusername] = useState("Click to set");
    
    const handleProfilePhotoUpload = async (userId, image) => {
        const extension = image.name.split(".").pop();
        const renameImage = userId + "." + extension;

        const imageRef = storageRef(storage, `ProfilePhoto/${renameImage}`);
        try {

          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);

          setprofileUrl(url);
          const result = await updateData(`ExamRescue/${userId}/userDetails`,{
            profileUrl : url,
          })

          return result;
        } catch (error) {
          console.log("Error in saving:", error);
          throw error; // Rethrow the error to handle it in the caller function
        }
      };
      
      
    const [syllabusURL, setsyllabusURL] = useState(null);

    const getSyllabusURL = async (path)=>{
        const fileRef = storageRef(storage, path);
        try {
          return await getDownloadURL(fileRef);
        } catch (error) {
          console.error('Error getting syllabus URL:', error);
          throw error;
        }

    }
    const getVideoLinks = async (branch,  subject) => {
        setLoading(prev => !prev);
        await getDocs(collection(firestore, `/${branch}/${subject}/Video-Links/`));
        setLoading(prev => !prev);
    }

    const updateData = async (path, data) =>{
        await update(dataBaseRef(database, path), data); 
    }
    
    const isLoggedIn = user ? true : false;

    // onValue(dataBaseRef(`ExamRescue/${ !user.uid ? user.uid : "fake"}/userDetails`), (snapshot)=>{
    //     const data = snapshot.val();

    //     setprofileUrl(data.profileUrl);
    //     setusername(data.username);
    // })

    // onValue(dataBaseRef(`ExamRescue/${ !user.uid ? user.uid : "fake"}/academicDetails`), (snapshot)=>{
    //     const data = snapshot.val();

    //     const prevSub = detailsOfUser.sub;

    //     setDetails({
    //         branch : data.branch,
    //         sem : data.sem,
    //         sub : prevSub,
    //     })
    // })

    return (
        <FireBaseContext.Provider value={{
            signUpWithEmailAndPassword, 
            signInWithGoogle,  
            handleProfilePhotoUpload,
            user, 
            isLoggedIn, 
            handleSignOut, 
            signInUser, 
            isLoading, 
            setLoading, 
            getVideoLinks,
            getSyllabusURL,
            detailsOfUser, 
            setDetails,
            putData,
            getData,
            syllabusURL,
            setsyllabusURL,
            videoList, 
            setVideoList,
            noteList, 
            setNoteList,
            handleProfilePhotoUpload,
            profileUrl,
            setprofileUrl,
            username,
            setusername,
            updateData
        }}>
            {props.children}
        </FireBaseContext.Provider>
    );
};
