import React from 'react'
import TopBar from './TopBar'

const Feed = ({handleWidth, handleNoteWidth}) => {

  return (
    <div className='text-white flex flex-col'>
        <TopBar handleWidth = {handleWidth} handleNoteWidth ={ handleNoteWidth } />
        <div className='p-4 first-letter:text-2xl first-letter:italic'>
        At semNotes, we are dedicated to assisting you in optimizing your exam preparation process. We provide comprehensive resources tailored to your semester's syllabus, ensuring that you have access to the best available YouTube courses, recommended reference books, and valuable notes shared by our fellow students. Our aim is to eliminate last-minute time wastage by equipping you with the necessary materials well in advance. By utilizing our platform, you can effectively manage your study schedule, enhance your understanding of the subjects, and approach your exams with confidence and preparedness.
        </div>
    </div>
  )
}

export default Feed