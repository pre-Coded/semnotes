import React from 'react'
import { useEffect } from 'react'
import { useFireBase, firestore } from '../../utilities/Firebase'

import {
    collection, doc, setDoc, getDocs, getFirestore,
    onSnapshot,
    FieldValue,
    serverTimestamp,
    addDoc,
    orderBy,
    query
} from 'firebase/firestore'
import { useState } from 'react'

const Comments = ({postId}) => {

    const [commentList, setCommentList] = useState("")

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 100000);

        const chatCollectionRef = collection(firestore, `Information-Tech/Post/${postId}`);
        const unsubscribe = onSnapshot(
            query(chatCollectionRef, orderBy("createdAt")), // Add the orderBy clause here
            (snapshot) => {
                const messages = snapshot.docs.map((doc) => doc.data());
                console.log(messages);
                setCommentList(messages);
            }
        );

        return () => {
            unsubscribe();
            clearInterval(interval);
        }
    }, [])



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


  return (
    <div className='max-h-60 w-full flex flex-col space-y-2 p-2 overflow-y-scroll hide-scrollbar'>
        {
            commentList !== "" && commentList.map((comment)=>{
                return (
                    <div className='flex flex-col border-b-2 border-b-[#121212]'>
                        <div className='w-full flex justify-between items-center text-sm'>
                            <span className='main-text'>{comment.username}</span>
                            <span className='text-[10px] para-text'>{time(comment.createdAt)}</span>
                        </div>
                        <div className='para-text text-sm justify-start items-center flex'>
                            {comment.text}
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Comments