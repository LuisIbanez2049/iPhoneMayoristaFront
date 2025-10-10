import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function CardCarouselComentarios() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Mock data for the carousel
  const cards = [
    {
      mensaje: "Fui a la oficina, vi el equipo y me lo llevé en el momento. Todo original y en perfecto estado.",
      nombre: "María G.",
      tipoCliente: "Compradora satisfecha"
    },
    {
      mensaje: "Me atendieron súper bien. Fui con mi mamá y tuvieron muchísima paciencia en explicarle cómo funcionaba.",
      nombre: "Agos P.",
      tipoCliente: "Comprador presencial"
    },
    {
      mensaje: "Ya fui dos veces a buscar iPhones y siempre la misma atención impecable. Son de confianza.",
      nombre: "Axel D.",
      tipoCliente: "Cliente recurrente"
    },
    {
      mensaje: "Excelente atención y el producto llegó antes de lo esperado. Totalmente recomendable.",
      nombre: "Lucía M.",
      tipoCliente: "Compradora satisfecha"
    },
    {
      mensaje: "Fui a la tienda sin saber mucho de tecnología y me guiaron paso a paso. ¡Muy profesionales!",
      nombre: "Carlos R.",
      tipoCliente: "Comprador presencial"
    },
    {
      mensaje: "Cada vez que necesito un accesorio nuevo, vuelvo acá. La calidad y el servicio nunca fallan.",
      nombre: "Sofía T.",
      tipoCliente: "Cliente recurrente"
    },
    {
      mensaje: "Quedé encantada con mi compra. El equipo era exactamente como lo describieron y el precio fue justo.",
      nombre: "Valentina L.",
      tipoCliente: "Compradora satisfecha"
    },
    {
      mensaje: "Me recibieron con una sonrisa, me mostraron varias opciones y no me presionaron para comprar. ¡Gracias!",
      nombre: "Diego M.",
      tipoCliente: "Comprador presencial"
    },
    {
      mensaje: "Llevo comprando aquí desde hace más de un año. Siempre productos nuevos y garantía real. ¡Los sigo recomendando!",
      nombre: "Martín G.",
      tipoCliente: "Cliente recurrente"
    }
  ];

  // Clonamos las tarjetas al inicio y al final para efecto infinito
  const clonedCards = [
    ...cards.slice(-2), // Últimas 2
    ...cards,
    ...cards.slice(0, 2) // Primeras 2
  ];

  const totalSlides = cards.length;
  const slideWidth = 100 / 3; // Para 3 slides visibles en desktop

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Circular: ir al principio
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Circular: ir al final
      setCurrentIndex(totalSlides - 1);
    }
  };

  // Calculamos el desplazamiento del carrusel
  const offset = (currentIndex + 2) * slideWidth; // +2 porque clonamos 2 al inicio

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 px-4">
      {/* Botón anterior */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Contenedor del carrusel */}
      <div className="overflow-hidden ">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${offset}%)` }}
        >
          {clonedCards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 sm:px-4 w-[90%] sm:w-[calc(100%/3)] "
            >
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <p className="text-gray-700 text-lg italic leading-relaxed">
                    "{card.mensaje}"
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{card.nombre}</h3>
                  <p className="text-gray-500 text-sm">{card.tipoCliente}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón siguiente */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-6 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CardCarouselComentarios;
