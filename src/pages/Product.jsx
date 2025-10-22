import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import HtmlToTailwind from '../components/HtmlToTailwind';
import LoadingSpinner from '../components/LoadingSpinner';

function Product() {

  const baseUrl = "http://localhost:8080"
  const isToken = localStorage.getItem("token")


  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

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
        return (
          <iframe className={`w-full h-[100%] object-contain ${isFullscreenView ? 'max-h-screen' : 'h-96'}`} src={url} frameborder="0"></iframe>
        )
      } else {
        return (
          <video
            ref={el => videoRefs.current[currentIndex] = el}
            className={`w-full h-[100%] object-contain  ${isFullscreenView ? 'max-h-screen' : 'h-96'}`}
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
          className={`w-full h-[100%] object-contain ${isFullscreenView ? 'max-h-screen' : 'h-96'}`}
        />
      );
    }
  };







  const { id } = useParams(); // obtiene el id desde la URL
  const [productData, setProductData] = useState({ id: 0, name: "", stock: 0, price: 0, fileLinks: [""], category: "", categoryId: 0, description: "" })

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${baseUrl}/api/product/${id}`)
      .then((response) => {
        console.log(response.data)
        setProductData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

  }, [])
  return (
    <div className="min-h-screen bg-white pt-8">

      <LoadingSpinner isLoading={isLoading} />
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
          <div className="lg:w-[40vw] lg:h-[100vh] w-full lg:sticky lg:top-[20px] ">
            <div className="bg-gray-50 rounded-2xl p-4 shadow-sm ">
              <div className="relative bg-white rounded-xl overflow-hidden ">
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
                <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto py-2">
                  {productData.fileLinks.map((link, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
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
          <div className="lg:w-[40vw] w-full flex flex-col">
            <div className=" bg-white rounded-2xl p-6 shadow-sm sticky top-8 h-fit border border-gray-300">

              <button className={`${isToken ? "show" : "hidden"} absolute right-5 bg-[#002fff] p-3 text-[white] font-semibold text-[20px] rounded-lg shadow-lg`}
                onClick={() => navigate(`/product/edit/${id}`)}>
                EDITAR
              </button>

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
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${productData.stock > 0
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
                  <HtmlToTailwind html={productData.description} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">


                  <a href="http://" target="_blank" rel="noopener noreferrer" className='w-full'>
                    <div
                      className="bg-black text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-all duration-200 flex-1"
                    >
                      <div className='w-full flex flex-row justify-center items-center gap-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-[40px] lg:w-[60px]' viewBox="0 0 48 48">
                          <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                        </svg>
                        <h1 className='text-[15px] lg:text-[24px]'>PEDIR PRODUCTO</h1>
                      </div>
                    </div>
                  </a>


                  <button
                    className="hidden border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition-all duration-200 flex-1"
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