import React, { useEffect, useState } from 'react'
import CardFilter from '../components/CardFilter'
import axios from 'axios'
import CardProduct from '../components/CardProduct'

function Products() {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const[nameFilteredCategory, setNameFilteredCategory] = useState("")
  const [categorias, setCategorias] = useState([])
  const [seeFilteredProduct, setSeeFilteredProduct] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8080/api/category/")
    .then((response) => {
      console.log(response.data)
      setCategorias(response.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

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

  const actualizarCategoryId = (id, name) =>{
    console.log("Mi id es: " + id)
    setCategoryId(id)
    setNameFilteredCategory(name)
    filtrarProductos(id)
    setSeeFilteredProduct(true)
  }

  function filtrarProductos(categoriaId){
    const productosFiltrados = products.filter(product => product.categoryId == categoriaId)
    setFilteredProducts(productosFiltrados)
  }

  return (
    <div className='my-[50px] px-[5%] pb-[2%] border border-black'>
        Products
        <div className='w-[100%] flex flex-row justify-center gap-8 flex-wrap'>
          {categorias && categorias.length > 0 && categorias.map((categoria) => {
            return (
              <CardFilter id={categoria.id} img={categoria.img} name={categoria.name} onActualizarId={actualizarCategoryId}/>
            )
          })}
            
        </div>

        <div className={`w-[100%] flex flex-row justify-end mt-[30px] ${seeFilteredProduct ? "show" : "hidden"}`}>
          <button className='text-[15px] font-semibold text-[#00000096]' onClick={() => setSeeFilteredProduct(false)}> VER TODOS LOS PRODUCTOS</button>
        </div>

        <div className={`w-[100%] flex flex-row justify-center px-[10%] mt-[80px] gap-8 flex-wrap ${seeFilteredProduct ? "hidden" : "show"}`}>
          {products && products.length > 0 && products.map((product) => {
            return (
              <CardProduct img={product.firstImage} name={product.name}/>
            )
          })}
            
        </div>


        <h1 className={`font-bold text-[35px] mt-[50px] text-[#000000c5] ${seeFilteredProduct ? "show" : "hidden"}`}>{nameFilteredCategory}</h1>
        <div className={`w-[100%] flex flex-row justify-center px-[10%] gap-8 flex-wrap ${seeFilteredProduct ? "show" : "hidden"}`}>
          {filteredProducts && filteredProducts.length > 0 && filteredProducts.map((product) => {
            return (
              <CardProduct img={product.firstImage} name={product.name}/>
            )
          })}
            
        </div>

        
    </div>
  )
}

export default Products