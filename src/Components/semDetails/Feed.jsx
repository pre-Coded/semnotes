import React from 'react'
import { useState } from 'react'
import {MdArrowDropDownCircle} from 'react-icons/md'

const Feed = () => {
    const userName = "Student"

    const [details, setDetails] = useState({ year : "", branch : "", sem : "", sub : ""});

    const handleDetails = (event)=> {
        setDetails({...details, [event.target.name] : event.target.value})
    }

    const yearList = [1,2,3,4]
    const semList = [1,2]
    const subjectsList = [
        [
            [

            ],
            [

            ]
        ],
        [
            [

            ],
            [

            ]
        ],
        [
            [

            ],
            [

            ]
        ],
        [
            [

            ],
            [

            ]
        ],
    ]

    const branchList = [
    "Bio Technology ",
    "Chemical Engineering ",
    "Civil Engineering ",
    "Computer Science",
    "Electronics & Communication",
    "Electrical Engineering ",
    "Instrumentation and Control",
    "Industrial and Production",
    "Information Technology ",
    "Mechanical Engineering",
    "Textile Technology",]

  return (
    <div className='p-4 fade-bg text-white h-full overflow-y-scroll'>
        <div className=''>
            <h1>Welcome <span className='text-2xl font-bold'>{userName}</span></h1>
        </div>

        <div className='relative mt-8 p-4 flex flex-col space-y-12'>


                <div className="relative border-2 border-black w-full flex justify-center items-center">
                    <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.year ? "Year " + details.year : <span className='flex items-center space-x-4'><span>Select Year</span> <MdArrowDropDownCircle/></span>} </h1>

                    <select onChange={handleDetails} name="year" className='outline-none text-white rounded-md w-full opacity-0'  id="">
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
                        {   
                            branchList.map((branch) =>{
                                return <option value={branch}>{branch}</option>
                            })
                        }
                    </select>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.sem ? "Semester " + details.sem : <span className='flex items-center space-x-4'><span>Select Semester</span> <MdArrowDropDownCircle/></span>}</h1>
                    <select onChange={handleDetails} name="sem" className='outline-none text-white rounded-md w-full opacity-0' id="">
                        {
                            semList.map((sems) =>{
                                return <option value={sems}>Semester {sems}</option>
                            })
                        }
                    </select>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <h1 className="w-full bg-white brightness-150 text-black text-xl absolute flex items-center justify-center rounded-lg shadow-lg py-3">{details.sub ? details.sub : <span className='flex items-center space-x-4'><span>Choose Subject</span> <MdArrowDropDownCircle/></span>}</h1>
                    <select onChange={handleDetails} name="sub" className='outline-none text-white rounded-md w-full opacity-0' id="">
                        {
                            subjectsList.map((sub) =>{
                                return <option value={sub}>{sub}</option>
                            })
                        }
                    </select>
                </div>
                
                <div className='relative w-full h-full'>
                <button className='bg-blue-500 px-6 py-4 w-[60%] left-1/2 -translate-x-1/2 absolute rounded-lg' type='submit'>Submit</button>
                </div>

            </div>
    </div>
  )
}

export default Feed
