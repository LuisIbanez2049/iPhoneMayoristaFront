import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MessageAlert from './MessageAlert';

const CreateProductForm = ({ onActualizar }) => {

    //const baseUrl = "http://localhost:8080"
    const baseUrl = import.meta.env.VITE_APP_DATABASE_URL


    const [categories, setCategories] = useState([])
    const [areThereChanges, setAreThereChanges] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        categoryId: ''
    });

    const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
    const [textMessageAlert, setTextMessageAlert] = useState("")
    const [isMinorista, setIsMinorista] = useState(true)
    const [categoryType, setCategoryType] = useState("MINORISTA")


    // const categories = [
    //     { id: '1', name: 'Electronics' },
    //     { id: '2', name: 'Clothing' },
    //     { id: '3', name: 'Home & Kitchen' },
    //     { id: '4', name: 'Books' },
    //     { id: '5', name: 'Sports' }
    // ];

    useEffect(() => {
        axios.get(`${baseUrl}/api/category/`)
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    const formatPrice = (value) => {
        if (!value) return '';

        // Remover todos los caracteres excepto dígitos y punto
        let numericValue = value.replace(/[^\d.]/g, '');

        // Dividir la parte entera y decimal
        let [integerPart, decimalPart] = numericValue.split('.');

        // Limitar los decimales a 2 dígitos
        if (decimalPart !== undefined) {
            decimalPart = decimalPart.slice(0, 2);
        }

        // Formatear la parte entera con separador de miles
        integerPart = new Intl.NumberFormat('en-US').format(integerPart);

        // Unir parte entera y decimal
        return decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
    };

    const handlePriceChange = (e) => {
        const rawValue = e.target.value.replace(/[^\d.]/g, '');
        setFormData({
            ...formData,
            price: rawValue ? formatPrice(rawValue) : ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAreThereChanges(true)
        if (name === 'price') {
            handlePriceChange(e);
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Remove formatting for actual numeric value
        setAreThereChanges(false)
        const numericPrice = formData.price ? parseFloat(formData.price.replace(/,/g, '')) : 0;
        const submitData = {
            ...formData,
            price: numericPrice
        };
        console.log('Form submitted:', submitData);
        // Here you would typically send the data to your API

        onActualizar(submitData)

        setTextMessageAlert("Cambios gurdados exitosamente.")
        setViewAlertMesaggeFromAPI(true)
    };


    const handleOnClickAcceptAlertMessage = () => {

        setViewAlertMesaggeFromAPI(false)
        setTextMessageAlert("")

    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 ">

            <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} />

            <div className="lg:w-[950px] w-full flex flex-col items-center">
                <div className='w-[90%]'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl border border-[#ccc] overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                            <h2 className="text-2xl font-bold text-white text-center">Características del producto</h2>
                            <p className="text-gray-300 text-center mt-1">Agrega las características del producto abajo</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Ingresa nombre de producto"
                                    required
                                />
                            </div>

                            {/* Price Field */}
                            <div className="space-y-2">
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                                    Precio
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Stock Field */}
                            <div className="space-y-2">
                                <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Ingresa el stock disponible"
                                    required
                                />
                            </div>

                            {/* Category Field */}
                            <div className="space-y-2">
                                <div className='w-full flex flex-row justify-center gap-8'>
                                    <button type='button' onClick={() => {
                                        setIsMinorista(true)
                                        setCategoryType("MINORISTA")
                                    }}>
                                        <h1 className={`transition-all duration-500 ${isMinorista ? "bg-black text-white" : "bg-slate-200"} hover:bg-black hover:text-white py-2 px-3 rounded-full shadow-md`}>Minorista</h1>
                                    </button>

                                    <button type='button'
                                        onClick={() => {
                                            setIsMinorista(false)
                                            setCategoryType("MAYORISTA")
                                        }}>
                                        <h1 className={`transition-all duration-500 ${isMinorista ? "bg-slate-200" : "bg-black text-white"} hover:bg-black hover:text-white py-2 px-3 rounded-full shadow-md`}>Mayorista</h1>
                                    </button>
                                </div>
                                <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700">
                                    Categoria
                                </label>
                                <select
                                    id="categoryId"
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                                    required
                                >
                                    <option value="">Selecciona una categoria</option>
                                    {categories && categories.length > 0 && categories.map((category) => {
                                        if (category.sectionCategory === categoryType) {
                                            return (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            )
                                        }
                                    })}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className={`w-full ${areThereChanges ? "bg-[#002fff]" : "bg-[#80808085]"} text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-400 mt-4`}
                            >
                                Guardar Cambios
                            </motion.button>

                            {/* <button className='bg-red-700 p-2 rounded-lg'
                                onClick={() => console.log(formData)}>
                                VerData
                            </button> */}
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

// Framer Motion wrapper component
const motion = {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>
};

// Add framer-motion functionality
const createMotionComponent = (Component) => {
    return ({ initial, animate, transition, ...props }) => {
        // Simple animation implementation for environments without framer-motion
        return <Component {...props} />;
    };
};

// Create motion components
motion.div = createMotionComponent('div');
motion.button = createMotionComponent('button');

export default CreateProductForm;