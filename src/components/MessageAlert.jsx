import React from 'react'
import { Link } from 'react-router'

function MessageAlert({ view, onClickAccept, text, linkRoute }) {
    return (
        <div className={` transition-opacity duration-500 ${view ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none z-0"} fixed z-10 w-[100vw] h-[100vh] flex flex-col items-center justify-center`}>
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mt-[-60px]">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Mensaje Importante</h2>
                    <p className="text-gray-600">
                        {text}
                    </p>
                </div>
                <div className="flex justify-end">

                    <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                        onClick={() => onClickAccept()}>
                        Aceptar
                    </button>

                </div>
            </div>
        </div>
    )
}

export default MessageAlert