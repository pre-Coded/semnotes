import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom";
import {AiFillHome} from 'react-icons/ai'
import {BsFillBookFill, BsCollection} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {MdAdd} from 'react-icons/md'
import { useRef, useState, useEffect } from 'react';

const NavBar = () => {
    const handleActive = (e)=>{
        document.getElementById("navbar").querySelectorAll("*").forEach((link)=>{
                link.classList.remove('active');
        })

        e.currentTarget.classList.add("active");
    }


  return (
    <div className='fixed bottom-0 flex w-80 z-[1000] h-14 left-1/2 -translate-x-1/2 rounded-lg shadow-lg md:bottom-4 bg-[#121111]
    border-t-2 border-t-[#00BFFF]'>

        <ul id="navbar" className='flex justify-around items-center h-full w-full para-text text-2xl space-x-4 relative bg-transparent px-2'>

            <li id={1} onClick={handleActive} className='active transition-all relative h-full aspect-square flex items-center justify-center bg-transparent'>
                <Link to="/" className='h-full aspect-square flex justify-center items-center '>
                    <AiFillHome/>
                </Link>
            </li>
            <li id={2} onClick={handleActive} className='transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/semselected"  className='h-full aspect-square flex justify-center items-center '>
                    <BsFillBookFill/>
                </Link>
            </li>
            <li id={3} onClick={handleActive} className='transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/chat" className='h-full aspect-square flex justify-center items-center '>
                    <MdAdd/>
                </Link>
            </li>
            <li id={4} onClick={handleActive} className='transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/profile" className='h-full aspect-square flex justify-center items-center '>
                    <CgProfile/>
                </Link>
            </li>

        </ul>
        <Outlet/>
    </div>
  )
}
// #00BFFF
// #0080FF

export default NavBar
