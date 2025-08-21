import React, { useState, useCallback } from "react";

export default function DragAndDropUploader() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("Por favor selecciona o arrastra un archivo");
      return;
    }

    // 🚨 Reemplazá con tus datos de Cloudinary
    const cloudName = "dlyoighih"; 
    const uploadPreset = "ml_defaultPrueba"; 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("✅ URL de la imagen subida:", data.secure_url);

      // acá podés luego enviar data.secure_url a tu API
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {/* Área de drag & drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-80 h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
        }`}
      >
        {file ? (
          <p className="text-gray-700">{file.name}</p>
        ) : (
          <p className="text-gray-500">Arrastra tu imagen aquí</p>
        )}
      </div>

      {/* Botón submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Subir imagen
      </button>
    </div>
  );
}
