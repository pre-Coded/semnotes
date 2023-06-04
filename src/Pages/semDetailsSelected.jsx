import { connectStorageEmulator } from 'firebase/storage'
import React, {useEffect, useState} from 'react'
import { AiOutlineConsoleSql, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFireBase } from '../utilities/Firebase'

const SemDetailsSelected = () => {
    const navigate = useNavigate();
    const firebase = useFireBase();

    const info = firebase.dselected;
    const [videoLink, setVideoLink] = useState(null);
    const [syllabusURL, setSyllabusURL] = useState("");
    
    useEffect( () => {
        firebase.getVideoLinks(info.branch, info.sub).then( (docs) => {
            console.log(docs);
        }).catch((err) =>{
            setVideoLink(null);
            console.log(err);
        })
        
        firebase.getSyllabusURL(`Syllabus/Year${info.year}/Sem${info.sem}/Sem${Number(info.year)+Number(info.sem)}.pdf`).then((url)=>{
            setSyllabusURL(url);
        }).catch((err) => console.log(err))

    }, [])

    // firebase.getSyllabus(info.year, info.sem).then((url)=>{
    //     setSyllabusURL(url);
    // }).catch((err)=>{console.log(err)})
    

    return (
        <div className='h-screen scroll-smooth w-screen z-[100] fade-bg flex flex-col text-white p-2 space-y-3 overflow-hidden relative'>
            <div className='w-full scroll-smooth overflow-x-hidden overflow-y-scroll hide-scrollbar flex flex-col text-white space-y-3'>
                <div className='flex items-center justify-center border-b-2 pb-3 sticky top-0 z-10 fade-bg'><AiOutlineLeft className='text-3xl absolute left-4 cursor-pointer' onClick={()=>{
                    navigate('/semnotes');
                }}/> <span className='text-xl'>semNotes</span> </div>

                <div className='flex flex-col items-center justify-center p-2 space-y-4 border-b-[1px] pb-6'>
                    <div className=''>Information Technology</div>
                    <div className='flex items-center space-x-4'>
                        <span>Year {info.year}</span>
                        <span>Semester {info.sem}</span>
                    </div>
                    <div>
                        Subject : {info.sub}
                    </div>
                </div>

                <div className='flex justify-start items-center space-x-3 py-2 px-3'>
                    <span> Syllabus : </span>
                    <a href={syllabusURL === "" ? "#" : syllabusURL}  className='px-6 py-2 bg-white text-black rounded-lg' target="_blank" download>Preview</a>
                </div>
                <div className='flex flex-col py-2 px-3 border-[0.5px] border-gray-300'>
                    <span className='border-b-[0.5px] pb-2'>Recommended Channels</span>
                    <div className='flex flex-col'>
                        <ol className='list-inside list-decimal flex flex-col items-start justify-center p-2'>
                            {
                                videoLink ? videoLink.map((link, index)=>{
                                    return <li className=''><a href={link} target="_blank" className='text-blue-600 underline'>{link}</a></li>
                                }) : "Nothing to show"
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
                <div className='h-16 w-full'></div>
            </div>
        </div>
    )
}

export default SemDetailsSelected 