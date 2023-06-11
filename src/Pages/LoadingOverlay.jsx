import React from 'react'

const LoadingOverlay = ({isLoading}) => {
  return ( <>
    {isLoading && (
      <div className="z-[9999] top-0 left-0 h-full w-full absolute">
        <div className="loading-bar bg-gradient-to-r from-[#ff5722] to-[#1e90ff] h-1 rounded-lg w-full"></div>
      </div>
    )}
    </>
  )
}

export default LoadingOverlay