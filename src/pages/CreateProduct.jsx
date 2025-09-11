import React, { useState } from 'react'
import DragAndDropUploader from '../components/DragAndDropUploader'
import DescriptionForm from '../components/DescriptionForm'
import CreateProductForm from '../components/CreateProductForm'

function CreateProduct() {

    const [productDataForm, setProductDataForm] = useState({ name: '', price: '', stock: '', categoryId: '' })
    const [fileLinks, setFileLinks] = useState([])
    const [description, setDescription] = useState("")

    // función que pasamos al hijo
    const actualizarProductDataForm = (object) => {
        setProductDataForm(object);
    };

    const actualizarDescription = (descriptionText) => {
        setDescription(descriptionText);
    };

    const bodyForAPI = {
        name: productDataForm.name,
        price: productDataForm.price,
        categoryId: productDataForm.categoryId,
        fileLinks: "",
        description: description

    }
    return (
        <div>
            Hola

            <CreateProductForm onActualizar={actualizarProductDataForm}/>
            <DragAndDropUploader />
            <DescriptionForm onActualizarDescripcion={actualizarDescription}/>


            <div className={`flex flex-col items-center mt-[20px]`}>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => console.log(bodyForAPI)}>
                    VER API BODY
                </button>
            </div>

        </div>
    )
}


export default CreateProduct