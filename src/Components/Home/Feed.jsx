import React from 'react'
import CardStack from './CardStack'
import TopBar from './TopBar'

const Feed = () => {

  return (
    <div className='text-white h-full w-full flex flex-col items-center justify-center relative'>
        <TopBar />
        <div className='bg-transparent h-[50%] w-[80%] p-4 relative flex items-center justify-center overflow-hidden'>
          <CardStack/>
        </div>
    </div>
  )
}

export default Feed