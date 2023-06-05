import React from 'react'
import { Outlet, Link } from "react-router-dom";
import {AiFillHome} from 'react-icons/ai'
import {BsFillBookFill, BsCollection} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {MdAdd} from 'react-icons/md'
import { useRef, useState } from 'react';


const NavBar = () => {
    const [offset, setOffset] = useState("");

    const handleActive = (e)=>{
        const linkRect = e.target.getBoundingClientRect();
        const navBar = document.querySelector('#navbar');
        const navRect = navBar.getBoundingClientRect();

        const transformValue = `translateX(${linkRect.left-navRect.left}px) scaleX(1)`;
        setOffset(transformValue);
    }

    
  return (
    <div className='fixed bottom-2 w-[95%] rounded-lg h-16 bg-[#0E0C0A] backdrop-blur-lg z-10 md:w-[50%] lg:w-[30%]  md:bottom-6 left-1/2 -translate-x-1/2 md:rounded-2xl
    md:bg-white/5'>

        <ul id="navbar" className='grid grid-cols-5 place-items-center h-full w-full text-white relative text-3xl overflow-hidden border-x-[1px] rounded-md'>
            <div className={`h-[2px] rounded-md w-1/5 top-0 -left-5 lg:-left-7 bg-white transition-all absolute`} style={{transform : offset}}></div>
            <li onClick={handleActive} id="1" className='navlink'>
                <Link to="/">
                    <AiFillHome/>
                </Link>
            </li>
            <li onClick={handleActive} id="2" className='navlink'>
                <Link to="/semselected">
                    <BsFillBookFill/>
                </Link>
            </li>
            <li onClick={handleActive} id="3" className='rounded-full border text-4xl shadow-sm shadow-white navlink'>
                <Link to="/addresource">
                    <MdAdd/>
                </Link>
            </li>
            <li onClick={handleActive} id="4" className='navlink'>
                <Link to="/abtcollege">
                    <BsCollection/>
                </Link>
            </li>
            <li onClick={handleActive} id="5" className='navlink'>
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
