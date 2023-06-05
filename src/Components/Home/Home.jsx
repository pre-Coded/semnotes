import React , {useState, useRef}from 'react'
import Downloads from './Downloads'
import Feed from './Feed'
import NoteHistory from './NotesHistory';


const Home = () => {
  const ref = useRef(null);

  const [downloadsWidth, setDownloadsWidth] = useState(100);
  const [noteHistoryWidth, setNoteHisWidth] = useState(100);

  const handleWidth = () =>{
    return downloadsWidth === 0 ? setDownloadsWidth(100) : setDownloadsWidth(0);
  }
  const handleNoteWidth = () =>{
    return noteHistoryWidth === 0 ? setNoteHisWidth(100) : setNoteHisWidth(0);
  }

  console.log("running Home js");

  return (
    <div className='h-screen w-screen relative overflow-x-hidden hide-scrollbar overflow-y-scroll'>
        <Feed handleWidth={handleWidth} handleNoteWidth ={handleNoteWidth} />
    </div>
  )
}

export default Home