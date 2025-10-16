import React from 'react'
import { Link } from 'react-router'
import { motion } from "framer-motion"

function CardProduct({ img, name, price, id }) {
  return (
    <Link to={`/product/${id}`}>
      <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='w-[260px] flex flex-col items-center py-[8px] gap-4 rounded-xl shadow-xl hover:scale-[101%] hover:shadow-xl transition-all'
        style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", }}>
        <div className='w-[240px] h-[310px]' style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

        </div>
        <h1 className='w-[240px] font-semibold '>{name}</h1>
        <h1 className='w-[240px]'>${price.toLocaleString()} <span className="text-[14px] text-gray-500"> USD</span> </h1>
      </motion.div>
    </Link>
  )
}

export default CardProduct