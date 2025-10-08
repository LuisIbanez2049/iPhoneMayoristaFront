
import React, { useState } from 'react';
import CardFilter from './CardFilter';
import { useNavigate } from 'react-router';

function CardsCarousel({arrayCategories}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  
  // Mock data for the carousel
  const cards = [
    { id: 1, img: 'https://placehold.co/350x450/1e40af/ffffff?text=Mac+1', name: 'MacBook Pro' },
    { id: 2, img: 'https://placehold.co/350x450/1e40af/ffffff?text=Mac+2', name: 'iMac' },
    { id: 3, img: 'https://placehold.co/350x450/1e40af/ffffff?text=Mac+3', name: 'Mac Studio' },
    { id: 4, img: 'https://placehold.co/350x450/1e40af/ffffff?text=Mac+4', name: 'Mac Mini' },
    { id: 5, img: 'https://placehold.co/350x450/1e40af/ffffff?text=Mac+5', name: 'MacBook Air' },
  ];

  const handleActualizarId = (id, name) => {
    //console.log('Selected:', { id, name });
    // Aquí puedes manejar la lógica cuando se selecciona una tarjeta
    navigate("/products")

  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === arrayCategories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? arrayCategories.length - 1 : prevIndex - 1
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
          {arrayCategories && arrayCategories.length > 0 && arrayCategories.map((card) => (
            <div key={card.id} className="w-full flex-shrink-0">
              <div className="flex justify-center py-4">
                <CardFilter 
                  id={card.id} 
                  img={card.img} 
                  name={card.name} 
                  onActualizarId={handleActualizarId}
                />
              </div>
            </div>
          ))}
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
        {arrayCategories && arrayCategories.length > 0 && arrayCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
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

export default CardsCarousel;

