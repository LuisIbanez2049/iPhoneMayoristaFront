import React from 'react'

function LoadingSpinner({isLoading}) {
  return (
    <div className={`${isLoading ? "show" : "hidden"} fixed z-10 w-[100vw] h-[100vh] flex flex-col items-center justify-center`}>
        <svg className='w-[140px] pb-[200px]' fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z">
            <animateTransform attributeName="transform" type="rotate" dur="0.6s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
         </path>
        </svg>
    </div>
  )
}

export default LoadingSpinner