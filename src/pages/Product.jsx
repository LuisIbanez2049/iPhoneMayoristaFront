import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import HtmlToTailwind from '../components/HtmlToTailwind';

function Product() {


  // const productData = {
  //   id: 1,
  //   name: "MackBook Air",
  //   cant: 4,
  //   precio: 120,
  //   fileLinks: [""],
  //   category: "Mac",
  //   categoryId: 2,
  //   description: ""
  // };

  useEffect(() => {
    window.scrollTo(0, 0); // X=0, Y=0 (arriba del todo)
  }, []);


   const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef([]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === productData.fileLinks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? productData.fileLinks.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const isVideo = (url) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || url.includes('video') || url.includes('youtu');
  };

  const renderMedia = (url, isFullscreenView = false) => {
    if (isVideo(url)) {

      if (url.includes('youtu')) {
        return(
          <iframe className={`w-full h-full object-contain ${isFullscreenView ? 'max-h-screen' : 'h-96'}`} src={url} frameborder="0"></iframe>
        )
      } else {
        return (
        <video 
          ref={el => videoRefs.current[currentIndex] = el}
          className={`w-full h-full object-contain ${isFullscreenView ? 'max-h-screen' : 'h-96'}`}
          controls
          playsInline
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
      }
      
    } else {
      return (
        <img 
          src={url} 
          alt={`Product ${currentIndex + 1}`} 
          className={`w-full h-full object-contain ${isFullscreenView ? 'max-h-screen' : 'h-96'}`}
        />
      );
    }
  };







  const { id } = useParams(); // obtiene el id desde la URL
  const [productData, setProductData] = useState({id: 0, name: "", stock: 0, price: 0, fileLinks: [""], category: "", categoryId: 0, description: ""})

  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        console.log(response.data)
        setProductData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])
  return (
    <div className="min-h-screen bg-white">
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={toggleFullscreen}>
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
              onClick={toggleFullscreen}
            >
              ✕
            </button>
            <div className="w-full h-full flex items-center justify-center">
              {renderMedia(productData.fileLinks[currentIndex], true)}
            </div>
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            >
              ‹
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {productData.fileLinks.length}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Carousel Section */}
          <div className="lg:w-1/2 lg:h-[100vh] w-full lg:sticky lg:top-[20px]">
            <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
              <div className="relative bg-white rounded-xl overflow-hidden">
                <div className="relative w-full lg:h-[600px] h-[350px]">
                  {renderMedia(productData.fileLinks[currentIndex])}
                  
                  {/* Navigation Buttons */}
                  <button 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-90 transition-all shadow-md"
                    onClick={prevSlide}
                  >
                    ‹
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-90 transition-all shadow-md"
                    onClick={nextSlide}
                  >
                    ›
                  </button>
                  
                  {/* Fullscreen Button */}
                  <button 
                    className="absolute top-4 right-4 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-90 transition-all shadow-md"
                    onClick={toggleFullscreen}
                  >
                    ↗
                  </button>
                  
                  {/* Counter */}
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentIndex + 1} / {productData.fileLinks.length}
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                  {productData.fileLinks.map((link, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => goToSlide(index)}
                    >
                      {isVideo(link) ? (
                        <div className="w-16 h-16 bg-black flex items-center justify-center text-white text-xs">
                          <iframe src={link} frameborder="0" className=' pointer-events-none' ></iframe>
                        </div>
                      ) : (
                        <img 
                          src={link} 
                          alt={`Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Info Section */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8 h-fit">
              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {productData.name}
              </h1>
              
              {/* Category */}
              <div className="text-sm text-gray-500 mb-6 uppercase tracking-wide font-medium">
                {productData.category}
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                  ${productData.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 ml-2">USD</span>
              </div>
              
              {/* Stock */}
              <div className="mb-8">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  productData.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {productData.stock > 0 
                    ? `${productData.stock} en stock` 
                    : 'Agotado'
                  }
                </span>
              </div>
              
              {/* Description */}
              <div className="  pr-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
                <div className="text-gray-700 leading-relaxed text-base space-y-4">
                  <HtmlToTailwind html={productData.description}/>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="bg-black text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-all duration-200 flex-1"
                    disabled={productData.stock === 0}
                  >
                    Añadir al carrito
                  </button>
                  <button 
                    className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition-all duration-200 flex-1"
                  >
                    Comprar ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product