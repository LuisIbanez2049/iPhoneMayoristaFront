import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {

  const navigate = useNavigate();
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

        <button onClick={() => {
          navigate("/login")
          localStorage.clear()
          location.reload()
        }}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
        
    </div>
  )
}

export default NavBar