import React from 'react'
import Mac from "../assets/mac.jpg"
import { useNavigate } from 'react-router'
import { ToyBrick } from 'lucide-react'

function CardFilter({ id, img, name, onActualizarId }) {

  const navigate = useNavigate()
  const isToken = localStorage.getItem("token") 



  return (

    <div  className=' relative'>
      <button onClick={() => onActualizarId(id, name)}>
        <div className=' w-[200px] lg:w-[200px] h-[140px] lg:h-[150px] z-0 rounded-[20px] shadow-md lg:shadow-lg hover:scale-[101%] lg:hover:shadow-xl transition-all duration-500'
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

        <div className='w-full h-[20%] flex flex-col p-4 gap-1'>
          <h1 className='text-[25px] font-semibold'>{name}</h1>
          <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400'>Apple Intelligence</h1>
        </div>
      </div>
      </button>

      <div className={`${isToken ? "show" : "hidden"} absolute top-0 right-[-10px] z-10`}>
        <button onClick={() => navigate(`/category/edit/${id}`)}>
          <i className="fa-solid fa-pen text-[20px] transition-all duration-300 hover:text-green-500 hover:scale-105"></i>
        </button>
      </div>
    </div>

    // <button onClick={() => onActualizarId(id, name)} className=' relative'>
    //   <div className=' w-[200px] lg:w-[200px] h-[140px] lg:h-[150px] z-0 rounded-[20px] shadow-md lg:shadow-lg hover:scale-[101%] lg:hover:shadow-xl transition-all duration-500'
    //     style={{
    //       backgroundImage: `url(${img})`,
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center',
    //       backgroundRepeat: 'no-repeat',
    //     }}>

    //     <div className='w-full h-[20%] flex flex-col p-4 gap-1'>
    //       <h1 className='text-[25px] font-semibold'>{name}</h1>
    //       <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400'>Apple Intelligence</h1>
    //     </div>
    //   </div>

    //   <div className=' absolute top-0 right-[-10px] z-10'>
    //     <button onClick={() => navigate(`category/edit/${id}`)}>
    //       <i className="fa-solid fa-pen text-[20px] transition-all duration-300 hover:text-green-500 hover:scale-105"></i>
    //     </button>
    //   </div>
    // </button>
  )
}

export default CardFilter