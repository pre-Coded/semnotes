import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth";

import { getDatabase, set } from "firebase/database";

import {getFirestore, collection, addDoc} from 'firebase/firestore'

import {getStorage, ref, uploadBytes} from 'firebase/storage'
import { useNavigate } from "react-router-dom";

const fireBaseConfig = {
    apiKey: "AIzaSyDSfVhefruIb6v0zCzLq4B3GU3njMbTKPc",
    authDomain: "semnotes-7bb62.firebaseapp.com",
    databaseURL: "https://semnotes-7bb62-default-rtdb.firebaseio.com",
    projectId: "semnotes-7bb62",
    storageBucket: "semnotes-7bb62.appspot.com",
    messagingSenderId: "7235148731",
    appId: "1:7235148731:web:34562f22b5cc9de823c29e",
    databaseURL : "https://semnotes-7bb62-default-rtdb.firebaseio.com",
};

const fireBaseApp = initializeApp(fireBaseConfig);
const fireBaseAuth = getAuth(fireBaseApp);
const database = getDatabase(fireBaseApp);
const auth = getAuth(fireBaseApp);

const googleProvider = new GoogleAuthProvider();

const firestore = getFirestore(fireBaseApp);
const storage = getStorage(fireBaseApp);


const FireBaseContext = createContext(null);

export const useFireBase = () => {
    return useContext(FireBaseContext);
}

export const FireBaseProvider = (props) => {
    const [dselected, setDetails] = useState("");
    const handleSelected = (info)=>{
        setDetails(info);
    }


    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    useEffect( () => {
        onAuthStateChanged(auth, user =>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        })
    }, []);


  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(fireBaseAuth, email, password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  const signInUser = async (email,pass) => {
    await signInWithEmailAndPassword(auth, email, pass).then(()=>{
        navigate('/');
    }).catch(()=>{
        alert("Enter valid credentials.");
    })
  }

  const putData = (key, data) => set(ref(database, key), data);

  const handleUploads = async (year, sem, branch, subject, desc, file) => {
    setLoading( prev => !prev);

    const imgRef = ref(storage, `${branch}/${year}/${sem}/${subject}/${Date.now()}-${file.name}`);
    const uploadResult = await uploadBytes(imgRef, file);

    return await addDoc(collection(firestore, `${branch}/${year}/${sem}/${subject}/${user.email}` ),{
        year, 
        sem,
        branch,
        subject,
        desc,
        fileUrl : uploadResult.ref.fullPath,
        userId : user.uid,
        userEmail : user.email,
        userName : user.displayName
    } ).then(()=>{setLoading( prev => !prev); alert("File is successfully uploaded.")}).catch(()=>{alert("File wasn't uploaded successfully.")})
    }

    const handleSignOut = async () =>{
        setLoading( prev => !prev);
        await signOut(auth).then(()=>{
            navigate('/login')
        })
        setLoading( prev => !prev);
    }

    const isLoggedIn = user ? true : false;

//   onValue(ref(database, "grandFather"),  (snapshot) => console.log(snapshot.val()) );

  return (
    <FireBaseContext.Provider value={{ signUpWithEmailAndPassword ,signInWithGoogle , putData, handleUploads, user, isLoggedIn , handleSignOut, signInUser, isLoading , setLoading, dselected, handleSelected}}>
      {props.children}
    </FireBaseContext.Provider>
  );
};
