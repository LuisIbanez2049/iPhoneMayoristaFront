import React from 'react'
import { Link } from 'react-router'

function MessageAlert({ view, onClickAccept, text, cancelButton, onClickCancel }) {
    return (
        <div className={` transition-opacity duration-500 ${view ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none z-0"} fixed top-0 z-10 w-[100vw] h-[100vh] flex flex-col items-center justify-center`}>
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mt-[-60px]">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Mensaje Importante</h2>
                    <p className="text-gray-600">
                        {text}
                    </p>
                </div>
                <div className="flex flex-row justify-end gap-4">

                    <button className={`bg-gray-800 text-white px-4 py-2 rounded-md transition-all duration-300 ${cancelButton === "viewCancel" ? "hover:bg-red-500" : "hover:bg-gray-600"}`}
                        onClick={() => onClickAccept()}>
                        Aceptar
                    </button>

                    <button className={`${cancelButton === "viewCancel" ? "show" : "hidden"} bg-gray-800 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-600`}
                        onClick={() => onClickCancel()}>
                        Cancelar
                    </button>

                </div>
            </div>
        </div>
    )
}

export default MessageAlert