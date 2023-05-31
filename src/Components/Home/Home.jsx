import React , {useState}from 'react'
import Downloads from './Downloads'
import Feed from './Feed'

const Home = () => {

  const [width, setWidth] = useState(100);

  const handleWidth = () =>{
    console.log("clicked");
    console.log(width);
    if(width === 0) setWidth(100);
    else setWidth(0);
  }

  return (
    <div className='fade-bg h-screen w-screen relative'>
        <Feed handleWidth = {handleWidth} />
        <Downloads width = {width} handleWidth = {handleWidth}/>
    </div>
  )
}

export default Home