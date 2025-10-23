import React, { useState, useRef, useCallback, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import MessageAlert from "./MessageAlert";


export default function DragAndDropUploaderEDIT({ onActulizarArchivos, id }) {

  //const baseUrl = "http://localhost:8080"
  const baseUrl = import.meta.env.VITE_APP_DATABASE_URL


  const [files, setFiles] = useState([]);
  const [filesFromBack, setFilesFromBack] = useState([])
  const [viewAddFilesFrom, setViewAddFilesFrom] = useState(false)
  const fileInputRef = useRef(null);


  const [isLoading, setIsLoading] = useState(false)
  const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
  const [textMessageAlert, setTextMessageAlert] = useState("")



  const handleOnClickAcceptAlertMessage = () => {
    setViewAlertMesaggeFromAPI(false)
    setTextMessageAlert("")
  }

  // 👉 Detectar si es video o imagen
  const isVideo = (url) =>
    url.endsWith(".mp4") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be");



  // 👉 Reordenar
  const handleDragEndFromBack = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(filesFromBack);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setFilesFromBack(reordered);
  };

  // 👉 Eliminar
  const handleRemoveFileFromBack = (index) => {
    setFilesFromBack((prev) => prev.filter((_, i) => i !== index));
  };




  useEffect(() => {
    axios.get(`${baseUrl}/api/product/${id}`)
      .then((response) => {
        console.log(response.data)

        setFilesFromBack(response.data.fileLinks)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])





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

      console.log(res.data)
      setIsLoading(false)
      urls.push(res.data.secure_url);
    }


    // Aquí podrías enviar `urls` a tu API
    console.log("URLs finales en orden:", urls);

    // Actualizo el estado (para la UI)
    setFilesFromBack((prev) => [...prev, ...urls])

    // 🚀 Y llamo a la API con el valor correcto
    actualizarApi([...filesFromBack, ...urls])
  };

  // 🚨 Reemplazá con tus datos de Cloudinary
  const cloudName = "dlyoighih";
  const uploadPreset = "ml_defaultPrueba";


  const actualizarApi = (links) => {
    setIsLoading(true)

    const bodyForAPI = {
      productId: id,
      name: "",
      price: -1,
      stock: -1,
      categoryId: -1,
      fileLinks: links,
      description: "",
    }

    console.log(bodyForAPI)
    const token = localStorage.getItem("token")
    let tokenSinComillas = token.replace(/"/g, '');
    console.log(tokenSinComillas)
    // axios.get("http://localhost:8080/api/materias/availablesubjects", {
    axios.post(`${baseUrl}/api/product/edit`, bodyForAPI, {
      headers: {
        Authorization: `Bearer ${tokenSinComillas}`
      }
    })
      .then((response) => {
        console.log(response.data)
        setIsLoading(false)
        setFiles([])
        setViewAddFilesFrom(false)
        if (response.data.includes("Producto actualizado.")) {
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


  return (
    <div className="lg:w-[950px] w-full mx-auto flex flex-col items-center">

      <LoadingSpinner isLoading={isLoading} />
      <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} />


      <div className="w-[90%]">

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-t-2xl mb-[15px]">
          <h2 className="text-2xl font-bold text-white text-center">Imagenes/Videos</h2>
          <p className="text-gray-300 text-center mt-1">Agrega imagenes o videos en el recuadro de abajo</p>
        </div>



        <DragDropContext onDragEnd={handleDragEndFromBack}>
          <Droppable droppableId="links" direction="horizontal">
            {(provided) => (
              <div
                className="flex flex-wrap gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filesFromBack.map((url, index) => (
                  <Draggable key={url} draggableId={url} index={index}>
                    {(provided) => (
                      <div
                        className="relative w-40 h-40 border rounded-lg overflow-hidden"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {isVideo(url) ? (
                          <video
                            src={url}
                            className="w-full h-full object-cover pointer-events-none"
                            controls
                          />
                        ) : (
                          <img
                            src={url}
                            alt="media"
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Botón eliminar */}
                        <button
                          onClick={() => handleRemoveFileFromBack(index)}
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

        {/* --------------------- VER EL ARRAY ACTUALIZADO CUANDO SE CAMBIA DE LUGAR O SE ELIMINA UNA IMAGEN --------------------- */}
        {/* <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(filesFromBack, null, 2)}
        </pre> */}
        {/* --------------------- VER EL ARRAY ACTUALIZADO CUANDO SE CAMBIA DE LUGAR O SE ELIMINA UNA IMAGEN --------------------- */}
        

        <div className={` flex flex-col items-center py-4`}>
          <button
            onClick={() => setViewAddFilesFrom(true)}
            className={`${viewAddFilesFrom ? "hidden" : "show"} bg-[#002fff] hover:bg-blue-700 text-white p-2 rounded-lg text-[14px]`}>AGREGAR ARCHIVOS</button>

          <div className={`${viewAddFilesFrom ? "show" : "hidden"} w-full flex flex-row justify-end`}>
            <button onClick={() => setViewAddFilesFrom(false)}><i className="fa-solid fa-circle-xmark text-[40px] hover:text-red-500"></i></button>
          </div>
        </div>




        {/* ------------------------------Formulario agregar archivos (imagen/video)------------------------------ */}
        <div className={`${viewAddFilesFrom ? "show" : "hidden"}`}>
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
              onClick={() => {
                setFiles([])
                setViewAddFilesFrom(false)
              }}>
              Cancelar
            </button>
          </div>

          {/* Botón subir */}
          {files.length > 0 && (
            <button
              onClick={handleUpload}
              className="mt-6 w-full bg-[#002fff] text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Subir archivos
            </button>
          )}
        </div>
        {/* ------------------------------Formulario agregar archivos (imagen/video)------------------------------ */}


        <button
          onClick={() => actualizarApi(filesFromBack)}
          className={`w-full bg-[#002fff] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-400 mt-4`}
        >
          Guardar Cambios
        </button>


      </div>
    </div>
  );
}

