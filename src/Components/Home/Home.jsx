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

  return (
    <div className='fade-bg h-screen w-screen relative overflow-y-scroll'>
        <Feed handleWidth={handleWidth} />
        {/* <Downloads width={downloadsWidth} handleWidth={handleWidth} /> */}
        {/* <NoteHistory width={noteHistoryWidth} handleWidth ={handleNoteWidth}/> */}
    </div>
  )
}

export default Home