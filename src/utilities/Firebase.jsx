import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import BlankPhoto from '../assets/blankProfile.png'

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";

import {
    getDatabase,
    set,
    get,
    child,
    update,
    ref as dataBaseRef,
    onValue,
} from "firebase/database";

import {
    collection, getDocs, getFirestore,query,onSnapshot,orderBy
} from 'firebase/firestore'

import {
    getStorage, uploadBytes, getDownloadURL, ref as storageRef, deleteObject
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

export const database = getDatabase(fireBaseApp);
const storage = getStorage(fireBaseApp);

export const firestore = getFirestore(fireBaseApp);

const FireBaseContext = createContext(null);
export const useFireBase = () => {
    return useContext(FireBaseContext);
}

export const FireBaseProvider = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [sub, setSub] = useState(null);
    const [messageList, setMessageList] = useState([]);

    const [onlineStatus, setOnlineStatus] = useState(null);

    const [academicDetails, setAcademicDetails] = useState({
        branch: "",
        sem: "",
    })

    const [userDetails, setUserDetails] = useState({
        profileUrl: BlankPhoto,
        username: "",
    })

    const [videoList, setVideoList] = useState([]);
    const [noteList, setNoteList] = useState([]);

    // const fetchData = async () =>{
    //     const databaseRef = dataBaseRef(database, `ExamRescue/${user.uid}`);
    //         const onValueCallback = (snapshot) => {
    //         const data = snapshot.val();

    //         console.log("Fetched Data is running.");
    //         const academic = data.academicDetails;
    //         const userDetails = data.userDetails;
    //         setAcademicDetails(academic);
    //         setUserDetails(userDetails);
    //     };
    //     const onError = (error) => {
    //         console.log('Error:', error);
    //     };
    //     onValue(databaseRef, onValueCallback, onError);
    // }

    // const [user, setUser] = useState(null);
    // const authStateChange = () => {
    //     onAuthStateChanged(auth, user => {
    //         if (user) {
    //             console.log("logged in");
    //             setUser(user);
    //         }
    //         else{
    //             console.log("logged out");
    //             setUser(null);
    //         }
    //     })     
    // }

    // useEffect(() => {
    //     if(!user) authStateChange();

    //     const fetchData = async () => {
    //       const databaseRef = dataBaseRef(database, `ExamRescue/${user.uid}`);
    //       const onValueCallback = (snapshot) => {
    //         const data = snapshot.val();

    //         console.log("Fetched Data is running.", data);
    //       };
    //       const onError = (error) => {
    //         console.log('Error:', error);
    //       };
    //       onValue(databaseRef, onValueCallback, onError);
    //     };

    //     if(user) fetchData();
    //   }, [ user ? dataBaseRef(database, `ExamRescue/${user.uid}`) : ""]);

    const [user, setUser] = useState(null);

    const authStateChange = () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log("logged in");
                setUser(user);
            } else {
                console.log("logged out");
                setUser(null);
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                authStateChange();
            } else {
                
                const databaseRef = dataBaseRef(database, `ExamRescue/${user.uid}`);
                const onValueCallback = (snapshot) => {
                    const data = snapshot.val();
                    setAcademicDetails(data.academicDetails);

                    if (data.userDetails) {
                        setUserDetails(data.userDetails);
                    } else {
                        setUserDetails({ ...userDetails, profileUrl: "", username: "" })
                    }

                };
                const onError = (error) => {
                    console.log('Error:', error);
                };

                onValue(databaseRef, onValueCallback, onError);


                // const chatCollectionRef = collection(firestore, "Chats");
                // onSnapshot(
                //     query(chatCollectionRef, orderBy("createdAt", "desc")),
                //     (snapshot) => {
                //         const messages = snapshot.docs.map((doc) => doc.data());
                //         console.log(messages);
                //         setMessageList(messages);
                //     }
                // );

                // const databaseRefSecond = dataBaseRef(database, `user/`);
                // const onValueCallbackSecond = (snapshot) => {
                //     const data = snapshot.val();
                //     console.log(data);
                //     setOnlineStatus(data);
                // };
                // const onErrorSecond = (error) => {
                //     console.log('Error:', error);
                //     // Handle the error
                // };
                // onValue(databaseRefSecond, onValueCallbackSecond, onErrorSecond);


                await updateData(`user/${user.uid}/`, {
                    status: true,
                })

            }
        };

        fetchData();
    }, [user, database, dataBaseRef]);

    const navigate = useNavigate();

    const signUpWithEmailAndPassword = async (email, password, branch, sem) => {
        setLoading(prev => !prev);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                fireBaseAuth,
                email,
                password
            );
            const user = userCredential.user;

            await putData(`ExamRescue/${user.uid}/academicDetails`, {
                branch: branch,
                sem: sem,
            })

            await updateData(`user/${user.uid}`, {
                profileUrl : BlankPhoto,
            })

            setUserDetails({ ...userDetails, profileUrl: BlankPhoto })

            setUser(user);
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
        await signInWithEmailAndPassword(auth, email, pass);
    }

    const handleSignOut = async () => {
        setLoading(prev => !prev);

        await signOut(auth).then(() => {
            setUser(null);
            setAcademicDetails({
                branch: "",
                sem: "",
            })

            setUserDetails({
                profileUrl: "",
                username: "",
            })

            setsyllabusURL(null);
            navigate('/')
        })

        await updateData(`user/${user.uid}/`, {
            status: false,
        })

        setLoading(prev => !prev);
    }

    const putData = async (path, data) => {
        return await set(dataBaseRef(database, path), data);
    }

    const getData = async (path) => {
        return await get(child(dataBaseRef(database), path))
    }

    const handleProfilePhotoUpload = async (userId, image) => {
        const extension = image.name.split(".").pop();
        const renameImage = userId + "." + extension;

        const imageRef = storageRef(storage, `ProfilePhoto/${renameImage}`);
        try {

            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef);

            const result = await updateData(`ExamRescue/${userId}/userDetails`, {
                profileUrl: url,
            })

            await updateData(`user/${userId}`, {
                profileUrl : url,
            })

            return result;
        } catch (error) {
            console.log("Error in saving:", error);
            throw error; // Rethrow the error to handle it in the caller function
        }
    };


    const [syllabusURL, setsyllabusURL] = useState(null);

    const getSyllabusURL = async (path) => {
        const fileRef = storageRef(storage, path);
        try {
            return await getDownloadURL(fileRef);
        } catch (error) {
            console.error('Error getting syllabus URL:', error);
            throw error;
        }

    }
    const getVideoLinks = async (branch, subject) => {
        setLoading(prev => !prev);
        await getDocs(collection(firestore, `/${branch}/${subject}/Video-Links/`));
        setLoading(prev => !prev);
    }

    const updateData = async (path, data) => {
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
            setUser,
            academicDetails,
            setAcademicDetails,
            userDetails,
            setUserDetails,
            sub,
            setSub,
            isLoggedIn,
            handleSignOut,
            signInUser,
            isLoading,
            setLoading,
            getVideoLinks,
            getSyllabusURL,
            putData,
            getData,
            syllabusURL,
            setsyllabusURL,
            handleProfilePhotoUpload,
            updateData,
            messageList, setMessageList,
            onlineStatus, setOnlineStatus,
            videoList, setVideoList,
            noteList, setNoteList,
        }}>
            {props.children}
        </FireBaseContext.Provider>
    );
};
