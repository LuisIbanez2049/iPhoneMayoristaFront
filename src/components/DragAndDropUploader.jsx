import React, { useState, useRef, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import MessageAlert from "./MessageAlert";


export default function DragAndDropUploader({ onActulizarArchivos }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
  const [textMessageAlert, setTextMessageAlert] = useState("")
  const [isUploadedFiles, setIsUploadedFiles] = useState(false)

  // Manejar drop de archivos
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    addFiles(newFiles);
  };

  // Manejar selección manual de archivos
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    addFiles(newFiles);
  };

  const addFiles = (newFiles) => {
    const mappedFiles = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`, // id único
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  // Reordenar con drag & drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(files);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setFiles(reordered);
  };

  // Eliminar archivo individual
  const handleRemoveFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Subir a Cloudinary en el orden actual
  const handleUpload = async () => {
    const urls = [];
    setIsLoading(true)

    for (let f of files) {
      const formData = new FormData();
      formData.append("file", f.file);
      formData.append("upload_preset", `${uploadPreset}`); // ⚠️ tu preset de Cloudinary

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`, // ⚠️ tu Cloud name
        formData
      );

      urls.push(res.data.secure_url);
    }
    setIsLoading(false)
    setTextMessageAlert("Archivos guardados exitosamente.")
    setViewAlertMesaggeFromAPI(true)
    console.log("URLs finales en orden:", urls);
    onActulizarArchivos(urls)
    setIsUploadedFiles(true)
    // Aquí podrías enviar `urls` a tu API
  };

  // 🚨 Reemplazá con tus datos de Cloudinary
  const cloudName = "dlyoighih";
  const uploadPreset = "ml_defaultPrueba";


  const handleOnClickAcceptAlertMessage = () => {

    setViewAlertMesaggeFromAPI(false)
    setTextMessageAlert("")

  }


  return (
    <div className="lg:w-[950px] w-full mx-auto flex flex-col items-center">

      <LoadingSpinner isLoading={isLoading} />
      <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} />

      <div className="w-[90%]">

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-t-2xl mb-[15px]">
          <h2 className="text-2xl font-bold text-white text-center">Imagenes/Videos</h2>
          <p className="text-gray-300 text-center mt-1">Agrega imagenes o videos en el recuadro de abajo</p>
        </div>


        {/* Zona de drag & drop */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
          className="h-[120px] border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100"
        >
          <p className="text-gray-600">Arrastra archivos aquí o haz click</p>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*"
          />
        </div>

        {/* Lista arrastrable */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="files" direction="horizontal">
            {(provided) => (
              <div
                className="flex flex-wrap gap-4 mt-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {files.map((f, index) => (
                  <Draggable key={f.id} draggableId={f.id} index={index}>
                    {(provided) => (
                      <div
                        className="relative w-32 h-32 border rounded-lg overflow-hidden"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {f.file.type.startsWith("image/") ? (
                          <img
                            src={f.preview}
                            alt={f.file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={f.preview}
                            className="w-full h-full object-cover pointer-events-none"
                            controls
                          />
                        )}

                        {/* Botón eliminar */}
                        <button
                          onClick={() => handleRemoveFile(f.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={`${files.length > 0 ? "show" : "hidden"}  flex flex-col items-center mt-[20px]`}>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setFiles([])}>
            Cancelar
          </button>
        </div>

        {/* Botón subir */}
        {files.length > 0 && (
          <button
            onClick={handleUpload}
            className={` transition-all duration-500 mt-6 w-full ${isUploadedFiles ? "bg-slate-200" : "bg-[#002fff]"} text-white py-2 rounded-lg hover:bg-blue-700`}
          >
            Subir archivos
          </button>
        )}
      </div>
    </div>
  );
}

