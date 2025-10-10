import React from 'react';
import { motion } from 'framer-motion';

const SectionInfo = () => {
  return (
    <motion.div 
      className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Columna izquierda: Confianza y Experiencia */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#87CDEF] mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-6 h-6 mr-3 text-[#87CDEF]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path>
              </svg>
              Confianza y Experiencia
            </h2>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Hace más de 5 años que trabajamos con tecnología Apple, ofreciendo una experiencia de compra clara, segura y cercana. Sabemos lo que buscás: productos confiables, atención real, y precios en USD que realmente valen la pena.
            </p>
            <h3 className="text-xl font-semibold text-[#87CDEF] mb-4">Lo que nos distingue:</h3>
            <ul className="space-y-3">
              {[
                "Productos 100% nuevos y originales",
                "Asesoramiento personalizado",
                "Retiro inmediato en nuestra oficina comercial en CABA",
                "El mejor precio en USD del mercado"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#87CDEF] mt-0.5 mr-2 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna derecha: Atención personalizada */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#87CDEF] mb-4">Atención personalizada de verdad</h2>
            <p className="mb-6 text-gray-300 leading-relaxed">
              En <span className="font-bold text-[#87CDEF]">***</span> te asesoramos de forma directa, sin scripts ni respuestas automáticas. Estamos para ayudarte a elegir el iPhone que mejor se adapta a vos, y acompañarte durante todo el proceso de compra.
            </p>
            <h3 className="text-xl font-semibold text-[#87CDEF] mb-4">Lo que te ofrecemos:</h3>
            <ul className="space-y-3">
              {[
                "Atención humana y personalizada en nuestra oficina",
                "Productos originales con garantía oficial de Apple",
                "Coordinación rápida para retiro o visitas"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#87CDEF] mt-0.5 mr-2 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Barra inferior con estadísticas */}
        <motion.div 
          className="mt-12 bg-gray-800 rounded-lg p-6 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-[#87CDEF]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9 9 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              <div>
                <div className="text-2xl font-bold text-white">+200</div>
                <div className="text-sm text-gray-400">Clientes</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-[#87CDEF]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div>
                <div className="text-2xl font-bold text-white">5 Años</div>
                <div className="text-sm text-gray-400">Trayectoria</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-[#87CDEF]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Garantía</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SectionInfo;