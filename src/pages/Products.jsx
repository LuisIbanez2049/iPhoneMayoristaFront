import React, { useEffect, useState } from 'react'
import CardFilter from '../components/CardFilter'
import axios from 'axios'

function Products() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/api/product/")
    .then((response) => {
      console.log(response.data)
      setProducts(response.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])
  return (
    <div>
        Products
        <div className='w-[100%] flex flex-row justify-center gap-8 flex-wrap'>
          {products && products.length > 0 && products.map((product) => {
            return (
              <CardFilter/>
            )
          })}
            
            {/* <CardFilter/>
            <CardFilter/> */}
        </div>

        
    </div>
  )
}

export default Products