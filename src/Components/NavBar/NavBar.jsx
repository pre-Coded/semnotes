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
    <div className='fixed bottom-0 flex w-full z-[1000] h-20'>

        <ul id="navbar" className='flex justify-around items-center h-full w-full para-text text-3xl pb-3 px-4 space-x-4 relative'>

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
