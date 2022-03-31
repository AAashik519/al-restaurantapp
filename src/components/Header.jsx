import React from 'react'

const Header = () => {
  return (
    <div className='fixed z-50 bg-slate-300 p-6 w-screen px-16'> 
            {/* destop and mobile */}
        <div className='hidden md:flex w-full h-full bg-red-600 p-4'>

        </div>

           {/* destop and mobile */}
           <div className='flex md:hidden w-full h-full bg-blue-600 p-4 '>

           </div>
    </div>
  )
}

export default Header