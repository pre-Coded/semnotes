import React from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

const AnimatedButton = ({state, setState, btn, data}) => {
    return (
        <div className='w-full flex flex-col justify-start items-center p-2'>
            <div onClick={() => {
                setState(prev => !prev);
            }} className='w-full p-4 bg-main rounded-md shadow-md space-x-2 main-text flex items-center justify-between'>
                <span>{btn}</span>
                {
                    state ? 
                    <AiFillCaretUp/> :
                    <AiFillCaretDown/>
                }
            </div>
            <div className={`${state ? "h-full mt-2" : "h-0"} w-full duration-200 transition-all overflow-hidden`}>
                <div className='p-4 bg-main rounded-md shadow-md'>
                    {data}
                </div>
            </div>
        </div>
    )
}

export default AnimatedButton
