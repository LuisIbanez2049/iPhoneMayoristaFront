import React, { useEffect, useState } from 'react'
import DragAndDropWithoutText from '../components/DragAndDropWithoutText';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { tr } from 'framer-motion/client';

function EditCategory() {

    const baseUrl = "http://localhost:8080"


    const [prevData, setPrevData] = useState({id: 0, sectionCategory:"", name: "", img: ""})

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [categoryTipe, setCategoryTipe] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
    const [textMessageAlert, setTextMessageAlert] = useState("")
    const [viewCancelButton, setViewCancelButton] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        setIsLoading(true)
        axios.get(`${baseUrl}/api/category/${id}`)
            .then((response) => {
                console.log(response.data)
                setPrevData(response.data)
                setName(response.data.name)
                setCategoryTipe(response.data.sectionCategory)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }, [])





    const editarCategoria = () => {

        let bodyForAPI = {
            categoryId: id,
            name: name,
            img: `${image ? image : prevData.img}`,
            isActive: true,
            categorySection: categoryTipe,
        }
        setIsLoading(true)
        const token = localStorage.getItem("token")
        let tokenSinComillas = token.replace(/"/g, '');
        //console.log(tokenSinComillas)
        // axios.get("http://localhost:8080/api/materias/availablesubjects", {
        axios.patch(`${baseUrl}/api/category/modificar`, bodyForAPI, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setIsLoading(false)

                setViewAlertMesaggeFromAPI(true)
                setTextMessageAlert(response.data)

            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setTextMessageAlert(error.response.data)
                setViewAlertMesaggeFromAPI(true)
            });

    }

    const handleOnClickAcceptAlertMessage = () => {
        if (viewCancelButton) {
            eliminarCategoria()
        }
        if (textMessageAlert.includes("correctamente.") || textMessageAlert.includes("éxito")) {
            setViewAlertMesaggeFromAPI(false)
            setTextMessageAlert("")
            navigate("/products")
        } else {
            setViewAlertMesaggeFromAPI(false)
            setTextMessageAlert("")
        }
    }

    const eliminarCategoria = () => {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        let tokenSinComillas = token.replace(/"/g, '');
        //console.log(tokenSinComillas)
        // axios.get("http://localhost:8080/api/materias/availablesubjects", {
        axios.delete(`${baseUrl}/api/category/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setIsLoading(false)

                setViewAlertMesaggeFromAPI(true)
                setTextMessageAlert(response.data)
                setViewCancelButton("")

            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setTextMessageAlert(error.response.data)
                setViewAlertMesaggeFromAPI(true)
            });
    }

    const handleOnClickCancelAlertMessage = () => {
        setViewAlertMesaggeFromAPI(false)
        setViewCancelButton("")
        setTextMessageAlert("")
    }


    return (
        <div className="w-full  p-6 bg-white rounded-lg mt-10 flex flex-col items-center">
            <LoadingSpinner isLoading={isLoading} />
            <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} cancelButton={viewCancelButton} onClickCancel={handleOnClickCancelAlertMessage}/>

            <div className='border border-gray-300 rounded-xl'>
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-lg">
                    <h1 className="text-xl font-bold text-center">Crear categoría</h1>
                    {/* <p className="text-sm opacity-80">Agrega los detalles abajo</p> */}
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value) }
                            placeholder="Enter product name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={categoryTipe}
                            onChange={(e) => setCategoryTipe(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="MINORISTA">Minorista</option>
                            <option value="MAYORISTA">Mayorista</option>
                        </select>
                    </div>


                    <div>
                        <div className=' lg:w-[400px] lg:h-[400px] flex flex-col items-center justify-center border border-gray-400 rounded-xl overflow-hidden'>
                            <img className='' src={`${image ? image : prevData.img}`} alt="" />
                        </div>
                        <h1 className='text-[15px] text-gray-600 my-[8px]'>Agrega la nueva imagen abajo</h1>
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={image}
                            onChange={(e) => setImage(e.target.value) }
                            placeholder="Ingresa el link de la nueva imagen"
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    </div>


                    <button onClick={editarCategoria}
                        className="w-full bg-[#002fff] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Guardar Cambios
                    </button>
                    <div className='w-full flex flex-row justify-center'>
                        <button onClick={() => navigate("/products")}
                        className=" bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium hover:bg-red-700"
                    >
                        CANCELAR
                    </button>
                    </div>
                    <div className='w-full flex flex-row justify-end'>
                        <button onClick={() => {
                            setTextMessageAlert("¿Seguro que quieres eliminar esta categoría?")
                            setViewAlertMesaggeFromAPI(true)
                            setViewCancelButton("viewCancel")
                        }}>
                            <i className="fa-solid fa-trash text-[30px] transition-all duration-200 hover:text-red-700"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategory