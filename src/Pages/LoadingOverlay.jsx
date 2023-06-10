import React from 'react'
import './style.css'


const LoadingOverlay = ({isLoading}) => {
  return ( <>
    {isLoading && (
      <div className="z-[9999] top-0 left-0 h-full w-full relative lg:hidden">
        <div className="loading-spinner bg-gradient-to-r from-[#ff5722] to-[#FFEB00] h-1 rounded-lg w-full"></div>
      </div>
    )}
    </>
  )
}

export default LoadingOverlay