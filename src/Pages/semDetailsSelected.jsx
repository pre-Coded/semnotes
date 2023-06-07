import { async } from '@firebase/util'
import { connectStorageEmulator } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        if (firebase.detailsOfUser.branch.length === 0) {
            const email = firebase.user.email;
            const userEmail = email.substring(0, email.indexOf(".com"));

            firebase.setLoading(prev => !prev);
            firebase.getData(`ExamRescue/${userEmail}/academicDetails`).then((snapshot) => {
                const { branch, sem } = snapshot.val();

                firebase.getSyllabusURL(`Syllabus/Sem${sem}.pdf`).then((url) => {
                    firebase.setLoading(prev => !prev);
                    firebase.setsyllabusURL(url);
                });

                firebase.setDetails({
                    branch: branch,
                    sem: sem,
                    sub: ""
                });
            }
            )
        }
    }, [])

    const subjectList = [
        [
            "APPLIED PHYSICS-A",
            "BEC",
            "COMPUTER PROGRAMMING",
            "APPLIED MATHEMATICS-A",
            "MANAGEMENT, PRINCIPLES, PRACTICES",
            "ENGINEERING GRAPHICS CADD"
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

    const handleSubjectSelection = async (e) => {
        firebase.setDetails({ ...firebase.detailsOfUser, [e.target.name]: e.target.value });

        firebase.setLoading(prev => !prev);

        await youtube.get('/search', {
            params: {
                q: e.target.value,
                type: "playList",
                order: "rating",
            }
        }).then(async (response) => {
            firebase.setVideoList(response.data.items);

            await axios.get(`${URL}${e.target.value}`).then((res) => {
                firebase.setLoading(prev => !prev);
                firebase.setNoteList(res.data.items);
            });
        })

    }

    return (
        <div className='h-screen p-2 scroll-smooth w-screen flex flex-col text-white space-y-3 overflow-hidden relative bg-black'>

            <div className='w-full space-y-2 h-full scroll-smooth overflow-x-hidden overflow-y-scroll hide-scrollbar flex flex-col items-center justify-center'>

                {
                    firebase.detailsOfUser.sub === "" ?
                        <>
                            <div className='para-text text-[1rem]'>{"Branch : " + firebase.detailsOfUser.branch}</div>
                            <div className='para-text flex items-center space-x-4'>
                                <span>{"Semester : " + firebase.detailsOfUser.sem}</span>
                            </div>
                            <div className='py-4 px-24 bg-btn-primary main-text tracking-wider font-bold text-black flex items-center justify-center overflow-hidden relative rounded-md shadow-md'>
                                <div className=''>
                                    Choose Subject
                                </div>
                                <select name='sub' onChange={handleSubjectSelection} className='absolute opacity-0 h-full w-full bg-transparent'>
                                    <option defaultValue={""}>Choose Subject</option>
                                    {
                                        subjectList[Number(firebase.detailsOfUser.sem) - 1] ?
                                            subjectList[Number(firebase.detailsOfUser.sem) - 1].map((sub) => {
                                                return <option value={sub}>{sub}</option>
                                            }) :
                                            ""
                                    }
                                </select>
                            </div>

                        </>
                        :
                        <div className={`${firebase.detailsOfUser.sub === "" ? "-z-100" : "h-full scale-100 z-100"} h-0 transition-all w-full flex flex-col space-y-4 scale-0`}>

                            <div></div>

                            <div className='flex flex-col items-center justify-center
                             space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4'>

                                <div className='py-4 w-full bg-btn-primary main-text tracking-wider font-bold text-black flex items-center justify-center overflow-hidden rounded-md shadow-md z-10 relative lg:h-14 lg:w-96'>
                                    <div className=''>
                                        Change Subject
                                    </div>
                                    <select name='sub' onChange={handleSubjectSelection} className='absolute opacity-0 h-full w-full bg-transparent'>
                                        <option defaultValue={""}>Change Subject</option>
                                        {
                                            subjectList[Number(firebase.detailsOfUser.sem) - 1] ?
                                                subjectList[Number(firebase.detailsOfUser.sem) - 1].map((sub) => {
                                                    return <option value={sub}>{sub}</option>
                                                }) :
                                                ""
                                        }
                                    </select>
                                </div>

                                <a href={firebase.syllabusURL === null ? "#" : firebase.syllabusURL} className='bg-btn-secondry main-text rounded-md font-bold tracking-wider flex items-center justify-center py-4 px-2 lg:w-96 lg:h-14 visited:bg-btn-success
                                ' target="_blank" download>Download Syllabus</a>

                            </div>

                            <div className='flex flex-col bg-main rounded-md shadow-md h-[50%] sticky top-0.5'>

                                <span className='bg-[#222222] rounded-md px-2 main-text py-4 relative overflow-hidden whitespace-nowrap text-ellipsis flex items-center'>{firebase.detailsOfUser.sub === "" ? "Youtube Videos for" : firebase.detailsOfUser.sub}</span>

                                <div className='overflow-y-scroll h-full w-full relative hide-scrollbar border-t-8 border-black'>

                                    <div className='p-2'>
                                        {
                                            firebase.videoList === null ?
                                                "No VideoPlaylist available" :
                                                firebase.videoList.map((video) => {
                                                    console.log(video);
                                                    const videoSrc = `https://www.youtube.com/playlist?list=${video.id.playlistId}`;
                                                    return <a href={videoSrc} target="_blank" className={`flex items-center mt-2 link visited:text-[#FF5722]`}>
                                                        <img src={video.snippet.thumbnails.default.url} className='object-cover aspect-square border-white border-[1px] p-[3px] h-16 rounded-full shadow-3xl shadow-[#111111]' />

                                                        <div className='ml-2 flex flex-col'>
                                                            <span>{video.snippet.channelTitle}</span>
                                                            <span href={videoSrc} target="_blank">
                                                                {video.snippet.description.substring(0, 30)}
                                                            </span>
                                                        </div>
                                                    </a>
                                                })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='w-full h-[30%] flex flex-col space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row items-start'>
                                
                                <div className='h-full flex  flex-col bg-main  rounded-md shadow-md relative w-full'>

                                    <div className='bg-[#222222] rounded-md px-2 main-text py-4 relative overflow-hidden whitespace-nowrap flex items-center text-ellipsis'>Reference</div>

                                    <div className='overflow-y-scroll h-full w-full relative hide-scrollbar border-t-8 border-black'>
                                        <div className='flex flex-col p-2  space-y-4 text-white overflow-x-hidden overflow-y-scroll hide-scrollbar'>
                                            {

                                                firebase.noteList === null ? "No Notes available" :
                                                    firebase.noteList.map((notes) => {
                                                        const displayLink = notes.displayLink;

                                                        if (allowedDomains.some(domain => displayLink.includes(domain))) {
                                                            return <a
                                                                href={notes.link} target="_blank"

                                                                className='w-full flex items-center link visited:text-[#ff5722]'>
                                                                <AiOutlineLink className='text-3xl' />
                                                                <span className=' ml-2 flex items-center justify-between w-full'><span>{displayLink}</span></span>
                                                            </a>
                                                        }
                                                    })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col h-full bg-main rounded-md shadow-md relative w-full'>

                                    <div className='bg-[#222222] rounded-md px-2 main-text py-4 relative overflow-hidden whitespace-nowrap flex items-center text-ellipsis'>Previous Year Papers</div>

                                    <div className='overflow-y-scroll h-full w-full relative hide-scrollbar border-t-8 border-black'>

                                        <div className='flex flex-col space-y-2 p-2'>


                                            <a
                                                href="#" target="_blank"
                                                className='w-full flex items-center link visited:text-[#ff5722]'>
                                                <AiOutlineLink className='text-3xl' />
                                                <span className=' ml-2 flex items-center justify-between w-full'><span>link1</span></span>
                                            </a>

                                            <a
                                                href="#" target="_blank"
                                                className='w-full flex items-center link visited:text-[#ff5722]'>
                                                <AiOutlineLink className='text-3xl' />
                                                <span className=' ml-2 flex items-center justify-between w-full'><span>link1</span></span>
                                            </a>

                                            <a
                                                href="#" target="_blank"
                                                className='w-full flex items-center link visited:text-[#ff5722]'>
                                                <AiOutlineLink className='text-3xl' />
                                                <span className=' ml-2 flex items-center justify-between w-full'><span>link1</span></span>
                                            </a>

                                        </div>
                                    </div>
                                </div>



                            </div>

                        </div>
                }
            </div>
            <div className='h-16 w-full'></div>
        </div>
    )
}

export default SemDetailsSelected 