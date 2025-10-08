import React from 'react'
import Mac from "../assets/mac.jpg"

function CardFilter({ id, img, name, onActualizarId}) {
  return (
    <button onClick={() => onActualizarId(id, name)}>
      <div className=' w-[88vw] lg:w-[350px] h-[410px] lg:h-[450px] rounded-[20px] shadow-lg hover:scale-[101%] hover:shadow-xl transition-all duration-500'
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
  )
}

export default CardFilter




// function CardFilter({id}) {
//   return (
//     <div className=' w-[350px] h-[450px] rounded-[20px] shadow-lg hover:scale-[101%] hover:shadow-xl transition-all duration-500'
//     style={{
//         backgroundImage: `url(${Mac})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}>

//         <div className='w-full h-[20%] flex flex-col p-4 gap-1'>
//             <h1 className='text-[25px] font-semibold'>MacBook</h1>
//             <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400'>Apple Intelligence</h1>
//         </div>
//     </div>
//   )
// }

// export default CardFilter