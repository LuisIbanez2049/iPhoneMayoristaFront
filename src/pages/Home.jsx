import React, { useState } from 'react'
import CardFilter from '../components/CardFilter'
import TrollFace from "../assets/trollFace.jpg"
import ProductDescriptionBuilder from '../components/ProductDescriptionBuilder'
import DragAndDropUploader from '../components/DragAndDropUploader'
import DescriptionForm from '../components/DescriptionForm'
import HtmlToTailwind from '../components/HtmlToTailwind'


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
      <i data-lucide="chart-no-axes-gantt"></i>
      Hola

      {/* <CardFilter/> */}
      {/* top-[30%] right-[40%] */}

      {/* top --> entre 60 y 10  //////   right --> entre 10 y 70*/}
      <div className={`hidden w-[350px] h-[300px] shadow-xl rounded-xl flex flex-col justify-center items-center gap-4 transition-all duration-500 transform absolute top-[${coordernadaY}0%] right-[${coordernadaX}0%]`}
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

      {/* <ProductDescriptionBuilder />*/}

      <DragAndDropUploader />
      <DescriptionForm />

      <div className='w-full flex flex-col items-center border border-red-600'>
        <div className='hidden border border-blue-600 w-[95%]'>
          <HtmlToTailwind html={'<p>Escribe aquí tu contenido...</p><div><p>Escribe aquí tu contenido...</p><div><div><div><p class=" text-center"><img alt="imagen" class="mx-auto w-[250px] m-auto block" src="https://res.cloudinary.com/dlyoighih/image/upload/v1748106382/iPadAir2_ntoqdo.jpg"></p><p class=" text-center"><br></p><p class=" text-center"><b><i><u><font size="5">Que pasa</font></u></i></b>?</p><p class=" text-center"><br></p><p class=" text-center"><iframe src="https://res.cloudinary.com/dlyoighih/video/upload/v1747970285/samples/elephants.mp4" frameborder="0" allowfullscreen="" iframe="" class="sm:w-[20vw] sm:h-[196px] w-full h-[200px] rounded-lg m-auto block"></iframe></p><p class=" text-center"><br></p><p class=" text-center"><b><font size="5"><u>ARI GAMEPLAYS</u></font></b></p><p class=" text-center"><br></p><p style="text-align: center;"><img src="https://res.cloudinary.com/dlyoighih/image/upload/v1755578333/y7azbfqdnkxg681fx6rr.png" alt="imagen" class="m-auto block" style="width: 300px; display: block; margin: 0px auto;"></p><div></div></div></div></div></div>'} />

        </div>
      </div>
    </div>
  )
}

export default Home