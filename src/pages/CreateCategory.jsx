import React, { useState } from 'react'
import DragAndDropWithoutText from '../components/DragAndDropWithoutText';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import axios from 'axios';

function CreateCategory() {

    const [image, setImage] = useState([""])
    const [name, setName] = useState("")
    const [categoryTipe, setCategoryTipe] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
    const [textMessageAlert, setTextMessageAlert] = useState("")


    const [formData, setFormData] = useState({
        name: '',
        category: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Here you would typically send the data to a server
        createCategory(formData, image[0])

        //alert('Form submitted successfully!');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const actualizarFileLinks = (links) => {
        setImage(links)
    }


    const createCategory = (data, img) => {

        let bodyForAPI = {
            name: data.name,
            tipeCategory: data.category,
            image: img
        }
        setIsLoading(true)
        //setViewLoadingComponent(true)
        //const token = localStorage.getItem("userToken")
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2wiOiJST0xFX0NMSUVOVCIsInN1YiI6Imx1aXNAZ21haWwuY29tIiwiaWF0IjoxNzU5MjA2OTM3LCJleHAiOjE3NTkyMTA1Mzd9.JsBaz3IpAyLVUpDp7FGlOGfFHFs03RealsqvBF6GdwA";
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        // axios.get("http://localhost:8080/api/materias/availablesubjects", {
        axios.post("http://localhost:8080/api/category/create", bodyForAPI, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setIsLoading(false)
                if (response.data.includes("Producto creado exitosamente.")) {
                    setViewAlertMesaggeFromAPI(true)
                    setTextMessageAlert(response.data)
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setTextMessageAlert(error.response.data)
                setViewAlertMesaggeFromAPI(true)
            });

    }

    const handleOnClickAcceptAlertMessage = () => {
        if (textMessageAlert.includes("Producto creado exitosamente.")) {
            setViewAlertMesaggeFromAPI(false)
            setTextMessageAlert("")
            navigate("/products")
        } else {
            setViewAlertMesaggeFromAPI(false)
            setTextMessageAlert("")
        }
    }


    return (
        <div className="w-full  p-6 bg-white rounded-lg mt-10 flex flex-col items-center">
            <LoadingSpinner isLoading={isLoading} />
            <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} />

            <div className='border border-gray-300 rounded-xl'>
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-lg">
                    <h1 className="text-xl font-bold text-center">Crear categoría</h1>
                    {/* <p className="text-sm opacity-80">Agrega los detalles abajo</p> */}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Minorista">Minorista</option>
                            <option value="Mayorista">Mayorista</option>
                        </select>
                    </div>

                    <DragAndDropWithoutText onActulizarArchivos={actualizarFileLinks} />


                    <button onClick={handleSubmit}
                        className="w-full bg-[#002fff] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory