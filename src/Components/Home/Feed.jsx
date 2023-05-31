import React from 'react'
import TopBar from './TopBar'

const Feed = ({handleWidth}) => {

  return (
    <div className='text-white flex flex-col'>
        <TopBar handleWidth = {handleWidth} />
        <div className='p-4'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex debitis consectetur, dignissimos, hic numquam beatae repellendus necessitatibus corporis veniam amet voluptatum autem totam, ratione mollitia recusandae. Asperiores neque temporibus provident?
        </div>
    </div>
  )
}

export default Feed