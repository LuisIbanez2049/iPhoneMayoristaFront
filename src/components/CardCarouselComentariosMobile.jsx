
import React, { useState } from 'react';
import CardFilter from './CardFilter';
import { useNavigate } from 'react-router';

function CardCarouselComentariosMobile() {
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

    const handleActualizarId = (id, name) => {
        //console.log('Selected:', { id, name });
        // Aquí puedes manejar la lógica cuando se selecciona una tarjeta
        navigate("/products")

    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-[420px] mx-auto py-8">
            {/* Botón anterior */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Contenedor del carrusel */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {cards.map((card) => {
                        return <>
                        <div key={card.id} className="w-full flex-shrink-0 px-4">
                            <div className="flex justify-center py-4">
                                <div class="max-w-md mx-auto bg-gray-50 rounded-lg p-6 shadow-sm">
                                    <div class="mb-4">
                                        <p class="text-gray-700 text-lg italic leading-relaxed">
                                            "{card.mensaje}"
                                        </p>
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-gray-800 text-lg">{card.nombre}</h3>
                                        <p class="text-gray-500 text-sm">{card.tipoCliente}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    })}
                </div>
            </div>

            {/* Botón siguiente */}
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Indicadores de posición */}
            <div className="flex justify-center mt-6 space-x-2">
                {cards && cards.length > 0 && cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-blue-500 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardCarouselComentariosMobile;