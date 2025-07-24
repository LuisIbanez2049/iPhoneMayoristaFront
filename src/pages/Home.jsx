import React, { useState } from 'react'
import CardFilter from '../components/CardFilter'
import TrollFace from "../assets/trollFace.jpg"

function Home() {
  const [coordernadaX, setCoordernadaX] = useState(4)
  const [coordernadaY, setCoordernadaY] = useState(3)

  function generarDosNumeros() {
    const numero1 = Math.floor(Math.random() * 6) + 1; // entre 1 y 6
    const numero2 = Math.floor(Math.random() * 7) + 1; // entre 1 y 7
    return { numero1, numero2 };
  }

  function cambioDeCoordenadas() {
    const coordenadas = generarDosNumeros();

    setCoordernadaY(coordenadas.numero1)
    setCoordernadaX(coordenadas.numero2)
  }


  return (
    <div>
      Home
      Hola

      {/* <CardFilter/> */}
      {/* top-[30%] right-[40%] */}

      {/* top --> entre 60 y 10  //////   right --> entre 10 y 70*/}
      <div className={`w-[350px] h-[300px] shadow-xl rounded-xl flex flex-col justify-center items-center gap-4 transition-all duration-500 transform absolute top-[${coordernadaY}0%] right-[${coordernadaX}0%]`}
        style={{
          backgroundImage: `url(${TrollFace})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className='bg-[#00000077] p-6 rounded-2xl flex flex-col gap-6'>
          <h1 className='text-[35px] font-bold text-white'>Are you gay?</h1>

          <div className='w-full flex flex-row justify-center gap-6'>
            <a href="https://youtu.be/dUAJvQheON0?t=14" target="_blank" className='bg-[#30d430] px-2 py-1 rounded-lg font-semibold'>YES</a>
            <button className='bg-[#ff0000] px-2 py-1 rounded-lg font-semibold' onMouseEnter={() => {
              cambioDeCoordenadas()
            }}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home