import React, { useRef } from 'react'
import { useState, useEffect } from 'react';

import { useFireBase, database } from '../../utilities/Firebase'
import {
    ref as dataBaseRef,
} from "firebase/database";

const AccountInfo = () => {
    const usernameRef = useRef();
    const semRef = useRef();

    const firebase = useFireBase();

    const academicDetails = firebase.academicDetails;
    const userDetails = firebase.userDetails;

    const [visible, setVisible] = useState(false);
    const [semVis, setVis] = useState(false);

    const [username, setUserName] = useState(userDetails.username);
    const [sem, setsem] = useState(academicDetails.sem);

    return (
        <div className='flex flex-col p-2 space-y-3 relative h-full w-full text-sm'>
            <div className='flex flex-col space-y-2  space-x-2 w-full'>

                <div className='w-full h-full flex'>
                    <div onClick={() => {
                        if (usernameRef.current || !visible) {
                            setVisible(prev => !prev);
                            usernameRef.current.disabled = false;
                            usernameRef.current.focus();

                            setUserName("");
                        }
                    }} className="w-full flex flex-row space-x-1">

                        <div className='py-1 px-2 bg-[#222222] main-text rounded-md shadow-md text-xs flex items-center justify-center'>Username :</div>

                        <input onChange={(e) => {
                            setUserName(e.target.value);
                        }} ref={usernameRef} disabled={true} type="text" className='text-xs bg-transparent outline-none p-2 para-text' value={!username ? firebase.userDetails.username : username} />

                    </div>

                </div>

                    {!usernameRef.current?.disabled && (
                        <div className='flex items-center justify-between text-sm space-x-2 w-full'>
                            <button onClick={async () => {
                                await firebase.updateData(`ExamRescue/${firebase.user.uid}/userDetails`, { username: username });
                                setVisible(prev => !prev);
                                usernameRef.current.disabled = true;
                            }} className={`bg-btn-success py-2 px-6 text-sm rounded-md ${visible ? "block" : "hidden"} `}>Save</button>

                            <button onClick={async () => {
                                setVisible(prev => !prev);
                                usernameRef.current.disabled = true;
                            }} className={`bg-btn-light text-black py-2 px-6 text-sm rounded-md ${visible ? "block" : "hidden"} `}>Cancle</button>
                        </div>
                    )}

            </div>

            <div className='flex items-center space-x-2'>
                <span className='py-1 px-2 bg-[#222222] main-text rounded-md shadow-md text-xs flex items-center justify-center'>Email :</span>
                <span className='text-sm para-text'>{firebase.user.email}</span>
            </div>
            <div className='flex items-center space-x-2'>
                <span className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Branch :</span>
                <span className='text-sm main-text'>{academicDetails ? academicDetails.branch : "Not set"}</span>
            </div>

            <div className='flex items-center space-x-2'>
                <div className='w-full flex justify-start items-center'>
                    <div onClick={() => {
                        if (!semVis) {
                            setVis(prev => !prev);
                            if (semRef.current) {
                                semRef.current.disabled = false;
                                semRef.current.focus();
                            }
                            setsem("");
                        }
                    }} >
                        <button className='py-2 px-3 bg-[#222222] main-text rounded-md shadow-md text-xs'>Semester :</button>
                        <input onChange={(e) => {
                            setsem(e.target.value);
                        }} ref={semRef} disabled={true} type="text" className='text-sm bg-transparent outline-none p-2 para-text' value={!sem ? firebase.userDetails.sem : sem} />
                    </div>
                </div>

                {!semRef.current?.disabled && (
                    <button onClick={async () => {
                        await firebase.updateData(`ExamRescue/${firebase.user.uid}/academicDetails`, { sem: sem });
                        setVisible(prev => !prev);
                        semRef.current.disabled = true;
                    }} className={`bg-btn-success py-2 px-6 text-sm rounded-md ${semVis ? "block" : "hidden"} `}>Save</button>
                )}

            </div>
        </div>
    )
}

export default AccountInfo
