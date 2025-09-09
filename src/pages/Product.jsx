import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function Product() {

    const {id} = useParams(); // obtiene el id desde la URL
    const [productDeatils, setProductDeatils] = useState({})
    const[images, setImages] = useState([])

    useEffect(() => {
    axios.get(`http://localhost:8080/api/product/${id}`)
    .then((response) => {
      console.log(response.data)
      setProductDeatils(response.data)
      setImages(response.data.imageLinks)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])
  return (
    <div>
        <h1 className='text-[30px] text-[#000000b2] font-bold'>PRODUCT</h1>
        <h1 className='text-[20px] text-[#000000b2] font-semibold'>{productDeatils.name}</h1>

        {images && images.length > 0 && images.map((link) => {
            if (link.includes("video") || link.includes("youtu")) {
                return <>
              <iframe
                class="sm:w-[560px]  sm:h-[315px] w-full h-[160px] rounded-lg"
                src={link} 
                frameborder="0" 
                allowfullscreen
              >
                
              </iframe>
            </>
            } else {
                return <>
              <img className='w-[450px]' src={link} alt="" />
            </>
            }
        })}
    </div>
  )
}

export default Product