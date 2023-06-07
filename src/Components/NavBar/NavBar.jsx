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
    <div className='fixed bottom-0 flex w-80 z-[1000] h-14 left-1/2 -translate-x-1/2 rounded-lg shadow-lg md:bottom-4 bg-black'>

        <ul id="navbar" className='flex justify-around items-center h-full w-full para-text text-2xl space-x-4 relative'>

            <li onClick={handleActive} className='active flex-1 transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/" className=''>
                    <AiFillHome/>
                </Link>
            </li>
            <li onClick={handleActive} className='flex-1 transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/semselected">
                    <BsFillBookFill/>
                </Link>
            </li>
            <li onClick={handleActive} className='flex-1 transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/addresource">
                    <MdAdd/>
                </Link>
            </li>
            <li onClick={handleActive} className='flex-1 transition-all relative h-full aspect-square flex items-center justify-center'>
                <Link to="/profile">
                    <CgProfile/>
                </Link>
            </li>

        </ul>
        <div className='absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-[#00BFFF] to-[#0080FF]'></div>
        <Outlet/>

    </div>
  )
}
// #00BFFF
// #0080FF

export default NavBar
