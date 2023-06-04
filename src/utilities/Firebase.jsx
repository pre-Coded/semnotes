import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import "firebase/database"
import "firebase/storage"


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
} from "firebase/database";

import { collection, getDocs, getFirestore,
} from 'firebase/firestore'

import { getStorage, uploadBytes, getDownloadURL, ref as storageRef
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
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, []);


    const [detailsOfUser, setDetails] = useState({
        branch : "",
        sem : "",
        sub : ""
    })

    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const signUpWithEmailAndPassword = async (email, password) => {
        setLoading(prev => !prev);
        await createUserWithEmailAndPassword(fireBaseAuth, email, password);
        setLoading(prev => !prev);
        navigate('/');
    };

    const signInWithGoogle = async () => {
        setLoading(prev => !prev);
        await signInWithPopup(auth, googleProvider);
        setLoading(prev => !prev);
    };

    const signInUser = async (email, pass) => {
        setLoading(prev => !prev);
        await signInWithEmailAndPassword(auth, email, pass).then(() => {
            navigate('/');
            setLoading(prev => !prev);
        }).catch(() => {
            alert("Enter valid credentials.");
        })
    }

    const handleSignOut = async () => {
        setLoading(prev => !prev);
        await signOut(auth).then(() => {
            setUser(null);
            navigate('/')
        })
        setLoading(prev => !prev);
    }

    const handleUploads = async (year, sem, syllabus) => {
        // setLoading(prev => !prev);

        // const syllabusRef = ref(storage, `${branch}/${year}/${sem}/${subject}/${Date.now()}-${file.name}`);
        // const uploadResult = await uploadBytes(syllabusRef, file);

        // const db = getDatabase();

        // return await ref(db, `${branch}/${year}/${sem}/${subject}/${type}`).push().set(data).then(()=>{
        //     alert("sucessful");
        // })

        // updates

        // const newPostKey = push(child(ref(db), `${branch}/${year}/${sem}/${subject}/${type}`)).key;
        // const updates = {};
        // updates [`${branch}/${year}/${sem}/${subject}/${type}/`+ newPostKey] = {link : data};
        // return await update(ref(db), updates).then(()=>{
        //     setLoading( prev => !prev);
        //     alert("Successfull");
        // }).catch(()=>{
        //     alert("Unsuccessfull");
        // })

        // getting already existing value;

        // await get(child(ref(db), `${branch}/${year}/${sem}/${subject}/${type}`)).then(async (snapshot) => {
        //     if (snapshot.exists()) {
        //         const arr = (snapshot.val().link);
        //         arr.push(data);
        //         return await update(ref(db, `${branch}/${year}/${sem}/${subject}/${type}`),
        //             { link: arr, }
        //         ).then(() => {
        //             setLoading(prev => !prev); alert("File is successfully uploaded.");
        //         })
        //     }

        //     const arr = [data];

        //     return await set(ref(db, `${branch}/${year}/${sem}/${subject}/${type}`), {
        //         link: arr,
        //     }).then(() => { setLoading(prev => !prev); alert("File is successfully uploaded.") }).catch(() => { alert("File wasn't uploaded successfully.") })
        // })

        const imageRef = storageRef(storage, `Syllabus/Year${year}/Sem${sem}/${syllabus.name}`);
        return await uploadBytes(imageRef,syllabus).then((url)=>{
            console.log(url);
        })
    }

    const getSyllabusURL = async (path)=>{
        const fileRef = storageRef(storage, path);
        try {
          return await getDownloadURL(fileRef);
        } catch (error) {
          console.error('Error getting syllabus URL:', error);
          throw error;
        }

    }
    
    const getVideoLinks = (branch,  subject) => {
        return getDocs(collection(firestore, `/Information Technology/DAA/Video-Links/`));
    }
    
    const isLoggedIn = user ? true : false;

    return (
        <FireBaseContext.Provider value={{
            signUpWithEmailAndPassword, 
            signInWithGoogle, 
            handleUploads, 
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
        }}>
            {props.children}
        </FireBaseContext.Provider>
    );
};
