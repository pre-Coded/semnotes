import React from 'react'
import './style.css'


const LoadingOverlay = ({isLoading}) => {
  return ( <>
    {isLoading && (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )}
    </>
  )
}

export default LoadingOverlay