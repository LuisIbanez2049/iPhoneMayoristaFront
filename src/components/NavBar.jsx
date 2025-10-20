
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {

  const [sizeNavBar, setSizeNavBar] = useState(53)
  const [heightNavBar, setHeightNavBar] = useState(50)
  const token = localStorage.getItem("token")
  const [desactivarBotonHome, setDesactivarBotonHome] = useState(true)

  const navigate = useNavigate();


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


  return (
    <div className=' flex flex-row justify-center gap-4 p-2 absolute top-0 w-full'>
      {/* <Link to="/">
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
      </button> */}

      <div className="container container--inline fixed z-20 top-1 w-full lg:w-[780px] p-2">
        <div className="glass-container glass-container--rounded glass-container--large ">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          {/* En el div de abajo controlo el tamaño de la barra de navegación */}
          <div className={`glass-content glass-content--inline transition-all duration-500 overflow-hidden px-3 py-3`}
            onMouseEnter={() => {
              if (isMobileView && token) {
                setSizeNavBar(145)
                setHeightNavBar(400)
              } else {
                setSizeNavBar("")
              }
            }}
            onMouseLeave={() => {
              if (isMobileView && token) {
                setSizeNavBar(53)
                setHeightNavBar(50)
              } else {
                setSizeNavBar(53)
              }
            }}>

            {/* <div className={`glass-content glass-content--inline  border border-black transition-all duration-500 overflow-hidden px-3 py-3 ${sizeNavBar}`}
          onMouseEnter={() => setSizeNavBar("")} onMouseLeave={() => setSizeNavBar("w-[76px]")} ></div> */}



            <motion.div
              animate={{ width: sizeNavBar, height: heightNavBar }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onMouseEnter={() => setDesactivarBotonHome(false)}
              onMouseLeave={() => setDesactivarBotonHome(true)}
              className={`glass-content glass-content--inline flex ${token ? "flex-col" : "flex-row"} lg:flex-row gap-[20px] justify-center rounded-lg`}
            >

                <div className={` ${isMobileView ? "hidden" : "show"} px-4 py-3 text-black bg-[#ffffff18] rounded-full flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500`}>
                  <button onClick={() => navigate("/")}>
                    <i className="fa-brands fa-apple text-[25px]"></i>
                  </button>
                </div>

              <div className={` ${isMobileView ? "show" : "hidden"} px-4 py-3 text-black bg-[#ffffff18] rounded-full flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500`}>
                <button disabled={desactivarBotonHome}  onClick={() => navigate("/")}>
                  <i className="fa-brands fa-apple text-[25px]"></i>
                </button>
              </div>

              <Link to="/products">
                <div className='p-3 text-black bg-[#ffffff18] rounded-2xl flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500'>
                  <h1 className='font-bold'>Store</h1>
                </div>
              </Link>

              <div className={`${token ? "show" : "hidden"}`}>
                <Link to="/mayorista">
                  <div className={` w-[145px] p-3 text-black bg-[#ffffff18] rounded-2xl flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500`}>
                    <h1 className='font-bold'>Mayorista</h1>
                  </div>
                </Link>
              </div>

              <div className={`${token ? "show" : "hidden"}`}>
                <Link to="/product/create">
                  <div className={` w-[140px] p-3 text-black bg-[#ffffff18] rounded-2xl flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500`}>
                    <h1 className='font-bold'>Crear Producto</h1>
                  </div>
                </Link>
              </div>

              <div className={`${token ? "show" : "hidden"}`}>
                <Link to="/category/create">
                  <div className={` w-[145px] p-3 text-black bg-[#ffffff18] rounded-2xl flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500`}>
                    <h1 className='font-bold'>Crear Categoria</h1>
                  </div>
                </Link>
              </div>

              <button
                className={`${token ? "show" : "hidden"} px-4 py-3 text-black bg-[#ffffff18] rounded-full flex flex-row justify-center items-center shadow-lg hover:scale-[110%] hover:shadow-xl hover:bg-[#ffffffc7] transition-all duration-500`} onClick={() => {
                  navigate("/login")
                  localStorage.clear()
                  location.reload()
                }}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </motion.div>






          </div>
        </div></div>



      <div className="container fixed z-10 top-6">


        <div className="glass-container">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>



          <svg className='nose'>
            <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </div>
      </div>

      <style>
        {` :root {
  --lg-bg-color: rgba(255, 255, 255, 0.25);
  --lg-highlight: rgba(255, 255, 255, 0.75);
  --lg-text: #ffffff;
  --lg-hover-glow: rgba(255, 255, 255, 0.4);
  --lg-red: #fb4268;
  --lg-grey: #5b5b5b;
}

/* ========== BASE LAYOUT ========== */
.nose{
display:none;
}


/* ========== CONTAINER ========== */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container--inline {
  flex-direction: row;
}

/* ========== GLASS CONTAINER ========== */
.glass-container {
  position: relative;
  display: flex;
  font-weight: 600;
  color: var(--lg-text);
  background: transparent;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  
}



/* ========== GLASS LAYERS ========== */
.glass-filter {
  position: absolute;
  inset: 0;
  z-index: 0;
  backdrop-filter: blur(0px);
  filter: url(#lg-dist);
  isolation: isolate;
}

.glass-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: var(--lg-bg-color);
}

.glass-specular {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  overflow: hidden;
  box-shadow: inset 1px 1px 0 var(--lg-highlight),
    inset 0 0 5px var(--lg-highlight);
}

.glass-content {
  position: relative;
  z-index: 3;
  /* padding: 1rem 1.5rem 0.9rem; */
  
}

.glass-content--inline {
/* padding: 0.25rem 2rem 0.25rem 0.75rem; */
  flex: 1 1 auto;
  justify-content: space-between;
}

/* ========== ICONS AND IMAGES ========== */
.glass-content a {
  display: inline-block;
  position: relative;
  padding: 1px;
  border-radius: 1.2rem;
}

.glass-content a img {
  display: block;
  width: 75px;
  /* transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2); */
  
}


 `}
      </style>

    </div>
  )
}

export default NavBar