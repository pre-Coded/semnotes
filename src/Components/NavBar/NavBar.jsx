import React from 'react'
import { Outlet, Link } from "react-router-dom";
import {AiFillHome} from 'react-icons/ai'
import {BsFillBookFill, BsCollection} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {MdAdd} from 'react-icons/md'
import { useRef, useState } from 'react';


const NavBar = () => {
    const [width, setWidth] = useState(200);

    const handleWidth = (event)=>{
        setWidth((event.target.id*72) + 200);
    }

  return (
    <div className='fixed bottom-0 w-full h-16 dark-bg z-10 md:w-[50%] lg:w-[30%]  md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:rounded-2xl
    md:bg-white/5
     md:backdrop-blur-md'>

        <ul className='flex justify-around items-center h-full w-full text-white relative text-3xl'>
            <li id="1" onClick={handleWidth} className=''>
                <Link to="/">
                    <AiFillHome/>
                </Link>
            </li>
            <li id="2">
                <Link to="/semnotes">
                    <BsFillBookFill/>
                </Link>
            </li>
            <li id="3" className='rounded-full border text-4xl shadow-sm shadow-white'>
                <Link to="/addresource">
                    <MdAdd/>
                </Link>
            </li>
            <li id="4">
                <Link to="/abtcollege">
                    <BsCollection/>
                </Link>
            </li>
            <li id="5">
                <Link to="/profile">
                    <CgProfile/>
                </Link>
            </li>
        </ul>

        <Outlet/>
    </div>
  )
}

export default NavBar
