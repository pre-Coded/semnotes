import { async } from '@firebase/util'
import { connectStorageEmulator } from 'firebase/storage'
import React, {useEffect, useState} from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { CgPlayListSearch } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'

import youtube from '../YoutubeApi/youtube'
import URL from '../YoutubeApi/searchApi'
import axios from 'axios'

const SemDetailsSelected = () => {
    const navigate = useNavigate();
    const firebase = useFireBase();

    // const retrieveData = async () =>{
    //     const email = firebase.user.email;
    //     const userEmail = email.substring(0, email.indexOf(".com"));
    //     await firebase.getData(`ExamRescue/${userEmail}/academicDetails`).then((snapshot)=>{
    //         const {branch, sem} = snapshot.val();
  
    //         firebase.setDetails({
    //             branch : branch,
    //             sem : sem,
    //             sub : ""
    //         });
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    //   }
  
    //   useEffect( () =>{
    //       console.log("runningSemdetails");
    //       retrieveData();
    //   }, [firebase.user])
    
    // useEffect( () => {
    //     firebase.getVideoLinks(info.branch, info.sub).then( (docs) => {
    //         console.log(docs);
    //     }).catch((err) =>{
    //         setVideoLink(null);
    //         console.log(err);
    //     })

    //     firebase.getSyllabusURL(`Syllabus/Sem${info.sem}/Sem${Number(info.year)+Number(info.sem)}.pdf`).then((url)=>{
    //         setSyllabusURL(url);
    //     }).catch((err) => console.log(err))

    // }, [])

    // firebase.getSyllabus(info.year, info.sem).then((url)=>{
    //     setSyllabusURL(url);
    // }).catch((err)=>{console.log(err)})

    // if(window.onload){
    //     const email = firebase.user.email;
    //     const userEmail = email.substring(0, email.indexOf(".com"));
    //     firebase.getData(`ExamRescue/${userEmail}/academicDetails`).then((snapshot)=>{
    //         const {branch, sem} = snapshot.val();

    //         firebase.setDetails({
    //             branch : branch,
    //             sem : sem,
    //             sub : ""
    //         });
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }

    useEffect( ()=>{
        console.log("semselected");
            console.log("logged in");
            const email = firebase.user.email;
            const userEmail = email.substring(0, email.indexOf(".com"));
            firebase.getData(`ExamRescue/${userEmail}/academicDetails`).then((snapshot)=>{
                const {branch, sem} = snapshot.val();

                firebase.getSyllabusURL(`Syllabus/Sem${sem}.pdf`).then((url)=>{
                    firebase.setsyllabusURL(url);
                });

                firebase.setDetails({
                    branch : branch,
                    sem : sem,
                    sub : ""
            });
        })
    }, [])

    const subjectList = [
            [
                "APPLIED PHYSICS-A",
                "BEC",
                "CP",
                "AM-A",
                "MPP",
                "EGC"
            ],
            [
                "APPLIED CHEMISTRY-A",
                "APPLIED MATHEMATICS-B",
                "BEC-2",
                "ENGLISH REPORT",
                "MANUFACTURING PROCESS",
                "ENVIRONMENTAL STUDIES"
            ],
            [
                "OBJECT ORIENTED PROGRAMMING",
                "DATA STRUCTURE",
                "DATA COMMUNICATION AND NETWORKING",
                "DATABASE MANAGEMENT SYSTEM",
                "NUMERICAL MATHEMATICS",
            ],
            [   
                "ALGORITH",
                "JAVA PROGRAMMING",
                "DATA MINING",
                "FLAT",
                "OPERATING SYSTEM",
            ],
            [   
                "CNS",
                "SEC",
                "WDT",
                "CGA",
                "DM",
                "DE-I",
            ],
            [
                "SCC",
                "OOM",
                "MAD",
                "ML",
                "DE-II",
                "OE-I",
            ],
            [   
                "Software Testing",
                "Cloud Testing",
                "DE-III",
                "DE-IV",
                "OE-II",
            ],
            [
                "SP",
                "E-COMM",
                "DSSM",
                "DE-V",
                "OE-III",
            ]
    ]


    const allowedDomains = [
        "www.tutorialspoint.com",
        "ocw.mit.edu",
        "en.wikipedia.org",
        "open.lib.umn.edu",
        "www.geeksforgeeks.org",
        "www.javatpoint.com",
    ]

    const handleSubjectSelection = async (e)=>{
        firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value});

        const response = await youtube.get('/search', {
            params: {
                q : e.target.value,
                type : "playList",
                order : "rating",
            }
        })
        firebase.setVideoList(response.data.items);

        await axios.get(`${URL}${e.target.value}`).then((res)=>{
            console.log(res.data.items);
            firebase.setNoteList(res.data.items);
        });
    }

    return (
        <div className='h-screen p-2 scroll-smooth w-screen flex flex-col text-white space-y-3 overflow-hidden relative bg-black'>
            
            <div className='w-full space-y-2 h-full scroll-smooth overflow-x-hidden overflow-y-scroll hide-scrollbar flex flex-col text-white '>

                <div className='flex flex-col rounded-b-lg border-b-[2px] items-center justify-center pt-8 space-y-4 pb-6 sticky top-0 bg-black z-10'>
                    <div className=''>{"Branch : " + firebase.detailsOfUser.branch}</div>
                    <div className='flex items-center space-x-4'>
                        <span>{"Semester : " + firebase.detailsOfUser.sem}</span>
                    </div>
                    <div className='h-12 w-48 bg-white text-black flex items-center justify-center overflow-hidden rela'>
                        <div className=''>{firebase.detailsOfUser.sub !== "" ? "Another ?" : "Choose Subject"}</div>
                        <select name='sub' onChange={handleSubjectSelection} className='absolute opacity-0 h-full w-full bg-transparent'>
                            <option defaultValue={""}>Choose Subject</option>
                            {
                                subjectList[Number(firebase.detailsOfUser.sem)-1] ? 
                                subjectList[Number(firebase.detailsOfUser.sem)-1].map((sub)=>{
                                    return <option value={sub}>{sub}</option>
                                }) : 
                                ""
                            }
                        </select>
                    </div>
                </div>

                <div className='flex justify-start items-center space-x-3 py-2 px-3'>
                    <span> Syllabus : </span>
                    <a href={firebase.syllabusURL === null ? "#" : firebase.syllabusURL}  className='px-6 py-2 bg-white text-black rounded-lg' target="_blank" download>Preview</a>
                </div>

                <div className='flex flex-col border-[0.5px] border-gray-300 h-[50%] relative'>
                    <span className='border-b-2 p-2 relative overflow-hidden whitespace-nowrap text-ellipsis'>{firebase.detailsOfUser.sub === "" ? "Youtube Videos for" : firebase.detailsOfUser.sub}</span>

                    <div className='overflow-y-scroll h-full w-full relative hide-scrollbar'>

                        <div className='p-2'>
                            {
                                firebase.videoList === null ? 
                                "" : 
                                firebase.videoList.map((video)=>{
                                    console.log(video);
                                    const videoSrc = `https://www.youtube.com/playlist?list=${video.id.playlistId}`;
                                    return <a href={videoSrc} target="_blank" className={`flex items-center mt-2`}>
                                        <img src={video.snippet.thumbnails.default.url} className='object-cover aspect-square border-2 p-[3px] h-16 rounded-full'/>
                                        <div className='text-white ml-2 flex flex-col'>
                                            <span>{video.snippet.channelTitle}</span>
                                            <span href={videoSrc} target="_blank">
                                                {video.snippet.description.substring(0,30)}
                                            </span>
                                        </div>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='h-[50%] border-[0.5px] border-gray-300 relative flex flex-col'>
                    <div className='border-b-2 p-2 overflow-hidden w-full'>Reference</div>

                    <div className='overflow-y-scroll h-full w-full relative'>
                    <ul className='flex flex-col p-2 mt-4 space-y-4 text-white overflow-x-hidden overflow-y-scroll hide-scrollbar'>
                        {   

                            firebase.noteList === null ? "" :
                            firebase.noteList.map((notes)=>{
                                const displayLink = notes.displayLink;

                                if(allowedDomains.some( domain => displayLink.includes(domain))){
                                    return <li className='w-full flex items-center'>
                                        <AiOutlineLink className='border-2 text-white text-3xl rounded-full'/>
                                        <a href={notes.link} target="_blank" className=' ml-2 flex text-blue-700 underline visited:text-green-500 items-center justify-between w-full'><span>{displayLink}</span></a>
                                    </li>
                                }
                            })
                        }
                    </ul>
                    </div>
                </div>

                <div className='p-2'>
                    <div>Previous Year Paper</div>
                    <ol className='list-decimal flex flex-col items-start justify-center pl-4 mt-4 space-y-4'>
                        <li className='w-full pl-2'>
                            <li className='flex items-center justify-between w-full'><a href='#' target='_blank' className='px-6 py-2 bg-white text-black rounded-lg'>Preview</a> <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Download</button></li>
                        </li>
                    </ol>
                </div>
            </div>
            <div className='h-16 w-full'></div>
        </div>
    )
}

export default SemDetailsSelected 