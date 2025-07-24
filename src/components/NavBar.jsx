import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className=' flex flex-row justify-center gap-4 p-2'>
        <Link to="/">
         <i className="fa-brands fa-apple text-[20px]"></i>
        </Link>
        
        <Link to="/products">
         <p className='text-[15px]'>Store</p>
        </Link>

        <Link>
         <p className='text-[15px]'>iPad</p>
        </Link>

        <Link>
         <p className='text-[15px]'>iPhone</p>
        </Link>
        
        <Link>
         <p className='text-[15px]'>Mac</p>
        </Link>

        <Link>
         <p className='text-[15px]'>Watch</p>
        </Link>
        
    </div>
  )
}

export default NavBar