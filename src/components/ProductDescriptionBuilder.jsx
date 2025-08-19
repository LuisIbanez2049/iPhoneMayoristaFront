import React, { useState } from "react";

export default function ProductDescriptionBuilder() {
  const [blocks, setBlocks] = useState([]);
  const makeId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // Helpers YouTube
  function isYouTubeUrl(url = "") {
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(
      url
    );
  }
  function youtubeEmbedUrl(url = "") {
    const m = url.match(/(?:v=|\/)([A-Za-z0-9_-]{6,})/);
    if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
    return null;
  }

  // Crear bloques
  function addTextBlock() {
    setBlocks((b) => [
      ...b,
      { id: makeId(), type: "text", align: "left", content: "" },
    ]);
  }
  function addImageBlock() {
    setBlocks((b) => [
      ...b,
      { id: makeId(), type: "image", src: "", editing: true },
    ]);
  }
  function addVideoBlock() {
    setBlocks((b) => [
      ...b,
      { id: makeId(), type: "video", src: "", editing: true },
    ]);
  }

  // Actualizar / eliminar
  const updateBlock = (id, patch) =>
    setBlocks((prev) => prev.map((bl) => (bl.id === id ? { ...bl, ...patch } : bl)));
  const removeBlock = (id) => setBlocks((prev) => prev.filter((b) => b.id !== id));
  const setAlign = (id, align) => updateBlock(id, { align });

  // Submit → generar HTML limpio
  function handleSubmit(e) {
    e.preventDefault();
    const htmlString = blocks
      .map((b) => {
        if (b.type === "text") {
          return `<div class="${
            b.align === "left"
              ? "text-left"
              : b.align === "center"
              ? "text-center"
              : "text-right"
          }"><p>${escapeHtml(b.content)}</p></div>`;
        }
        if (b.type === "image" && b.src) {
          return `<div class="w-full flex justify-center items-center"><img src="${b.src}" class="w-[700px] rounded"/></div>`;
        }
        if (b.type === "video" && b.src) {
          if (isYouTubeUrl(b.src)) {
            return `<div class="w-full flex justify-center items-center"><iframe src="${youtubeEmbedUrl(
              b.src
            )}" class="w-[700px] h-[400px] rounded" frameborder="0" allowfullscreen></iframe></div>`;
          }
          return `<div class="w-full flex justify-center items-center"><video src="${b.src}" controls class="w-[700px] rounded"></video></div>`;
        }
        return "";
      })
      .join("\n");

    console.log("HTML limpio generado:\n", htmlString);
    alert("HTML generado (mira la consola)");
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        Constructor de descripción (Shopify-like)
      </h2>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={addTextBlock}
          className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
        >
          ➕ Texto
        </button>
        <button
          type="button"
          onClick={addImageBlock}
          className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
        >
          ➕ Imagen (URL)
        </button>
        <button
          type="button"
          onClick={addVideoBlock}
          className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
        >
          ➕ Video (URL)
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="min-h-[120px] border rounded p-4 bg-gray-50 space-y-4">
          {blocks.length === 0 && (
            <div className="text-sm text-gray-500">
              No hay bloques. Usa los botones para agregar contenido.
            </div>
          )}

          {blocks.map((b) => (
            <div key={b.id} className="relative border bg-white p-4 rounded">
              {/* barra de controles */}
              <div className="absolute right-2 top-2 flex gap-2">
                {b.type === "text" && (
                  <div className="flex items-center gap-1 border rounded bg-white px-1 py-0.5">
                    <button
                      type="button"
                      onClick={() => setAlign(b.id, "left")}
                      className={`px-2 py-1 text-xs rounded ${
                        b.align === "left" ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      L
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlign(b.id, "center")}
                      className={`px-2 py-1 text-xs rounded ${
                        b.align === "center" ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      C
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlign(b.id, "right")}
                      className={`px-2 py-1 text-xs rounded ${
                        b.align === "right" ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      R
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeBlock(b.id)}
                  className="px-2 py-1 text-xs border rounded bg-white"
                >
                  ✕
                </button>
              </div>

              {/* render bloque */}
              {b.type === "text" && (
                <textarea
                  value={b.content}
                  onChange={(e) => updateBlock(b.id, { content: e.target.value })}
                  placeholder="Escribe aquí el texto..."
                  className="w-full min-h-[80px] p-2 border rounded resize-y"
                />
              )}
              {b.type === "image" && (
                <>
                  {b.editing ? (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Pega la URL de la imagen..."
                        value={b.src}
                        onChange={(e) => updateBlock(b.id, { src: e.target.value })}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => updateBlock(b.id, { editing: false })}
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                      >
                        Añadir
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center">
                      <img src={b.src} alt="" className="w-[700px] rounded" />
                    </div>
                  )}
                </>
              )}
              {b.type === "video" && (
                <>
                  {b.editing ? (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Pega la URL del video..."
                        value={b.src}
                        onChange={(e) => updateBlock(b.id, { src: e.target.value })}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => updateBlock(b.id, { editing: false })}
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                      >
                        Añadir
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center">
                      {isYouTubeUrl(b.src) ? (
                        <iframe
                          src={youtubeEmbedUrl(b.src)}
                          className="w-[700px] h-[400px] rounded"
                          frameBorder="0"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={b.src}
                          controls
                          className="w-[700px] rounded"
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() =>
              window.confirm("¿Borrar todos los bloques?") && setBlocks([])
            }
            className="px-3 py-2 border rounded"
          >
            Borrar todo
          </button>
        </div>
      </form>
    </div>
  );
}

// Helpers
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}









// import React, { useRef, useState } from "react";

// /**
//  * ProductDescriptionBuilder.jsx
//  *
//  * Uso:
//  *   <ProductDescriptionBuilder />
//  *
//  * El botón Submit hará: console.log(htmlString) donde htmlString = innerHTML del contenedor general.
//  */

// export default function ProductDescriptionBuilder() {
//   const containerRef = useRef(null);

//   const [blocks, setBlocks] = useState([]);
//   const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

//   // Helpers YouTube
//   function isYouTubeUrl(url = "") {
//     return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url);
//   }
//   function youtubeEmbedUrl(url = "") {
//     const m = url.match(/(?:v=|\/)([A-Za-z0-9_-]{6,})/);
//     if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
//     return null;
//   }

//   // Crear nuevos bloques
//   function addTextBlock() {
//     const id = makeId();
//     setBlocks((b) => [
//       ...b,
//       {
//         id,
//         type: "text",
//         align: "left",
//         content: "", // texto
//       },
//     ]);
//   }

//   function addImageBlock() {
//     const id = makeId();
//     setBlocks((b) => [
//       ...b,
//       {
//         id,
//         type: "image",
//         align: "left",
//         src: "", // url
//         editing: true, // mostrar input inicialmente
//       },
//     ]);
//   }

//   function addVideoBlock() {
//     const id = makeId();
//     setBlocks((b) => [
//       ...b,
//       {
//         id,
//         type: "video",
//         align: "left",
//         src: "",
//         editing: true,
//       },
//     ]);
//   }

//   // Actualizar bloque por id
//   function updateBlock(id, patch) {
//     setBlocks((prev) => prev.map((bl) => (bl.id === id ? { ...bl, ...patch } : bl)));
//   }

//   // Eliminar bloque
//   function removeBlock(id) {
//     setBlocks((prev) => prev.filter((b) => b.id !== id));
//   }

//   // Alinear
//   function setAlign(id, align) {
//     updateBlock(id, { align });
//   }

//   // Submit: tomar innerHTML del contenedor general y mostrarlo en consola
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!containerRef.current) {
//       console.warn("No hay contenedor.");
//       return;
//     }
//     const htmlString = containerRef.current.innerHTML;
//     console.log("HTML del contenedor general (string):\n", htmlString);
//     alert("HTML copiado a consola (abre DevTools / Console para verlo).");
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Constructor de descripción (estilo Shopify)</h2>

//       <div className="flex gap-2 mb-4">
//         <button
//           type="button"
//           onClick={addTextBlock}
//           className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
//         >
//           ➕ Agregar texto
//         </button>
//         <button
//           type="button"
//           onClick={addImageBlock}
//           className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
//         >
//           ➕ Agregar imagen (URL)
//         </button>
//         <button
//           type="button"
//           onClick={addVideoBlock}
//           className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
//         >
//           ➕ Agregar video (URL)
//         </button>
//       </div>

//       {/* Contenedor general: lo que se va a copiar en submit */}
//       <form onSubmit={handleSubmit}>
//         <div
//           ref={containerRef}
//           // wrapper visual (no afecta lo que se genera en HTML aparte de las clases)
//           className="min-h-[120px] border rounded p-4 bg-gray-50 space-y-4"
//         >
//           {blocks.length === 0 ? (
//             <div className="text-sm text-gray-500">No hay bloques. Usa los botones para agregar contenido.</div>
//           ) : null}

//           {/* Render blocks in order */}
//           {blocks.map((b) => (
//             <div key={b.id} className="relative">
//               {/* Control bar (alineado + eliminar) */}
//               <div className="absolute right-0 -top-6 flex items-center gap-2">
//                 <div className="flex items-center gap-1 border rounded bg-white px-1 py-0.5">
//                   <button
//                     type="button"
//                     onClick={() => setAlign(b.id, "left")}
//                     className={`px-2 py-1 text-xs rounded ${b.align === "left" ? "bg-gray-200" : "bg-white"}`}
//                     title="Alinear izquierda"
//                   >
//                     L
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setAlign(b.id, "center")}
//                     className={`px-2 py-1 text-xs rounded ${b.align === "center" ? "bg-gray-200" : "bg-white"}`}
//                     title="Alinear centro"
//                   >
//                     C
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setAlign(b.id, "right")}
//                     className={`px-2 py-1 text-xs rounded ${b.align === "right" ? "bg-gray-200" : "bg-white"}`}
//                     title="Alinear derecha"
//                   >
//                     R
//                   </button>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => removeBlock(b.id)}
//                   className="px-2 py-1 text-xs border rounded bg-white"
//                   title="Eliminar bloque"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Bloque real con alignment aplicado */}
//               <div className={`${b.align === "left" ? "text-left" : b.align === "center" ? "text-center" : "text-right"} prose bg-white p-4 rounded border`}>
//                 {b.type === "text" && (
//                   <div>
//                     <textarea
//                       value={b.content}
//                       onChange={(e) => updateBlock(b.id, { content: e.target.value })}
//                       placeholder="Escribe aquí el texto..."
//                       className="w-full min-h-[80px] p-2 border rounded resize-y"
//                     />
//                     {/* Mostrar preview del texto (opcional) */}
//                     <div className="mt-3">
//                       <div className="prose" dangerouslySetInnerHTML={{ __html: escapeToParagraphs(b.content) }} />
//                     </div>
//                   </div>
//                 )}

//                 {b.type === "image" && (
//                   <div>
//                     {/* Si está en modo editing o no hay src, mostrar input */}
//                     {b.editing || !b.src ? (
//                       <div className="flex gap-2">
//                         <input
//                           type="url"
//                           placeholder="Pega la URL de la imagen..."
//                           value={b.src || ""}
//                           onChange={(e) => updateBlock(b.id, { src: e.target.value })}
//                           className="flex-1 p-2 border rounded"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => updateBlock(b.id, { editing: false })}
//                           className="px-3 py-2 bg-blue-600 text-white rounded"
//                         >
//                           Añadir
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="relative">
//                         <div className="w-full flex justify-center items-center">
//                             <img src={b.src} alt="" className="w-[700px] rounded" />
//                         </div>
//                         <div className="mt-2">
//                           <button
//                             type="button"
//                             onClick={() => updateBlock(b.id, { editing: true })}
//                             className="px-2 py-1 border rounded text-sm"
//                           >
//                             Editar URL
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {b.type === "video" && (
//                   <div>
//                     {b.editing || !b.src ? (
//                       <div className="flex gap-2">
//                         <input
//                           type="url"
//                           placeholder="Pega la URL del video (YouTube o archivo) ..."
//                           value={b.src || ""}
//                           onChange={(e) => updateBlock(b.id, { src: e.target.value })}
//                           className="flex-1 p-2 border rounded"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => updateBlock(b.id, { editing: false })}
//                           className="px-3 py-2 bg-blue-600 text-white rounded"
//                         >
//                           Añadir
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="relative">
//                         {isYouTubeUrl(b.src) ? (
//                           <div className="relative pb-[56.25%]">
//                             <iframe
//                               src={youtubeEmbedUrl(b.src)}
//                               title={`video-${b.id}`}
//                               className="absolute inset-0 w-full h-full rounded"
//                               frameBorder="0"
//                               allowFullScreen
//                             />
//                           </div>
//                         ) : (
//                           <video src={b.src} controls className="w-full rounded" />
//                         )}
//                         <div className="mt-2">
//                           <button
//                             type="button"
//                             onClick={() => updateBlock(b.id, { editing: true })}
//                             className="px-2 py-1 border rounded text-sm"
//                           >
//                             Editar URL
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 flex gap-2">
//           <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
//             Submit (mostrar HTML en consola)
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               // opcional: vaciar todo
//               if (confirm("¿Borrar todos los bloques?")) setBlocks([]);
//             }}
//             className="px-3 py-2 border rounded"
//           >
//             Borrar todo
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// /** Helpers fuera del componente **/

// // Convierte texto plano en párrafos <p> respetando líneas en blanco.
// // Retorna string HTML seguro (escapa <,>,&, etc).
// function escapeHtml(str) {
//   if (!str) return "";
//   return String(str)
//     .replace(/&/g, "&amp;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#39;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// function escapeToParagraphs(text) {
//   if (!text) return "";
//   const lines = text.split(/\r?\n/).map((l) => escapeHtml(l));
//   const paragraphs = [];
//   let buffer = [];
//   for (const ln of lines) {
//     if (ln.trim() === "") {
//       if (buffer.length) {
//         paragraphs.push(`<p>${buffer.join("<br/>")}</p>`);
//         buffer = [];
//       }
//     } else {
//       buffer.push(ln);
//     }
//   }
//   if (buffer.length) paragraphs.push(`<p>${buffer.join("<br/>")}</p>`);
//   return paragraphs.join("");
// }
