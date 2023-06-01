import React from 'react'

const Loading = ({isLoading}) => {
  return (
    <div className={`${isLoading ? "block" : "hidden"} w-full bg-gray-200 h-[2px] absolute z-10 overflow-hidden`}>
      <div className={`bg-blue-600 h-2.5 w-0 transition-all animation-loadingBar`}></div>
    </div>
  )
}

export default Loading