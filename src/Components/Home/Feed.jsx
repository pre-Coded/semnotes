import React from 'react'
import TopBar from './TopBar'

const Feed = ({handleWidth, handleNoteWidth}) => {

  return (
    <div className='text-white flex flex-col'>
        <TopBar handleWidth = {handleWidth} handleNoteWidth ={ handleNoteWidth } />
        <div className='p-4 first-letter:text-2xl first-letter:italic'>
        
        </div>
    </div>
  )
}

export default Feed