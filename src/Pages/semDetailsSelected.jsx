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

    const [sub, setSub] = useState(null);

    const allowedDomains = [
        "www.tutorialspoint.com",
        "ocw.mit.edu",
        "en.wikipedia.org",
        "open.lib.umn.edu",
        "www.geeksforgeeks.org",
        "www.javatpoint.com",
    ]

    const handleSubjectSelection = async (e) => {
        setSub(e.target.value);

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
        <div className='h-screen p-2 scroll-smooth w-screen flex flex-col text-white space-y-3 relative bg-black'>

            <div className='text-white flex flex-col space-y-3 items-center justify-center h-full w-full'>

                {
                        sub === null  &&  <>
                        <div className='para-text text-[1rem]'>{"Branch : " + firebase.academicDetails.branch}</div>
                        <div className='para-text flex items-center space-x-4'>
                            <span>{"Semester : " + firebase.academicDetails.sem}</span>
                        </div>
                        <div className='py-4 px-24 bg-btn-primary main-text tracking-wider font-bold flex items-center justify-center overflow-hidden relative rounded-md shadow-md'>
                            <div className=''>
                                Choose Subject
                            </div>
                            <select name='sub' onChange={handleSubjectSelection} className='absolute opacity-0 h-full w-full bg-transparent'>
                                <option defaultValue={""}>Choose Subject</option>
                                {
                                    subjectList[Number(firebase.academicDetails.sem) - 1] ?
                                        subjectList[Number(firebase.academicDetails.sem) - 1].map((sub) => {
                                            return <option value={sub}>{sub}</option>
                                        }) :
                                        ""
                                }
                            </select>
                        </div>
                        </> 
                }
            </div>
            <div className='h-16 w-full'></div>
        </div>
    )
}

export default SemDetailsSelected 