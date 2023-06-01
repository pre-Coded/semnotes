import React from 'react'
import { useState } from 'react'
import {MdArrowDropDownCircle} from 'react-icons/md'
import { useFireBase } from '../../utilities/Firebase'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const firebase = useFireBase();
    const navigate = useNavigate();

    const userName = "Student"

    const [details, setDetails] = useState({ year : "", branch : "", sem : "", sub : ""});

    const handleDetails = (event)=> {
        setDetails({...details, [event.target.name] : event.target.value})
    }

    const yearList = [1,2,3,4]
    const semList = [1,2]

    const branchList = [
    "Bio Technology ",
    "Chemical Engineering ",
    "Civil Engineering ",
    "Computer Science",
    "Electronics & Communication",
    "Electrical Engineering ",
    "Instrumentation and Control",
    "Industrial and Production",
    "Information Technology",
    "Mechanical Engineering",
    "Textile Technology",
    ]



    const informationTech = [
        [
            [
                "APPLIED PHYSICS-A",
                "BEC",
                "CP",
                "APPLIED MATHEMATICS-A",
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
            ]
        ], 
        [
            [
                "OOPS",
                "DSA",
                "DCN",
                "DBMS",
                "NM",
            ],
            [   
                "ALGORITHM",
                "JAVA PROGRAMMING",
                "DATA MINING",
                "FLAT",
                "OPERATING SYSTEM",
            ]
        ],
        [
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
            ]
        ], 
        [
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
    ]

    const handleSubmit = () =>{
        firebase.handleSelected(details);
        navigate('/semselected');
    }


  return (
    <div className='p-4 fade-bg text-white h-full overflow-y-scroll hide-scrollbar'>
        <div className=''>
            <h1>Welcome <span className='text-2xl font-bold'>{userName}</span></h1>
        </div>

        <div className='relative mt-8 p-4 flex flex-col space-y-12'>
                <div className="relative border-2 border-black w-full flex justify-center items-center">
                    <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.year ? "Year " + details.year : <span className='flex items-center space-x-4'><span>Select Year</span> <MdArrowDropDownCircle/></span>} </h1>

                    <select onChange={handleDetails} name="year" className='outline-none text-white rounded-md w-full opacity-0'  id="">
                        <option value="N/A">Select Year</option>
                        {   
                            yearList.map((year) =>{
                                return <option className='text-2xl' value={year}>Year {year}</option>
                            })
                        }
                    </select>
                </div>

                <div className="relative w-full flex justify-center items-center">
                <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.branch ? details.branch : <span className='flex items-center space-x-4'><span>Select Branch</span> <MdArrowDropDownCircle/></span>}</h1>
                    <select onChange={handleDetails} name ="branch" className='outline-none text-white rounded-md w-full opacity-0' id="">
                        <option selected>This is for IT currently</option>
                        <option value="Information Technology">Information Technology</option>
                    </select>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.sem ? "Semester " + details.sem : <span className='flex items-center space-x-4'><span>Select Semester</span> <MdArrowDropDownCircle/></span>}</h1>
                    <select onChange={handleDetails} name="sem" className='outline-none text-white rounded-md w-full opacity-0' id="">
                        <option value="N/A">Select Semester</option>
                        {
                            semList.map((sems) =>{
                                return <option value={sems}>Semester {sems}</option>
                            })
                        }
                    </select>
                </div> 
                    {
                        details.year === "" || details.sem === "" || details.branch === "" ? "" :
                        <div className="relative w-full flex justify-center items-center">
                        <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.sub ? details.sub : <span className='flex items-center space-x-4'><span>Choose Subject</span> <MdArrowDropDownCircle/></span>}</h1>
                        <select onChange={handleDetails} name="sub" className='outline-none text-white rounded-md w-full opacity-0' id="">
                            <option value="N/A">Choose Subject</option>
                        {
                            informationTech[details.year-1][details.sem-1].map((sub) =>{
                                return <option value={sub}>{sub}</option>
                            })
                        }
                        </select>
                        </div>
                    }

                <div className='relative w-full h-full'>
                <button onClick={handleSubmit} className='bg-blue-500 px-6 py-4 w-[60%] left-1/2 -translate-x-1/2 absolute rounded-lg' type='submit'>Submit</button>
                </div>

            </div>
    </div>
  )
}

export default Feed
