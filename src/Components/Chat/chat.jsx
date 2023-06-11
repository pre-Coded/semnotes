import React, { useEffect } from 'react'
import {
    collection, doc, setDoc, getDocs, getFirestore,
    onSnapshot,
    FieldValue,
    serverTimestamp,
    addDoc,
    orderBy,
    query
} from 'firebase/firestore'

import {
    getDatabase,
    set,
    get,
    child,
    update,
    ref as dataBaseRef,
    onValue
} from "firebase/database";

import { FiSend } from 'react-icons/fi'


import { useFireBase, firestore, database } from '../../utilities/Firebase'
import { useState } from 'react';
import Bg from '../../assets/blankProfile.png'
import TopBar from '../Home/TopBar';

const Chat = () => {
    const firebase = useFireBase();

    const [topic, setTopic] = useState('');
    const [desc, setDesc] = useState('');

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 100000);


        const chatCollectionRef = collection(firestore, "Chats");
        const unsubscribe = onSnapshot(
            query(chatCollectionRef, orderBy("createdAt", "desc")), // Add the orderBy clause here
            (snapshot) => {
                const messages = snapshot.docs.map((doc) => doc.data());
                console.log(messages);
                firebase.setMessageList(messages);
            }
        );

        const databaseRef = dataBaseRef(database, `user/`);

        const onValueCallback = (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            firebase.setOnlineStatus(data);
        };

        const onError = (error) => {
            console.log('Error:', error);
            // Handle the error
        };

        const onValueSubscription = onValue(databaseRef, onValueCallback, onError);

        return () => {
            unsubscribe();
            clearInterval(interval);
            onValueSubscription();
        };

    }, []);

    const [loading, setLoading] = useState(false);
    const [expandTextArea, setTextArea] = useState(false);

    const postMessage = async (e) => {
        e.preventDefault();

        setTopic("");
        setDesc("");
        setTextArea(prev => !prev);
        setLoading(prev => !prev);
        try {
            await addDoc(collection(firestore, 'Chats'), {
                id: Date.now(),
                userId: firebase.user.uid,
                username: firebase.userDetails.username,
                email: firebase.user.email,
                topic: topic,
                desc: desc,
                createdAt: serverTimestamp(),
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
            setLoading(prev => !prev);

        } catch (error) {
            setLoading(prev => !prev);
            console.error(error);
        }
    };

    const time = (date) => {
        if (date === null) return `seconds ago`;

        const createdAt = date;

        const createdAtDate = new Date(createdAt.seconds * 1000);

        const timeDifference = currentDate - createdAtDate;


        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        if (daysDifference === -1) return `seconds ago`

        if (daysDifference === 0) {
            if (hoursDifference === 0) {
                return `${minutesDifference} m ago`;
            } else {
                return `${hoursDifference} h ago`
            }
        }

        return `${daysDifference} d ago`
    }

    const [expandedChatId, setExpandedChatId] = useState(null);

    return (
        <div className='main-text p-2 relative h-full w-full flex flex-col space-y-2 items-center overflow-hidden bg-[#121212]'>
            <div className='w-full border-b-2 border-b-[#121212] pb-2 flex items-center justify-center relative'>
                <h1 className='text-2xl'>ExamRescue</h1>
            </div>

            <div className='flex flex-col w-full h-full space-y-4 overflow-x-hidden overflow-y-scroll hide-scrollbar scroll-smooth relative bg-main'>

                <form onSubmit={postMessage} className='w-full lg:w-[40%] lg:h-[30%] lg:absolute lg:bottom-2 lg:right-2 bg-transparent rounded-md flex flex-col justify-end space-y-2 z-[100] text-sm fixed bottom-24 left-0 border-1 border-[#121212] px-2 bg-black neumorphic-chat'>
                    <div></div>
                    <div className='flex justify-center items-center h-14 bg-[#121212] border-b-2 border-b-black'>
                        <input type="text" onChange={(e) => {
                            setTopic(e.target.value);
                            if (e.target.value !== "" && expandTextArea === false) {
                                setTextArea(prev => !prev);
                            } else if (e.target.value === "" && expandTextArea === true) {
                                setTextArea(prev => !prev);
                            }
                        }} name="" id="" value={topic} placeholder='Enter Topic' className='h-full w-full p-3 bg-transparent outline-none' required />

                        <button typeof='submit' className='h-full aspect-square rounded-full shadow-inner shadow-blue-800 bg-blue-400 text-xl flex justify-center items-center cursor-pointer' type="submit" value="Post">
                            {
                                loading ?
                                    <div className='h-7 aspect-square rounded-full animate-roll'></div> :
                                    <FiSend className='text-white' />
                            }

                        </button>
                    </div>

                    {
                        expandTextArea ?
                            <textarea onChange={(e) => {
                                setDesc(e.target.value);
                            }} value={desc} name="" id="" cols="30" rows="4" className='resize-none p-2 bg-[#121212] outline-none' placeholder='Enter description' required></textarea> :
                            ""
                    }
                </form>

                {
                    firebase.messageList ?
                            firebase.messageList.map((data) => {

                            const isExpanded = expandedChatId === data.id;

                            return (
                            <div onClick={(e) => {
                                setExpandedChatId(data.id);
                            }} key={data.id} className='flex flex-row space-x-2 rounded-md p-1 sticky top-0.5 cursor-pointer bg-[#222222] neumorphic-chats shadow-lg shadow-[#121212]'>

                                <div className='h-16 aspect-square relative rounded-full p-0.5'>
                                    <img src={firebase.onlineStatus !== null ? firebase.onlineStatus[data.userId].profileUrl : Bg} className="h-full aspect-square rounded-full object-contain" />
                                    {
                                        firebase.onlineStatus !== null && firebase.onlineStatus[data.userId].status ?
                                            <div className='h-3 aspect-square rounded-full bg-green-500 brightness-125 absolute top-1 right-1' /> :
                                            ""
                                    }
                                </div>

                                <div className='w-full flex flex-col space-y-1 mt-0.5 overflow-hidden'>
                                    <div className='flex flex-row items-center justify-between pr-2'>
                                        <span className='text-sm main-text'>{data.username ? data.username : data.email}</span>
                                        <span className='main-text text-[10px] para-text ml-2'>{time(data.createdAt)}</span>
                                    </div>
                                    <div className='flex flex-col space-y-0.5'>
                                        <div className='flex space-x-2 text-sm'>
                                            <span className='para-text'><span className='main-text'>Topic : </span>
                                                {data.topic}
                                            </span>
                                        </div>
                                        {
                                            isExpanded ? <div className='flex space-x-2 text-sm'>
                                                <span className='para-text'><span className='main-text font-bold'>Description : </span>
                                                    {data.desc}
                                                </span>
                                            </div> :
                                                ""
                                        }
                                    </div>
                                </div>
                            </div>
                            )
                        })
                        :
                        "Nothing to Show"
                }

            </div>
            <div className='h-48 bg-black'></div>
        </div>
    )
}

export default Chat