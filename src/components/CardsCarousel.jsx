import { useState, useEffect } from "react";
import CardFilter from "./CardFilter";

export default function CardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);


  const cards = [
    {
        id: 1,
        sectionCategory: "MINORISTA",
        name: "iPhone",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1755648272/16proMaxCategoria_vybima.jpg"
    },
    {
        id: 2,
        sectionCategory: "MINORISTA",
        name: "Mac",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1747970561/mac_zo05nf.jpg"
    },
    {
        id: 3,
        sectionCategory: "MINORISTA",
        name: "iPad",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1747971933/iPadCategory_z98mfx.jpg"
    },
    {
        id: 4,
        sectionCategory: "MINORISTA",
        name: "Watch",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1747971933/watchCategory_wrdcne.jpg"
    },
    {
        id: 4,
        sectionCategory: "MINORISTA",
        name: "Watch",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1747971933/watchCategory_wrdcne.jpg"
    },
    {
        id: 4,
        sectionCategory: "MINORISTA",
        name: "Watch",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1747971933/watchCategory_wrdcne.jpg"
    },
    {
        id: 4,
        sectionCategory: "MINORISTA",
        name: "Watch",
        img: "https://res.cloudinary.com/dlyoighih/image/upload/v1747971933/watchCategory_wrdcne.jpg"
    }
];



  // Detecta cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Funciones para mover el carrusel
  const handleNext = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    } else {
      // en desktop no hay "scroll forzado", solo desplaza hasta que se acabe
    //   if (currentIndex < cards.length - 1) {
    //     setCurrentIndex((prev) => prev + 1);
    //   }
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  const handlePrev = () => {
    if (isMobile) {
      setCurrentIndex((prev) =>
        prev === 0 ? cards.length - 1 : prev - 1
      );
    } else {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="relative w-[93%] lg:w-[90%] overflow-hidden border border-black p-2">
      {/* Contenedor de tarjetas */}
      <div
        className="flex flex-row justify-center transition-transform duration-500 ease-in-out gap-[10px] lg:gap-8"
        style={{
          transform: isMobile
            ? `translateX(-${currentIndex * 360}px)`
            : `translateX(-${currentIndex * 380}px)` // ajusta 250px al ancho de tarjeta en desktop
        }}
      >
        {cards && cards.length > 0 && cards.map((categorias) => {
            return <CardFilter id={categorias.id} img={categorias.img} name={categorias.name} />
        })}
      </div>

      {/* Botones */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
      >
        ⬅
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
      >
        ➡
      </button>
    </div>
  );
}
