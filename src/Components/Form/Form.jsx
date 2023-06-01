import React, { useRef, useState } from 'react'
import {MdArrowDropDownCircle} from 'react-icons/md'
import { useFireBase } from '../../utilities/Firebase';

const Form = () => {
    const ref = useRef(null);

    const firebase = useFireBase();

    const [details, setDetails] = useState({ year : "", branch : "", sem : "", sub : "", desc : ""});

    const handleDetails = (event)=> {
        setDetails({...details, [event.target.name] : event.target.value})
    }

    const [file, setFile] = useState(null);

    const handleUploads = async ()=> {
        await firebase.handleUploads(details.year, details.sem, details.branch, details.sub, details.desc, file);
        setDetails({...details, year : "", branch : "", sem : "", sub : "", desc : ""});
        setFile(null);
    }

    const yearList = [1,2,3,4]
    const semList = [1,2]
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

    const branchList = ["Bio Technology ",
    "Chemical Engineering ",
    "Civil Engineering ",
    "Computer Science",
    "Electronics & Communication",
    "Electrical Engineering ",
    "Instrumentation and Control",
    "Industrial and Production",
    "Information Technology ",
    "Mechanical Engineering",
    "Textile Technology"
    ]

  return (
    <div className='fade-bg relative text-white hide-scrollbar overflow-y-scroll p-2 h-full w-full scroll-smooth'>

        <div className='flex flex-col space-y-4 fade-bg'>
        <h1 className='text-gray-400 text-xl'>Upload Your Resource..</h1>

        <div className='relative w-full h-full p-2 flex flex-col space-y-10'>

                <div></div>
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
                
                <div className='flex flex-col space-y-3 p-4 relative'>
                    <div className ="relative w-full h-16">
                    <button className='text-black bg-white absolute w-full h-full rounded-md text-2xl'>{ !file ? "Choose File" : "File Selected"}</button>
                    <input onChange={(event) =>{
                        setFile(event.target.files[0]);
                    }} className='absolute opacity-0 w-full h-full' ref={ref} type="file" name="" id="" /></div>

                    <input onChange={handleDetails} name = "desc" value={details.desc} type="text" id="" placeholder='Short Description about the upload..' className='w-full outline-none text-black px-2 py-4 rounded-lg shadow-lg'/>

                    <button onClick={handleUploads} className='bg-blue-500 px-10 py-4 rounded-lg absolute -bottom-16 left-1/2 -translate-x-1/2' type='submit'>Submit</button>
                </div>
        </div>

        

        </div>
    </div>
  )
}

export default Form