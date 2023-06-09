import React, {useEffect} from 'react'
import {
    collection,doc,setDoc, getDocs, getFirestore,
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


import { useFireBase, firestore, database } from '../../utilities/Firebase'
import { useState } from 'react';

const Chat = () => {
    const firebase = useFireBase();

    const [topic, setTopic] = useState('');
    const [desc, setDesc] = useState('');

    const [currentDate, setCurrentDate] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(()=>{
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
    

    const postMessage = async (e) => {
        e.preventDefault();

        try {
          await addDoc(collection(firestore, 'Chats'), {
            id : Date.now(),
            userId : firebase.user.uid,
            username : firebase.userDetails.username,
            email : firebase.user.email,
            topic : topic,
            desc : desc,
            date : Date.now(),
            createdAt: serverTimestamp(),
          });

          console.log('Message added successfully!');
        } catch (error) {
          console.error('Error adding message:', error);
        }
    };

    const time = (date) => {
        const firestoreDate = date;

        const postDate = new Date(firestoreDate);

        const timeDifference = currentDate.getTime() - postDate.getTime();

        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
        const minuteAgo = Math.floor(timeDifference / (1000 * 60));

        if(hoursAgo === 0){
            return `${minuteAgo} m`;
        }

        if(minuteAgo === 0) return `${hoursAgo} h`

        return `seconds ago`
    }

    const [expandedChatId, setExpandedChatId] = useState(null);

  return (
    <div className='main-text p-2 relative h-full w-full flex flex-col space-y-2 items-center overflow-hidden'>
        <div className='w-full border-b-2 flex items-center justify-center p-2'>
            <h1 className='text-2xl'>Recents</h1>
        </div>

        <div className='flex flex-col w-full h-full space-y-4 overflow-x-hidden overflow-y-scroll hide-scrollbar relative scroll-smooth'>
            <form onSubmit={postMessage} className='w-full bg-transparent rounded-md flex flex-col space-y-2'>
                <div></div>
                <input type="text" onChange={(e)=>{
                    setTopic(e.target.value);
                }} name="" id="" value={topic} placeholder='Enter Topic' className='h-12 p-3 w-full bg-main outline-none'/>
                <textarea onChange={(e)=>{
                    setDesc(e.target.value);
                }} value={desc} name="" id="" cols="30" rows="4" className='resize-none bg-main px-3 py-2 outline-none' placeholder='Enter description'></textarea>
                <input className='py-3 w-full bg-btn-success rounded-md text-xl flex justify-center items-center' type="submit" value="Post" />
            </form>

            {
                firebase.messageList ? 
                firebase.messageList.map((data)=>{

                    const isExpanded = expandedChatId === data.id;

                    return (
                        <div onClick={(e)=>{
                            setExpandedChatId(data.id);
                        }} key={data.id} className='flex flex-col space-y-2 bg-main rounded-md shadow-md p-2 sticky top-0.5'>
                            <div className='flex items-center justify-start space-x-2'>
                                {
                                    firebase.onlineStatus !== null && firebase.onlineStatus[data.userId].status ? 
                                    <span className='h-2 aspect-square rounded-full bg-green-400'></span> : 
                                    <span className='h-2 aspect-square rounded-full bg-red-500'></span>
                                }
                                <span className='text-[1rem] main-text'>{data.username ? data.username : data.email}</span>
                                <span className='text-[1rem] main-text text-sm para-text'>{time(data.date)}</span>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <div className='flex space-x-2 text-sm'>
                                    <span className='main-text'>Topic : </span>
                                    <span className='para-text'>{data.topic}</span>
                                </div>
                                <div className='flex space-x-2 text-sm'>
                                    <span className=''><span className='main-text'>Description : </span>
                                    {
                                        isExpanded ? data.desc : `${data.desc.slice(0, 20)}...`
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                "Nothing to Show"
            }

        </div>

        <div className='h-24'></div>
    </div>
  )
}

export default Chat