import React, { useEffect, useState } from 'react'
import CardFilter from '../components/CardFilter'
import axios from 'axios'
import CardProduct from '../components/CardProduct'
import LoadingSpinner from '../components/LoadingSpinner'
import { motion } from "framer-motion"

function Products() {

  const baseUrl = "http://localhost:8080"

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [nameFilteredCategory, setNameFilteredCategory] = useState("")
  const [categorias, setCategorias] = useState([])
  const [seeFilteredProduct, setSeeFilteredProduct] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //----------------------------FUNCIÓN PARA QUE CUANDO CARGUE EL COMPONENTE SE VEA DESDE EL PRINCIPIO Y NO DESDE CAULQUIER PARTE DE LA PAGINA
  useEffect(() => {
     window.scrollTo(0, 0); // X=0, Y=0 (arriba del todo)
  }, []);
  //----------------------------FUNCIÓN PARA QUE CUANDO CARGUE EL COMPONENTE SE VEA DESDE EL PRINCIPIO Y NO DESDE CAULQUIER PARTE DE LA PAGINA

    

  // 🔍 Nuevos estados para filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("") // "asc" | "desc" | ""

  useEffect(() => {
    axios.get(`${baseUrl}/api/category/`)
      .then((response) => {
        const categoriasMinorista = response.data.filter(categoria => categoria.sectionCategory === "MINORISTA")
        setCategorias(categoriasMinorista)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${baseUrl}/api/product/minorista`)
      .then((response) => {
        setProducts(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const actualizarCategoryId = (id, name) => {
    setCategoryId(id)
    setNameFilteredCategory(name)
    filtrarProductos(id)
    setSeeFilteredProduct(true)
    setSearchTerm("") // limpiar búsqueda al cambiar categoría
    setSortOrder("")  // limpiar orden al cambiar categoría
  }

  // 🔹 Filtra por categoría
  function filtrarProductos(categoriaId) {
    const productosFiltrados = products.filter(product => product.categoryId == categoriaId)
    setFilteredProducts(productosFiltrados)
  }

  // 🔹 Filtra + ordena + busca (dependiendo de estados)
  const obtenerProductosFiltrados = () => {
    let productos = seeFilteredProduct
      ? [...filteredProducts] // si hay categoría seleccionada
      : [...products] // si se muestran todos

    // 🔍 Filtro por búsqueda
    if (searchTerm.trim() !== "") {
      productos = productos.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 💰 Ordenar
    if (sortOrder === "asc") {
      productos.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "desc") {
      productos.sort((a, b) => b.price - a.price)
    }

    return productos
  }

  const productosParaMostrar = obtenerProductosFiltrados()

  return (
    <div className='pb-[50px]'>
      <LoadingSpinner isLoading={isLoading} />

      {/* 🔹 Filtros de categoría */}
      <div className={`w-[100%] flex flex-row justify-${categorias.length > 1 ? "start" : "center"} sm:justify-center px-6 py-3 gap-8 overflow-x-scroll mt-[120px] scroll-mx-7`}>
        {categorias && categorias.length > 0 && categorias.map((categoria) => (
          <CardFilter
            key={categoria.id}
            id={categoria.id}
            img={categoria.img}
            name={categoria.name}
            onActualizarId={actualizarCategoryId}
          />
        ))}
      </div>

      {/* 🔹 Barra de búsqueda y orden */}
      <div className='flex flex-col lg:flex-row justify-center items-center gap-4 mt-6'>
        <input
          type='text'
          placeholder='Buscar por nombre...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-400 rounded-lg px-4 py-2 w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-400'
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className='border border-gray-400 rounded-lg px-4 py-2'
        >
          <option value=''>Ordenar por precio</option>
          <option value='asc'>Menor a mayor</option>
          <option value='desc'>Mayor a menor</option>
        </select>
      </div>

      {/* 🔹 Mostrar todos los productos */}
      <div className={`w-[100%] flex flex-row justify-center px-[10%] overflow-hidden mt-[80px] gap-8 p-4 flex-wrap transition-all duration-700 ease-in-out
  ${seeFilteredProduct ? "opacity-0 absolute pointer-events-none z-0" : "opacity-100 translate-y-0 z-10"}`}>
        {productosParaMostrar && productosParaMostrar.length > 0 ? (
          productosParaMostrar.map((product) => (
            <CardProduct
              key={product.id}
              img={product.firstImage}
              name={product.name}
              id={product.id}
              price={product.price}
            />
          ))
        ) : (
          <p className='text-gray-600 mt-10'>No se encontraron productos</p>
        )}
      </div>

      {/* 🔹 Título de categoría seleccionada */}
      <h1 className={`font-bold text-[35px] text-center mt-[50px] text-[#000000c5] ${seeFilteredProduct ? "show" : "hidden"}`}>
        {nameFilteredCategory}
      </h1>

      {/* 🔹 Botón para ver todos */}
      <div className={`w-[100%] flex flex-row justify-center mt-[10px] ${seeFilteredProduct ? "show" : "hidden"}`}>
        <button
          className='text-[15px] font-semibold text-[#00000096]'
          onClick={() => {
            setSeeFilteredProduct(false)
            setSearchTerm("")
            setSortOrder("")
          }}
        >
          VER TODOS LOS PRODUCTOS
        </button>
      </div>

      {/* 🔹 Productos filtrados por categoría */}
      <div 
      className={`w-[100%] flex flex-row justify-center px-[10%] gap-8 p-4 flex-wrap transition-all duration-700 ease-in-out ${seeFilteredProduct ? "opacity-100 translate-y-0 z-10" : "opacity-0 absolute pointer-events-none z-0 hidden"}`}>
        {productosParaMostrar && productosParaMostrar.length > 0 ? (
          productosParaMostrar.map((product) => (
            <CardProduct
              key={product.id}
              img={product.firstImage}
              name={product.name}
              id={product.id}
              price={product.price}
            />
          ))
        ) : (
          <p className='text-gray-600 mt-10'>No se encontraron productos</p>
        )}
      </div>
    </div>
  )
}

export default Products










// import React, { useEffect, useState } from 'react'
// import CardFilter from '../components/CardFilter'
// import axios from 'axios'
// import CardProduct from '../components/CardProduct'
// import LoadingSpinner from '../components/LoadingSpinner'

// function Products() {

//   const baseUrl = "http://localhost:8080"


//   const [products, setProducts] = useState([])
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [categoryId, setCategoryId] = useState(0)
//   const[nameFilteredCategory, setNameFilteredCategory] = useState("")
//   const [categorias, setCategorias] = useState([])
//   const [seeFilteredProduct, setSeeFilteredProduct] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     axios.get(`${baseUrl}/api/category/`)
//     .then((response) => {
//       console.log(response.data)
//       setCategorias(response.data)
//     })
//     .catch((error) => {
//       console.log(error)
//     })

//   }, [])

//   useEffect(() => {
//     setIsLoading(true)
//     axios.get(`${baseUrl}/api/product/minorista`)
//     .then((response) => {
//       console.log(response.data)
//       setProducts(response.data)
//       setIsLoading(false)
//     })
//     .catch((error) => {
//       console.log(error)
//       setIsLoading(false)
//     })

//   }, [])

//   const actualizarCategoryId = (id, name) =>{
//     console.log("Mi id es: " + id)
//     setCategoryId(id)
//     setNameFilteredCategory(name)
//     filtrarProductos(id)
//     setSeeFilteredProduct(true)
//   }

//   function filtrarProductos(categoriaId){
//     const productosFiltrados = products.filter(product => product.categoryId == categoriaId)
//     setFilteredProducts(productosFiltrados)
//   }

//   return (
//     <div className=' border border-black'>
//       <LoadingSpinner isLoading={isLoading}/>
//         <div className='w-[100%] flex flex-row justify-start lg:justify-center px-6 py-3 gap-8 overflow-x-scroll mt-[120px] scroll-mx-7'>
//           {categorias && categorias.length > 0 && categorias.map((categoria) => {
//             return (
//               <CardFilter id={categoria.id} img={categoria.img} name={categoria.name} onActualizarId={actualizarCategoryId}/>
//             )
//           })}
            
//         </div>

        

//         <div className={`w-[100%] flex flex-row justify-center px-[10%] mt-[80px] gap-8 p-4 flex-wrap ${seeFilteredProduct ? "hidden" : "show"}`}>
//           {products && products.length > 0 && products.map((product) => {
//             return (
//               <CardProduct img={product.firstImage} name={product.name} id={product.id} price={product.price}/>
//             )
//           })}
            
//         </div>


//         <h1 className={` font-bold text-[35px] text-center mt-[50px] text-[#000000c5] ${seeFilteredProduct ? "show" : "hidden"}`}>{nameFilteredCategory}</h1>
//         <div className={`w-[100%] flex flex-row justify-center mt-[10px] ${seeFilteredProduct ? "show" : "hidden"}`}>
//           <button className='text-[15px] font-semibold text-[#00000096]' onClick={() => setSeeFilteredProduct(false)}> VER TODOS LOS PRODUCTOS</button>
//         </div>

//         <div className={`w-[100%] flex flex-row justify-center px-[10%] gap-8 p-4 flex-wrap ${seeFilteredProduct ? "show" : "hidden"}`}>
//           {filteredProducts && filteredProducts.length > 0 && filteredProducts.map((product) => {
//             return (
//               <CardProduct img={product.firstImage} name={product.name} id={product.id} price={product.price}/>
//             )
//           })}
            
//         </div>

        
//     </div>
//   )
// }

// export default Products