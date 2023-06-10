import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookFill, BsCollection, BsBookFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdAdd } from 'react-icons/md'
import { useRef, useState, useEffect } from 'react';
import TopBar from '../Home/TopBar';
import { useFireBase } from '../../utilities/Firebase';
import {LuMessageSquare} from 'react-icons/lu'

const NavBar = () => {
    const firebase = useFireBase();

    const handleActive = (e) => {
        document.getElementById("navbar").querySelectorAll("*").forEach((link) => {
            link.classList.remove('active');
        })
        e.currentTarget.classList.add("active");
    }

    const handleActiveLarger = (e)=> {
        document.getElementById("navbarLarge").querySelectorAll("*").forEach((link) => {
            link.classList.remove('active-navLarge');
        })

        e.currentTarget.classList.add('active-navLarge');
    }


    return (
        <div className='lg:h-screen h-auto lg:w-[24%] relative'>
            <div className='lg:flex flex-col bg-main p-2 hidden relative border-r-2 border-r-[#121212] h-full w-full'>
                <div className='w-full'>
                    <div className='h-20 relative top-2 p-2 flex flex-col items-center justify-center main-text'>
                        <div className='h-full w-full flex justify-center items-center relative rounded-md shadow-2xl'>
                            <h1 className='text-3xl overflow-hidden p-2'>ExamRescue</h1>
                            <div className='h-[2px] w-[27%] bg-[#00BFFF] absolute left-0 rounded-xl top-0'></div>
                            <div className='h-full w-[2px] bg-[#0080FF] absolute left-0 rounded-xl top-0'></div>
                            <div className='h-full w-[2px] bg-[#FF5F1F] absolute rounded-xl right-0 bottom-0'></div>
                            <div className='h-[2px] w-[27%] bg-[#FF5F1F] absolute rounded-xl right-0 bottom-0'></div>
                        </div>
                    </div>
                </div>

                <nav className='flex flex-col items-center justify-between space-y-4 mt-6 h-full w-full'>

                    <ul id="navbarLarge" className='para-text text-xl w-full h-full bg-transparent'>
                        <li onClick={handleActiveLarger} id={1} className='active-navLarge bg-transparent w-full relative h-16 flex p-2 border-b-2 border-b-[#222222]  transition-all'>
                            <Link to="/" className='h-full w-full flex justify-start items-center space-x-2'>
                                <AiFillHome/>
                                <span className='text-sm'>Home</span>
                            </Link>
                        </li>
                        <li onClick={handleActiveLarger} id={1} className='w-full relative h-16 flex p-2 border-b-2 border-b-[#222222]  transition-all'>
                            <Link to="/semselected" className='h-full w-full flex justify-start items-center space-x-2'>
                                <BsBookFill/>
                                <span className='text-sm'>Choose Subject</span>
                            </Link>
                        </li>
                        <li onClick={handleActiveLarger} id={1} className='w-full relative h-16 flex p-2 border-b-2 border-b-[#222222] transition-all'>
                            <Link to="/chat" className='h-full w-full flex justify-start items-center space-x-2'>
                                <LuMessageSquare/>
                                <span className='text-sm'>Recents</span>
                            </Link>
                        </li>
                    </ul>
                    <Outlet />
                    <button onClick={firebase.handleSignOut} className='tracking-wider py-2 w-[70%] h-12 text-sm bg-btn-secondry main-text rounded-md shadow-md'>Log Out</button>
                </nav>
            </div>

            <div className='fixed lg:hidden bottom-0 flex w-80 z-[1000] h-14 left-1/2 -translate-x-1/2 rounded-lg shadow-lg md:bottom-4 bg-[#121111] border-t-2 border-t-[#00BFFF]'>

                <ul id="navbar" className='flex justify-around items-center h-full w-full para-text text-2xl space-x-4 relative bg-transparent px-2'>
                    <li id={1} onClick={handleActive} className='active transition-all relative h-full aspect-square flex items-center justify-center bg-transparent'>
                        <Link to="/" className='h-full aspect-square flex justify-center items-center '>
                            <AiFillHome />
                        </Link>
                    </li>
                    <li id={2} onClick={handleActive} className='transition-all relative h-full aspect-square flex items-center justify-center'>
                        <Link to="/semselected" className='h-full aspect-square flex justify-center items-center '>
                            <BsFillBookFill />
                        </Link>
                    </li>
                    <li id={3} onClick={handleActive} className='transition-all relative h-full aspect-square flex items-center justify-center'>
                        <Link to="/chat" className='h-full aspect-square flex justify-center items-center '>
                            <LuMessageSquare />
                        </Link>
                    </li>
                    <li id={4} onClick={handleActive} className='transition-all relative h-full aspect-square flex items-center justify-center'>
                        <Link to="/profile" className='h-full aspect-square flex justify-center items-center '>
                            <CgProfile />
                        </Link>
                    </li>
                </ul>
                <Outlet />
            </div>
        </div>
    )
}
// #00BFFF
// #0080FF

export default NavBar
