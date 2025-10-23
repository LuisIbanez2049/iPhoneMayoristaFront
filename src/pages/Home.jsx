import React, { useEffect, useState } from 'react'

import VideoTablets from "../assets/videoTablets.mp4"
import Iphones17 from "../assets/videoIphones17.mp4"
import VideoMacs from "../assets/videoMacs.mp4"
import VideoiPhones from "../assets/videoiPhones.mp4"
import CardFilter from '../components/CardFilter'
import axios from 'axios'
import { useNavigate } from 'react-router'
import CardsCarousel from '../components/CardsCarousel'
import Home1 from "../assets/home1.png"
import Home1V from "../assets/home1V.png"
import CardCarouselComentarios from '../components/CardCarouselComentarios'
import CardCarouselComentariosMobile from '../components/CardCarouselComentariosMobile'
import SectionInfo from '../components/SectionInfo'
import CardFilterHome from '../components/CardFilterHome'


function Home() {

  //const baseUrl = "http://localhost:8080"
  const baseUrl = import.meta.env.VITE_APP_DATABASE_URL

  
  const videos = [VideoiPhones, VideoMacs, VideoTablets, Iphones17]; // array con las rutas locales
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categorias, setCategorias] = useState([])
  const [categoriasMayorista, setCategoriaMayorista] = useState([])

  const rol = sessionStorage.getItem("rol")



  //----------------------------FUNCIÓN PARA QUE CUANDO CARGUE EL COMPONENTE SE VEA DESDE EL PRINCIPIO Y NO DESDE CAULQUIER PARTE DE LA PAGINA
  useEffect(() => {
    window.scrollTo(0, 0); // X=0, Y=0 (arriba del todo)
  }, []);
  //----------------------------FUNCIÓN PARA QUE CUANDO CARGUE EL COMPONENTE SE VEA DESDE EL PRINCIPIO Y NO DESDE CAULQUIER PARTE DE LA PAGINA




  //-------------------------------- FUNCION VERIFICAR ANCHO DE PANTALLA -------------------------------- 
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 450);

  useEffect(() => {
    // Función para actualizar el estado según el ancho de la pantalla
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 450);
    };

    // Agregar el listener de evento al cargar el componente
    window.addEventListener('resize', handleResize);

    // Eliminar el listener al desmontar el componente para evitar pérdidas de memoria
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //-------------------------------- FUNCION VERIFICAR ANCHO DE PANTALLA --------------------------------




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


        const categoriasMinoristas = response.data.filter(categoria => categoria.sectionCategory === "MINORISTA")
        console.log(response.data)
        setCategorias(categoriasMinoristas.slice(0, 4))
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  const onIrATodosLosProductos = () => {
    navigate(`${rol ? "/mayorista" : "/products"}`)
  }

  useEffect(() => {
    axios.get(`${baseUrl}/api/category/`)
      .then((response) => {
        const categoriasMayoristas = response.data.filter(categoria => categoria.sectionCategory === "MAYORISTA")
        console.log(response.data)
        setCategoriaMayorista(categoriasMayoristas)
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

           .animated-gradient {
           font-weight: bold;
           background: linear-gradient(90deg, #b57ee6, #4a90e2, #6cc070, #b57ee6);
           background-size: 300% 300%; /* agranda el gradiente para animarlo */
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           background-clip: text;
           color: transparent;
         
           animation: gradientMove 5s ease infinite;
          }

          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

        `}
      </style>


      <div className='w-full min-h-screen flex flex-col pt-20 px-4 bg-slate-50'>

        <div className='flex flex-row items-center justify-center flex-wrap mb-[40px]'>
          <h1 className=' text-[34px] lg:text-[45px] font-bold text-gray-600 mr-2'>Mira los productos</h1>
          <h1 className="font-bold text-[36px] lg:text-[46px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 ">disponibles</h1>
        </div>

        <div className={`${isMobileView ? "hidden" : "show"} ${rol ? "hidden" : "show"} flex flex-row justify-center items-center flex-wrap gap-8 p-4`}>
          {categorias && categorias.length > 0 && categorias.map((categoria) => {
            return (<CardFilterHome id={categoria.id} img={categoria.img} name={categoria.name} onActualizarId={onIrATodosLosProductos} />)
          })}
        </div>

        <div className={`${isMobileView ? "show" : "hidden"} ${rol ? "hidden" : "show"} w-full flex flex-col items-center`}>
          <CardsCarousel arrayCategories={categorias} />
        </div>




        {/* -------------------------------SECTOR MAYORISTAS--------------------------------------------- */}
        <div className={`${isMobileView ? "hidden" : "show"} ${rol ? "show" : "hidden"}  flex flex-row justify-center items-center flex-wrap gap-8 p-4`}>
          {categoriasMayorista && categoriasMayorista.length > 0 && categoriasMayorista.map((categoria) => {
            return (<CardFilterHome id={categoria.id} img={categoria.img} name={categoria.name} onActualizarId={onIrATodosLosProductos} />)
          })}
        </div>

        <div className={`${isMobileView ? "show" : "hidden"} ${rol ? "show" : "hidden"} w-full flex flex-col items-center`}>
          <CardsCarousel arrayCategories={categoriasMayorista} />
        </div>
        {/* -------------------------------SECTOR MAYORISTAS--------------------------------------------- */}




        <div className='w-full animate-pulse flex flex-col justify-center items-center my-[40px]'>
          <button className='py-2 px-4 rounded-full shadow-md bg-slate-100 border border-rose-300 hover:scale-[101%] hover:shadow-xl transition-all duration-500'
            onClick={onIrATodosLosProductos}>
            <h1 className="font-bold text-[30px] lg:text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 ">VER MAS</h1>
          </button>
        </div>

      </div>


      <div className=' min-h-screen bg-slate-100 pt-[30px] pb-[20px]'>
        <h1 className="animated-gradient text-center text-[36px] lg:text-[40px]">TODO LO IMPRESINDIBLE <br /> TODO EN TU iPHONE</h1>
        <img src={Home1} alt="" className={`${isMobileView ? "hidden" : "show"} w-[75%] m-auto`} />
        <img src={Home1V} alt="" className={`${isMobileView ? "show" : "hidden"} m-auto mt-[30px]`} />

        <div className='w-full flex flex-col justify-center items-center my-[40px]'>
          <button className='py-2 px-4 rounded-full shadow-md bg-slate-100 border border-rose-300 hover:scale-[101%] hover:shadow-xl transition-all duration-500'
            onClick={onIrATodosLosProductos}>
            <h1 className="font-bold text-[30px] lg:text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 ">VER MAS</h1>
          </button>
        </div>

      </div>




      <div className='w-full py-[30px] h-[600px] '>
        <div className='flex flex-row flex-wrap justify-center gap-2 font-semibold text-gray-700 '>
          <h1 className='text-[35px] text-center '>Lo que dicen quienes ya confiaron en
            <span className="font-bold text-[35px] lg:text-[35px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 "> nosotros</span>
          </h1>
          {/* <h1 className="font-bold text-[30px] lg:text-[35px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 ">nosotros</h1> */}
        </div>
        <div className={`${isMobileView ? "hidden" : "show"}`}>
          <CardCarouselComentarios />
        </div>
        <div className={`${isMobileView ? "show" : "hidden"}`}>
          <CardCarouselComentariosMobile />
        </div>
      </div>

      <div>
        <SectionInfo />
      </div>




    </div>
  );
}

export default Home