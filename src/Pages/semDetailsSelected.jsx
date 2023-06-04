import { connectStorageEmulator } from 'firebase/storage'
import React, {useEffect, useState} from 'react'
import { AiOutlineConsoleSql, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'

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

    const info = firebase.detailsOfUser;
    const [videoLink, setVideoLink] = useState(null);
    const [syllabusURL, setSyllabusURL] = useState("");
    
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

    const getVideoLinks = (sub) => {
        console.log(firebase.detailsOfUser);
        firebase.getData(`ExamRescue/Information Technology/Video-Links/Sem${Number(firebase.detailsOfUser.sem)}/${sub}`).then((snapshot)=>{
            console.log(snapshot.val());
        }).catch((err)=>{
            console.log("err");
        })
    }

    const subjectList = [
            [
                "APPLIDE-A",
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
                "MP",
                "ENVIRONMENTAL STUDIES"
            ],
            [
                "OOPS",
                "DSA",
                "DCN",
                "DBMS",
                "NM",
            ],
            [   
                "DAA",
                "JP",
                "DM",
                "FLAT",
                "OS",
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

    const handleSubjectSelection = (e)=>{
        firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value});
        getVideoLinks(e.target.value)
    }

    return (
        <div className='h-screen scroll-smooth w-screen flex flex-col text-white p-2 space-y-3 overflow-x-hidden relative overflow-y-scroll'>
            
            <div className='w-full h-full scroll-smooth overflow-x-hidden overflow-y-scroll hide-scrollbar flex flex-col text-white space-y-3'>
                <div className='flex flex-col items-center justify-center p-2 space-y-4 border-b-[1px] pb-6'>
                    <div className=''>{"Branch : " + firebase.detailsOfUser.branch}</div>
                    <div className='flex items-center space-x-4'>
                        <span>{"Semester : " + firebase.detailsOfUser.sem}</span>
                    </div>
                    <div className='h-12 w-48 relative bg-white text-black flex items-center justify-center'>
                        <div>{firebase.detailsOfUser.sub !== "" ? firebase.detailsOfUser.sub : "Choose Subject"}</div>
                        <select name='sub' onChange={(e)=>{
                            firebase.setDetails({...firebase.detailsOfUser, [e.target.name] : e.target.value});
                            getVideoLinks(e.target.value)
                        }} className='absolute opacity-0 h-full w-full bg-transparent'>
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
                <div className='flex flex-col py-2 px-3 border-[0.5px] border-gray-300'>
                    <span className='border-b-[0.5px] pb-2'>Recommended Channels</span>
                    <div className='flex flex-col overflow-hidden'>
                        <ol className='list-inside overflow-x-hidden overflow-y-scroll list-decimal flex flex-col items-start justify-center p-2'>
                            {
                                
                            }
                        </ol>
                    </div>
                </div>

                <div className='p-2'>
                    <div>Notes</div>
                    <ol className='list-decimal flex flex-col items-start justify-center pl-4 mt-4 space-y-4'>
                        <li className='w-full pl-2'>
                            <div className='flex items-center justify-between w-full'><a href='#' target='_blank' className='px-6 py-2 bg-white text-black rounded-lg'>Preview</a> <button className="px-6 py-2 bg-green-500 text-white rounded-lg">Download</button></div>
                        </li>
                        <li className='w-full pl-2'>
                            <div className='flex items-center justify-between w-full'><a href='#' target='_blank' className='px-6 py-2 bg-white text-black rounded-lg'>Preview</a> <button className="px-6 py-2 bg-green-500 text-white rounded-lg">Download</button></div>
                        </li>
                        <li className='w-full pl-2'>
                            <div className='flex items-center justify-between w-full'><a href='#' target='_blank' className='px-6 py-2 bg-white text-black rounded-lg'>Preview</a> <button className="px-6 py-2 bg-green-500 text-white rounded-lg">Download</button></div>
                        </li>
                    </ol>
                </div>

                <div className='p-2'>
                    <div>Previous Year Paper</div>
                    <ol className='list-decimal flex flex-col items-start justify-center pl-4 mt-4 space-y-4'>
                        <li className='w-full pl-2'>
                            <li className='flex items-center justify-between w-full'><a href='#' target='_blank' className='px-6 py-2 bg-white text-black rounded-lg'>Preview</a> <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Download</button></li>
                        </li>
                        <li className='w-full pl-2'>
                            <li className='flex items-center justify-between w-full'><a href='#' target='_blank' className='px-6 py-2 bg-white text-black rounded-lg'>Preview</a> <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Download</button></li>
                        </li>
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