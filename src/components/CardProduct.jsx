import React from 'react'
import { Link } from 'react-router'

function CardProduct({ img, name, price, id }) {
  return (
    <Link to={`/product/${id}`}>
      <div className='w-[260px] flex flex-col items-center py-[8px] gap-4 rounded-xl shadow-xl hover:scale-[101%] hover:shadow-xl transition-all duration-500'
        style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", }}>
        <div className='w-[240px] h-[310px]' style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

        </div>
        <h1 className='w-[240px] font-semibold '>{name}</h1>
        <h1 className='w-[240px]'>$49.00</h1>
      </div>
    </Link>
  )
}

export default CardProduct