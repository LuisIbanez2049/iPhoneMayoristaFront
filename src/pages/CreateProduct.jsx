import React, { useEffect, useState } from 'react'
import DragAndDropUploader from '../components/DragAndDropUploader'
import DescriptionForm from '../components/DescriptionForm'
import CreateProductForm from '../components/CreateProductForm'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'
import MessageAlert from '../components/MessageAlert'
import { useNavigate } from 'react-router'

function CreateProduct() {

    const baseUrl = "http://localhost:8080"

    const [productDataForm, setProductDataForm] = useState({ name: '', price: '', stock: '', categoryId: '' })
    const [fileLinks, setFileLinks] = useState([])
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
    const [textMessageAlert, setTextMessageAlert] = useState("")

    const navigate = useNavigate();

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



    // función que pasamos al hijo
    const actualizarProductDataForm = (object) => {
        setProductDataForm(object);
    };

    const actualizarDescription = (descriptionText) => {
        setDescription(descriptionText);
    };

    const actualizarFileLinks = (links) => {
        setFileLinks(links)
    }

    const bodyForAPI = {
        name: productDataForm.name,
        price: productDataForm.price,
        stock: productDataForm.stock,
        categoryId: productDataForm.categoryId,
        fileLinks: fileLinks,
        description: description

    }


    const createProduct = () => {
        setIsLoading(true)
        //setViewLoadingComponent(true)
        const token = localStorage.getItem("token")
        let tokenSinComillas = token.replace(/"/g, '');
        //console.log(tokenSinComillas)
        // axios.get("http://localhost:8080/api/materias/availablesubjects", {
        axios.post(`${baseUrl}/api/product/create`, bodyForAPI, {
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
    // useEffect(() => {
    //     //setViewLoadingComponent(true)
    //     //const token = localStorage.getItem("userToken")
    //     let token = "";
    //     let tokenSinComillas = token.replace(/"/g, '');
    //     console.log(tokenSinComillas)
    //     // axios.get("http://localhost:8080/api/materias/availablesubjects", {
    //         axios.post("http://localhost:8080/api/product/create", bodyForAPI, {
    //         headers: {
    //             Authorization: `Bearer ${tokenSinComillas}`
    //         }
    //     })
    //         .then((response) => {
    //             //setViewLoadingComponent(false)
    //             console.log(response.data)
    //         })
    //         .catch((error) => {
    //             //setViewLoadingComponent(false)
    //             console.log(error)
    //         });
    // }, [])


    return (
        <div>
            <LoadingSpinner isLoading={isLoading} />
            <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} />

            <CreateProductForm onActualizar={actualizarProductDataForm} />
            <DragAndDropUploader onActulizarArchivos={actualizarFileLinks} />
            <DescriptionForm onActualizarDescripcion={actualizarDescription} />



            <div className={`hidden flex flex-col items-center mt-[20px]`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => console.log(bodyForAPI)}>
                    VER API BODY
                </button>
            </div>
            <div className={`flex flex-col items-center mt-[20px]`}>

                <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-[30px] font-bold text-white px-10 py-3 shadow-lg my-8 rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    onClick={() => createProduct()}>
                    CREAR PRODUCTO
                </button>
            </div>



        </div>
    )
}


export default CreateProduct