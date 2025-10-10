import { motion } from "framer-motion";

export default function Footer() {
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                <motion.div className="my-[20px]"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}>
                    <h1 className="font-bold text-center text-[30px] lg:text-[35px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 ">¿Tienes dudas?</h1>
                    <h1 className="text-[18px] text-center text-gray-600">Contactanos y con gusto te asistiremos 😊</h1>
                </motion.div>
                {/* Main content container */}
                <div className="flex flex-row flex-wrap justify-between gap-6 mb-8">
                    {/* Left section - Visit us in our office */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        className="bg-white rounded-lg shadow-md p-6 w-[600px]"
                    >
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Visítanos en nuestra oficina
                            <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2"></span>
                        </h2>

                        <p className="text-gray-700 mb-6">
                            En <span className="font-bold text-blue-600">***</span> nos enorgullecemos de ofrecerte un espacio cómodo y seguro para que conozcas y retires tu nuevo iPhone. Ubicados estratégicamente en CABA, contamos con un showroom donde podrás verificar tu equipo antes de realizar la compra.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Location */}
                            <div className="flex items-start space-x-3">
                                <svg className="w-8 text-[#2980B9] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Ubicación Céntrica</h3>
                                    <p className="text-sm text-gray-600">En pleno centro de CABA, con fácil acceso por transporte público.</p>
                                </div>
                            </div>

                            {/* Extended hours */}
                            <div className="flex items-start space-x-3">
                                <svg className="w-8 text-[#2980B9] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Horario Extendido</h3>
                                    <p className="text-sm text-gray-600">Lunes a viernes de 10:00 a 19:00 hs y sábados de 10:00 a 14:00 hs.</p>
                                </div>
                            </div>

                            {/* Personalized attention */}
                            <div className="flex items-start space-x-3">
                                <svg className="w-8 text-[#2980B9] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Atención Personalizada</h3>
                                    <p className="text-sm text-gray-600">Nuestros asesores te guiarán y despejarán todas tus dudas.</p>
                                </div>
                            </div>

                            {/* Secure purchase */}
                            <div className="flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path></svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Compra Segura</h3>
                                    <p className="text-sm text-gray-600">Verificá tu equipo antes de finalizar la compra y obtené garantía oficial.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right section - Contact information */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg shadow-md p-6 w-[600px]"
                    >
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Información de contacto</h3>

                        <div className="space-y-4">
                            {/* Office location */}
                            <div className="flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 lg:w-5 text-blue-600 mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Oficina Central</h4>
                                    <p className="text-sm text-gray-600">Av. Corrientes 1464 piso 4 Oficina 1, Ciudad Autónoma de Buenos Aires</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-blue-600 mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 4.972-4.03 9-9 9s-9-4.028-9-9 4.03-9 9-9 9 4.028 9 9Z"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Teléfono de contacto</h4>
                                    <p className="text-sm text-gray-600">1111111111</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-blue-600 mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Email</h4>
                                    <p className="text-sm text-gray-600">admin@admin.com</p>
                                </div>
                            </div>

                            {/* Social media */}
                            <div className="flex items-center space-x-4 pt-2">
                                <svg className="w-5 text-[#2980B9] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                </svg>
                                <i className="fa-brands fa-square-facebook text-[24px]"></i>
                                <i className="fa-brands fa-instagram text-[24px]"></i>
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* Map section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
                >

                    <iframe
                        className=" w-full h-[350px]"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52525.108217839006!2d-58.5053188398888!3d-34.634007362283114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb5de7acd35b%3A0x26e660e005ce8630!2sBuenos%20Aires%20Bus!5e0!3m2!1ses-419!2sar!4v1760074017835!5m2!1ses-419!2sar">

                    </iframe>

                </motion.div>

                <div className="w-full border-t-2 border-gray-400 mt-[30px] flex flex-col items-center pt-[5px]">
                    <h1 className="text-[14px]">© Copyright {new Date().getFullYear()} Todos los derechos reservados.</h1>
                </div>



            </div>
        </div>
    );
}