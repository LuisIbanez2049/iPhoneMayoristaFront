import React, { useEffect, useState } from 'react'

import VideoTablets from "../assets/videoTablets.mp4"
import VideoMacs from "../assets/videoMacs.mp4"
import VideoiPhones from "../assets/videoiPhones.mp4"
import CardFilter from '../components/CardFilter'
import axios from 'axios'
import { useNavigate } from 'react-router'
import CardsCarousel from '../components/CardsCarousel'


function Home() {

  const baseUrl = "http://localhost:8080"

  const videos = [VideoiPhones, VideoMacs, VideoTablets]; // array con las rutas locales
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categorias, setCategorias] = useState([])

  
  

  const navigate = useNavigate();

  // Cambiar automáticamente cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [videos.length]);

  // Botones manuales
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };


  useEffect(() => {
    axios.get(`${baseUrl}/api/category/`)
      .then((response) => {
        console.log(response.data)
        setCategorias(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])


  return (
    <div>
      <div className="relative">
        <div className=" relative z-0 w-full h-screen overflow-hidden">
          {/* Videos */}
          {videos.map((video, index) => (
            <video
              key={index}
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            />
          ))}
        </div>

        <div className=" absolute top-0 z-10 w-full h-full flex flex-col items-center justify-center">
          {/* shadow-md bg-[#00000038] */}
          <div className='flex flex-row justify-center items-center gap-4 lg:gap-8'>
            <h1 className="vina-sans-regular text-[35px] lg:text-[120px] text-[#ffffff]"
              style={{ textShadow: "0px 2px 7px #00000080" }}>TODO LO QUE </h1>

            <h1 className='oooh-baby-regular text-[50px] lg:text-[160px] text-[#ffffff] font-bold'>Necesitas</h1>
          </div>

          <h1 className="vina-sans-regular text-[40px] lg:text-[120px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 ">EN UN SOLO LUGAR</h1>
        </div>
      </div>

      <style>
        {`
           @import url('https://fonts.googleapis.com/css2?family=Vina+Sans&display=swap');
           @import url('https://fonts.googleapis.com/css2?family=Courgette&family=Oooh+Baby&family=Vina+Sans&display=swap');


           .vina-sans-regular {
           font-family: "Vina Sans", sans-serif;}

           .oooh-baby-regular {
           font-family: "Oooh Baby", cursive;
           text-shadow: 0px 2px 7px #00000080}

        `}
      </style>


      <div className='w-full min-h-screen flex flex-col pt-20 px-4 bg-slate-50'>

        <h1 className=' text-[40px] font-bold text-gray-600 ml-[50px] mb-[20px]'>Mira los productos disponibles</h1>

        <div className='flex flex-row justify-center items-center flex-wrap gap-8 p-4'>

          <CardFilter id={categorias[0]?.id} img={categorias[0]?.img} name={categorias[0]?.name} />

          <CardFilter id={categorias[1]?.id} img={categorias[1]?.img} name={categorias[1]?.name} />
          <CardFilter id={categorias[2]?.id} img={categorias[2]?.img} name={categorias[2]?.name} />
          <CardFilter id={categorias[3]?.id} img={categorias[3]?.img} name={categorias[3]?.name} />
        </div>

        <div className='w-full flex flex-col items-center'>
          <CardsCarousel/>
        </div>
        

        {/* <div className='flex flex-row justify-center flex-wrap gap-20'>
          <CardFilter id={categorias[0].id} img={categorias[0].img} name={categorias[0].name} />
          <CardFilter id={categorias[1].id} img={categorias[1].img} name={categorias[1].name} />
        </div>

        <div className='flex flex-row justify-center flex-wrap gap-20'>
          <CardFilter id={categorias[2].id} img={categorias[2].img} name={categorias[2].name} />
          <CardFilter id={categorias[3].id} img={categorias[3].img} name={categorias[3].name} />
        </div> */}

      </div>
    </div>
  );
}

export default Home