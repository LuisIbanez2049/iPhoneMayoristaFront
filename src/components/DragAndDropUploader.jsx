import React, { useState, useRef, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";


export default function DragAndDropUploader() {
    const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

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

    console.log("URLs finales en orden:", urls);

    // Aquí podrías enviar `urls` a tu API
  };

    // 🚨 Reemplazá con tus datos de Cloudinary
    const cloudName = "dlyoighih";
    const uploadPreset = "ml_defaultPrueba";

    
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Zona de drag & drop */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100"
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
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Subir archivos
        </button>
      )}
    </div>
  );
}















// export default function DragAndDropUploader() {
//   const [files, setFiles] = useState([]);
//   const [dragging, setDragging] = useState(false);
//   const [uploadedUrls, setUploadedUrls] = useState([]); // 🔹 Guardar URLs subidas

//   // Drag & drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);

//     const droppedFiles = Array.from(e.dataTransfer.files);
//     if (droppedFiles.length) {
//       setFiles((prev) => [...prev, ...droppedFiles]);
//     }
//   };

//   // Selección manual
//   const handleFileSelect = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length) {
//       setFiles((prev) => [...prev, ...selectedFiles]);
//     }
//   };

//   // Subir a Cloudinary
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (files.length === 0) {
//       console.log("No hay archivos para subir");
//       return;
//     }

//     // 🚨 Reemplazá con tus datos de Cloudinary
//     const cloudName = "dlyoighih";
//     const uploadPreset = "ml_defaultPrueba";

//     try {
//       const uploadPromises = files.map(async (file) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", uploadPreset);

//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         const data = await response.json();
//         console.log("✅ Subido:", data.secure_url);
//         return data.secure_url;
//       });

//       const urls = await Promise.all(uploadPromises);
//       setUploadedUrls((prev) => [...prev, ...urls]); // 🔹 Guardar URLs
//       setFiles([]); // limpiar lista local después de subir
//     } catch (error) {
//       console.error("Error subiendo archivos:", error);
//     }
//   };

//   return (
//     <div className="p-6 flex flex-col items-center gap-6">
//       {/* Área drag & drop + click */}
//       <label
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`w-80 h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
//           }`}
//       >
//         <input
//           type="file"
//           accept="image/*,video/*"
//           multiple
//           className="hidden"
//           onChange={handleFileSelect}
//         />
//         <span className="text-gray-500 text-center">
//           Arrastra tus imágenes o videos aquí <br /> o haz click para
//           seleccionarlos
//         </span>
//       </label>

//       {/* Previews locales antes de subir */}
//       {files.length > 0 && (
//         <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
//           {files.map((file, index) => (
//             <div key={index} className="border p-2 rounded">
//               {file.type.startsWith("image/") ? (
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="preview"
//                   className="w-full h-32 object-cover rounded"
//                 />
//               ) : (
//                 <video
//                   src={URL.createObjectURL(file)}
//                   controls
//                   className="w-full h-32 rounded"
//                 />
//               )}
//               <p className="text-xs text-gray-600 truncate">{file.name}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className={`${files.length > 0 ? "show" : "hidden"}`}>
//         <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//           onClick={() => setFiles([])}>
//           Cancelar
//         </button>
//       </div>

//       {/* Botón submit */}
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Subir archivos
//       </button>

//       {/* URLs subidas con previews reales desde Cloudinary */}
//       {uploadedUrls.length > 0 && (
//         <div className="w-full max-w-lg mt-6">
//           <h3 className="text-lg font-semibold mb-3">Archivos subidos:</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {uploadedUrls.map((url, index) => (
//               <div key={index} className="border p-2 rounded">
//                 {url.match(/\.(mp4|mov|avi|mkv)$/) ? (
//                   <video src={url} controls className="w-full h-32 rounded" />
//                 ) : (
//                   <img
//                     src={url}
//                     alt="uploaded"
//                     className="w-full h-32 object-cover rounded"
//                   />
//                 )}
//                 <p className="text-xs text-gray-600 truncate">{url}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









































// export default function DragAndDropUploader() {
//   const [dragging, setDragging] = useState(false);
//   const [file, setFile] = useState(null);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);

//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       setFile(droppedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       console.log("Por favor selecciona o arrastra un archivo");
//       return;
//     }

//     // 🚨 Reemplazá con tus datos de Cloudinary
//     const cloudName = "dlyoighih";
//     const uploadPreset = "ml_defaultPrueba";

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", uploadPreset);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       console.log("✅ URL de la imagen subida:", data.secure_url);

//       // acá podés luego enviar data.secure_url a tu API
//     } catch (error) {
//       console.error("Error subiendo la imagen:", error);
//     }
//   };

//   return (
//     <div className="p-6 flex flex-col items-center gap-4">
//       {/* Área de drag & drop */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`w-80 h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
//           dragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
//         }`}
//       >
//         {file ? (
//           <p className="text-gray-700">{file.name}</p>
//         ) : (
//           <p className="text-gray-500">Arrastra tu imagen aquí</p>
//         )}
//       </div>

//       {/* Botón submit */}
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Subir imagen
//       </button>
//     </div>
//   );
// }
