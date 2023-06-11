import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookFill, BsCollection, BsBookFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdAdd } from 'react-icons/md'
import { useRef, useState, useEffect } from 'react';
import TopBar from '../Home/TopBar';
import { useFireBase } from '../../utilities/Firebase';
import { LuMessageSquare } from 'react-icons/lu'
import { motion } from 'framer-motion';

const NavBar = () => {
    const firebase = useFireBase();

    const location = useLocation();

    const ref = useRef(null);

    const [num, setNum] = useState(0);

    const homeRef = useRef(null);
    const semRef = useRef(null);
    const chatRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(()=>{
        const setActive = () =>{
            const path = location.pathname;

            if(path === "/"){
                homeRef.current?.click();
            }else if(path === "/semselected"){
                semRef.current?.click();
            }else if(path === "/chat"){
                chatRef.current?.click();
            }else if(path === '/profile'){
                profileRef.current?.click();
            }
        }

        return(
            setActive()
        )
    }, [location.pathname])

    const handleClick = (event) => {
        document.getElementById("navbar").querySelectorAll("*").forEach((item)=>{
        item.classList.remove('active');
        })

        event.currentTarget.classList.add('active');

        const targetTab = event.currentTarget.getBoundingClientRect();
        const navbar = document.getElementById('navbar').getBoundingClientRect();
        const difference = targetTab.left - navbar.left;
        setNum(difference);
        // ref.current.style.transform = `translateX(${difference}px)`;
    };

    const handleActiveLarger = (e) => {
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
                                <AiFillHome />
                                <span className='text-sm'>Home</span>
                            </Link>
                        </li>
                        <li onClick={handleActiveLarger} id={1} className='w-full relative h-16 flex p-2 border-b-2 border-b-[#222222]  transition-all'>
                            <Link to="/semselected" className='h-full w-full flex justify-start items-center space-x-2'>
                                <BsBookFill />
                                <span className='text-sm'>Choose Subject</span>
                            </Link>
                        </li>
                        <li onClick={handleActiveLarger} id={1} className='w-full relative h-16 flex p-2 border-b-2 border-b-[#222222] transition-all'>
                            <Link to="/chat" className='h-full w-full flex justify-start items-center space-x-2'>
                                <LuMessageSquare />
                                <span className='text-sm'>Recents</span>
                            </Link>
                        </li>
                    </ul>
                    <Outlet />
                    <button onClick={firebase.handleSignOut} className='tracking-wider py-2 w-[70%] h-12 text-sm bg-btn-secondry main-text rounded-md shadow-md'>Log Out</button>
                </nav>
            </div>

            <div className='fixed lg:hidden bottom-2 flex w-80 z-[1000] h-14 left-1/2 -translate-x-1/2 rounded-lg shadow-lg md:bottom-4'>

                <nav className="h-14 w-80 bg-main rounded-lg relative p-2 px-4 para-text border-[#121212] border shadow-inner shadow-[#121212]">
                    <ul id="navbar" className="flex flex-row justify-between items-center w-full h-full relative">

                        {/* <div className="h-full absolute aspect-square">
                            <div
                                ref={ref}
                                className={`h-14 aspect-square bg-btn-secondry -left-[8px] -top-[2rem] rounded-full transition-all relative`}
                            ></div>
                        </div> */}

                    <motion.div
                        initial={{ transform: 'translateX(0)' }}
                        animate={{ transform: `translateX(${num}px)` }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25, duration : '150ms' }}
                        className="h-16 aspect-square rounded-full bg-white absolute -top-8 -left-3 shadow-inner shadow-blue-900 border-4 border-black"
                        >
                        
                    </motion.div>


                        <li ref={homeRef}
                            onClick={handleClick}
                            className={`transition-all z-10 flex items-center justify-center h-full aspect-square text-2xl cursor-pointer active`}
                        >
                            <Link to="/">
                                <AiFillHome />
                            </Link>
                        </li>

                        <li ref={semRef}
                            onClick={handleClick}
                            className={`transition-all flex items-center justify-center h-full aspect-square text-2xl cursor-pointer`}
                        >
                            <Link to="/semselected">
                                <BsBookFill />
                            </Link>
                        </li>
                        <li ref={chatRef}
                            onClick={handleClick}
                            className={`transition-all flex items-center justify-center h-full aspect-square text-2xl cursor-pointer`}
                        >
                            <Link to="/chat">
                                <LuMessageSquare />
                            </Link>
                        </li>
                        <li ref={profileRef}
                            onClick={handleClick}
                            className={`transition-all flex items-center justify-center h-full aspect-square text-2xl cursor-pointer`}
                        >
                            <Link to="/profile">
                                <CgProfile />
                            </Link>
                        </li>
                    </ul>
                    <Outlet />
                </nav>
            </div>
        </div>
    )
}
// #00BFFF
// #0080FF

export default NavBar
