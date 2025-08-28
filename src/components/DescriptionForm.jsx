import React, { useRef } from 'react';

const DescriptionForm = () => {
  const editorRef = useRef(null);

  // Ejecutar comandos de formato
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  // Aumentar o disminuir tamaño de imagen/video seleccionada
const adjustMediaSize = (increase) => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  let node = range.commonAncestorContainer;

  // Si es nodo de texto, subir al padre
  if (node.nodeType === 3) {
    node = node.parentNode;
  }

  // Caso 1: si es IMG o IFRAME directamente
  if (node.nodeName === "IMG") {
    const currentWidth = parseInt(node.style.width || getComputedStyle(node).width);
    const newWidth = increase ? currentWidth + 50 : Math.max(100, currentWidth - 50);
    node.style.width = `${newWidth}px`;
    node.style.display = "block";
    node.style.margin = "0 auto";
    return;
  }

  if (node.nodeName === "IFRAME") {
    resizeIframe(node, increase);
    return;
  }

  // Caso 2: si es P (contenedor), buscar IMG o IFRAME dentro
  if (node.nodeName === "P") {
    const iframe = node.querySelector("iframe");
    const img = node.querySelector("img");

    if (iframe) {
      resizeIframe(iframe, increase);
      return;
    }
    if (img) {
      const currentWidth = parseInt(img.style.width || getComputedStyle(img).width);
      const newWidth = increase ? currentWidth + 50 : Math.max(100, currentWidth - 50);
      img.style.width = `${newWidth}px`;
      img.style.display = "block";
      img.style.margin = "0 auto";
      return;
    }
  }
};

// función auxiliar para redimensionar iframes manteniendo relación 16:9
const resizeIframe = (iframe, increase) => {
  let className = iframe.className;

  const widthRegex = /w-\[(\d+)vw\]/;
  const heightRegex = /h-\[(\d+)px\]/;

  let newClass = className;

  if (widthRegex.test(className)) {
    const currentW = parseInt(className.match(widthRegex)[1]); // ancho en vw
    const newW = increase ? currentW + 10 : Math.max(20, currentW - 10);

    // Calcular nueva altura proporcional (16:9)
    const newH = Math.round((newW * 9) / 16 * (window.innerWidth / 100)); 
    // 👆 (newW vw → px) → (ancho px * 9 / 16)

    // Actualizar ancho y alto en la clase
    newClass = newClass.replace(widthRegex, `w-[${newW}vw]`);
    if (heightRegex.test(newClass)) {
      newClass = newClass.replace(heightRegex, `h-[${newH}px]`);
    } else {
      newClass += ` h-[${newH}px]`;
    }
  }

  iframe.className = newClass;
};



  // Aumentar o disminuir tamaño de imagen/video seleccionada
  // const adjustMediaSize = (increase) => {
  //   const selection = window.getSelection();
  //   if (!selection.rangeCount) return;

  //   const range = selection.getRangeAt(0);
  //   let node = range.commonAncestorContainer;

  //   console.log(node.nodeName + "--------")

  //   // Si el cursor está dentro de un contenido, subimos hasta encontrar media
  //   while (node && node !== editorRef.current) {
  //     if (node.nodeName === 'p' || node.nodeName === 'IFRAME') {
  //       const currentWidth = parseInt(node.style.width || getComputedStyle(node).width);
  //       const newWidth = increase ? currentWidth + 50 : Math.max(100, currentWidth - 50);
  //       node.style.width = `${newWidth}px`;
  //       node.style.display = 'block';
  //       node.style.margin = '0 auto'; // Mantener centrado
  //       return;
  //     }
  //     node = node.parentNode;
  //   }
  // };

  // Insertar imagen o video
  const insertMedia = (type) => {
    if (type === 'image') {
      const url = prompt('Ingresa la URL de la imagen:');
      if (url) {
        execCommand('insertHTML', `<p style="text-align: center;"><img src="${url}" alt="imagen" style="width: 700px; height: auto; margin: 0 auto; display: block;" /></p>`);
      }
    } else if (type === 'video') {
      const url = prompt('Ingresa la URL del video (YouTube, por ejemplo):');
      if (url) {
        
          execCommand('insertHTML', `
            <p style="text-align: center;">
              <iframe
                class="sm:w-[30vw]  sm:h-[294px] w-[290px] h-[160px] rounded-lg"
                src="${url}" 
                frameborder="0" 
                allowfullscreen
                
              </iframe>
            </p>
          `);
        //style="margin: 0 auto; display: block; width: 720px; height: 360px;">
        //class="w-[30vw] h-[300px] border border-red-600"
      }
    }
  };

  // Copiar HTML generado
  const copyHtml = () => {
    const html = editorRef.current.innerHTML;
    navigator.clipboard.writeText(html).then(() => {
      alert('HTML copiado al portapapeles');
    });
  };

  // Limpiar formato
  const clearFormatting = () => {
    execCommand('removeFormat');
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden', margin: '20px 0' }}>
      {/* Barra de herramientas */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '8px 10px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          alignItems: 'center',
        }}
      >
        {/* Formato de texto */}
        <button type="button" onClick={() => execCommand('bold')}><strong>B</strong></button>
        <button type="button" onClick={() => execCommand('italic')}><em>I</em></button>
        <button type="button" onClick={() => execCommand('underline')}><u>U</u></button>

        {/* Tamaño de letra */}
        <select
          onChange={(e) => {
            execCommand('fontSize', e.target.value);
            e.target.value = '';
          }}
        >
          <option value="">Tamaño</option>
          <option value="1">Pequeño</option>
          <option value="3">Mediano</option>
          <option value="5">Grande</option>
        </select>

        {/* Alineación */}
        <button type="button" onClick={() => execCommand('justifyLeft')}>←</button>
        <button type="button" onClick={() => execCommand('justifyCenter')}>○</button>
        <button type="button" onClick={() => execCommand('justifyRight')}>→</button>

        {/* Insertar elementos */}
        <button type="button" onClick={() => insertMedia('image')}>📷 Imagen</button>
        <button type="button" onClick={() => insertMedia('video')}>▶️ Video</button>

        {/* Ajustar tamaño media */}
        <button type="button" onClick={() => adjustMediaSize(true)}>+</button>
        <button type="button" onClick={() => adjustMediaSize(false)}>-</button>

        {/* Limpiar */}
        <button type="button" onClick={clearFormatting}>🧹 Limpiar</button>

        {/* Copiar HTML */}
        <button
          type="button"
          onClick={copyHtml}
          style={{ marginLeft: 'auto', padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
        >
          📋 Copiar HTML
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        spellCheck="false"
        style={{
          minHeight: '400px',
          padding: '15px',
          lineHeight: '1.6',
          outline: 'none',
          backgroundColor: 'white',
        }}
        onInput={(e) => {
          // Aseguramos que las imágenes y videos sigan centrados si se modifican
          const imgs = e.target.querySelectorAll('img');
          imgs.forEach(img => {
            if (img.style.display !== 'block') img.style.display = 'block';
            if (img.style.margin !== '0 auto') img.style.margin = '0 auto';
          });
          const iframes = e.target.querySelectorAll('iframe');
          iframes.forEach(iframe => {
            iframe.style.display = 'block';
            iframe.style.margin = '0 auto';
          });
        }}
      >
        <p>Escribe aquí tu contenido...</p>
      </div>

      {/* Vista previa del HTML (opcional) */}
      <div
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderTop: '1px solid #eee',
          fontSize: '12px',
          color: '#555',
        }}
      >
        <strong>HTML generado:</strong>
        <pre style={{ margin: '5px 0', maxHeight: '100px', overflow: 'auto' }}>
          {editorRef.current?.innerHTML || '<p>Escribe aquí...</p>'}
        </pre>
      </div>
    </div>
  );
};

export default DescriptionForm;








// import React, { useRef, useState, useEffect } from "react";

// // RichTextEditor.jsx
// // Single-file React component (default export) that provides:
// // - bold (applies Tailwind class "font-bold")
// // - font size options (small/medium/large -> text-sm, text-base, text-lg)
// // - text alignment (left/center/right -> text-left, text-center, text-right)
// // - insert image/video by URL
// // - controls to change media alignment (left/center/right) and size (small/medium/large)
// // - copy HTML button which copies editor.innerHTML (with Tailwind classes)

// export default function DescriptionForm() {
//   const editorRef = useRef(null);
//   const [mediaUrl, setMediaUrl] = useState("");
//   const [mediaType, setMediaType] = useState("image"); // image | video
//   const [selectedMediaId, setSelectedMediaId] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const handler = (e) => {
//       // click on media inside editor to select it
//       const el = e.target.closest("[data-media-id]");
//       if (el) setSelectedMediaId(el.getAttribute("data-media-id"));
//     };
//     const editor = editorRef.current;
//     editor.addEventListener("click", handler);
//     return () => editor.removeEventListener("click", handler);
//   }, []);

//   // Helpers to work with selection
//   function wrapSelectionWith(tagName, className) {
//     const sel = document.getSelection();
//     if (!sel || sel.rangeCount === 0) return;
//     const range = sel.getRangeAt(0);
//     if (range.collapsed) return; // nothing to wrap

//     // Extract selected contents and wrap
//     const fragment = range.extractContents();
//     const wrapper = document.createElement(tagName);
//     if (className) wrapper.className = className;
//     wrapper.appendChild(fragment);
//     range.insertNode(wrapper);

//     // move cursor after inserted node
//     sel.removeAllRanges();
//     const newRange = document.createRange();
//     newRange.setStartAfter(wrapper);
//     sel.addRange(newRange);
//   }

//   function applyBold() {
//     // wrap selection in span with Tailwind class font-bold
//     wrapSelectionWith("span", "font-bold");
//   }

//   function applyFontSize(size) {
//     // size -> "text-sm" | "text-base" | "text-lg"
//     const sizeClass = size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";
//     wrapSelectionWith("span", sizeClass);
//   }

//   function applyAlignment(align) {
//     // For alignment, wrap the selection in a block-level div with text-left/center/right
//     const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
//     wrapSelectionWith("div", alignClass + " my-2");
//   }

//   // Insert media (image or video) as a wrapper DIV with data-media-id so we can target it
//   function insertMedia() {
//     if (!mediaUrl) return;
//     const editor = editorRef.current;
//     const id = "media_" + Date.now();

//     const wrapper = document.createElement("div");
//     wrapper.setAttribute("data-media-id", id);
//     wrapper.className = "my-2"; // default neutral wrapper

//     if (mediaType === "image") {
//       const img = document.createElement("img");
//       img.src = mediaUrl;
//       img.alt = "inserted-img";
//       img.className = "max-w-full h-auto block"; // responsive by default
//       wrapper.appendChild(img);
//     } else {
//       // treat iframe for videos (youtube/vimeo/etc.)
//       const iframe = document.createElement("iframe");
//       iframe.src = mediaUrl;
//       iframe.setAttribute("frameborder", "0");
//       iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
//       iframe.setAttribute("allowfullscreen", "true");
//       iframe.className = "w-full h-48 block";
//       wrapper.appendChild(iframe);
//     }

//     // Insert at caret if possible, otherwise at the end
//     const sel = document.getSelection();
//     if (sel && sel.rangeCount > 0) {
//       const range = sel.getRangeAt(0);
//       range.collapse(false);
//       range.insertNode(wrapper);
//     } else {
//       editor.appendChild(wrapper);
//     }

//     // clear input and set selected media
//     setMediaUrl("");
//     setSelectedMediaId(id);

//     // ensure editor keeps focus
//     editor.focus();
//   }

//   function updateSelectedMedia(mods) {
//     if (!selectedMediaId) return;
//     const editor = editorRef.current;
//     const el = editor.querySelector(`[data-media-id='${selectedMediaId}']`);
//     if (!el) return;

//     // mods: { alignment: 'left'|'center'|'right', size: 'small'|'medium'|'large' }
//     // Clear previous alignment/float/margin classes we use
//     el.classList.remove("float-left", "float-right", "mx-auto", "block", "my-2");
//     // Also adjust child element's sizing classes
//     const child = el.firstChild;
//     if (child) {
//       child.classList.remove("w-1\/4", "w-1\/2", "w-full", "h-24", "h-32", "h-48", "max-w-full", "h-auto");
//     }

//     // alignment
//     if (mods.alignment === "left") {
//       // float left and add small right margin
//       el.classList.add("float-left", "mr-4", "my-2");
//     } else if (mods.alignment === "right") {
//       el.classList.add("float-right", "ml-4", "my-2");
//     } else {
//       // center
//       el.classList.add("mx-auto", "block", "my-2");
//     }

//     // size
//     if (child) {
//       if (mods.size === "small") {
//         // small: fixed small width
//         child.classList.add("w-1/4", "h-24");
//       } else if (mods.size === "medium") {
//         child.classList.add("w-1/2", "h-32");
//       } else {
//         child.classList.add("w-full", "h-48");
//       }

//       // ensure images keep aspect ratio
//       if (child.tagName && child.tagName.toLowerCase() === "img") {
//         child.classList.add("h-auto");
//       }
//     }
//   }

//   async function copyHtml() {
//     const html = editorRef.current.innerHTML;
//     try {
//       await navigator.clipboard.writeText(html);
//       setMessage("HTML copiado al portapapeles ✔");
//       setTimeout(() => setMessage(""), 2000);
//     } catch (err) {
//       setMessage("Error al copiar. Abre este sitio con HTTPS o permite el portapapeles.");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   }

//   function clearFormatting() {
//     // Very simple: remove all inline spans/div wrappers we created by flattening HTML but keep text
//     const editor = editorRef.current;
//     editor.querySelectorAll("span, div").forEach((node) => {
//       // keep media wrappers
//       if (node.hasAttribute("data-media-id")) return;
//       // replace node with its children
//       const parent = node.parentNode;
//       while (node.firstChild) parent.insertBefore(node.firstChild, node);
//       parent.removeChild(node);
//     });
//   }

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-xl font-semibold mb-3">Editor de texto (Tailwind classes)</h2>

//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2 items-center mb-3">
//         <button
//           className="px-3 py-1 rounded shadow-sm border hover:shadow active:scale-95"
//           onClick={applyBold}
//           title="Negrita (aplica class 'font-bold')"
//         >
//           B
//         </button>

//         <div className="flex items-center gap-1">
//           <label className="text-sm">Tamaño:</label>
//           <button onClick={() => applyFontSize('small')} className="px-2 py-1 rounded border">Pequeño</button>
//           <button onClick={() => applyFontSize('medium')} className="px-2 py-1 rounded border">Mediano</button>
//           <button onClick={() => applyFontSize('large')} className="px-2 py-1 rounded border">Grande</button>
//         </div>

//         <div className="flex items-center gap-1">
//           <label className="text-sm">Alinear:</label>
//           <button onClick={() => applyAlignment('left')} className="px-2 py-1 rounded border">Izq</button>
//           <button onClick={() => applyAlignment('center')} className="px-2 py-1 rounded border">Centro</button>
//           <button onClick={() => applyAlignment('right')} className="px-2 py-1 rounded border">Der</button>
//         </div>

//         <div className="flex items-center gap-2 ml-auto">
//           <input
//             className="px-2 py-1 rounded border"
//             placeholder="URL de imagen o video"
//             value={mediaUrl}
//             onChange={(e) => setMediaUrl(e.target.value)}
//           />
//           <select className="px-2 py-1 rounded border" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
//             <option value="image">Imagen</option>
//             <option value="video">Video (iframe)</option>
//           </select>
//           <button className="px-3 py-1 rounded border" onClick={insertMedia}>Insertar</button>
//         </div>

//         <button onClick={copyHtml} className="px-3 py-1 rounded border">Copiar HTML</button>
//         <button onClick={clearFormatting} className="px-3 py-1 rounded border">Limpiar formatos</button>
//       </div>

//       {/* Media controls (appear when a media item is selected) */}
//       {selectedMediaId && (
//         <div className="mb-3 p-2 border rounded bg-gray-50">
//           <div className="flex items-center gap-2">
//             <strong>Control de media:</strong>
//             <div className="flex items-center gap-1">
//               <label className="text-sm">Alineación:</label>
//               <button onClick={() => updateSelectedMedia({ alignment: 'left' })} className="px-2 py-1 rounded border">Izq</button>
//               <button onClick={() => updateSelectedMedia({ alignment: 'center' })} className="px-2 py-1 rounded border">Centro</button>
//               <button onClick={() => updateSelectedMedia({ alignment: 'right' })} className="px-2 py-1 rounded border">Der</button>
//             </div>

//             <div className="flex items-center gap-1">
//               <label className="text-sm">Tamaño:</label>
//               <button onClick={() => updateSelectedMedia({ size: 'small' })} className="px-2 py-1 rounded border">Peq</button>
//               <button onClick={() => updateSelectedMedia({ size: 'medium' })} className="px-2 py-1 rounded border">Med</button>
//               <button onClick={() => updateSelectedMedia({ size: 'large' })} className="px-2 py-1 rounded border">Grande</button>
//             </div>

//             <button onClick={() => {
//               // remove media
//               const editor = editorRef.current;
//               const el = editor.querySelector(`[data-media-id='${selectedMediaId}']`);
//               if (el) el.remove();
//               setSelectedMediaId(null);
//             }} className="ml-auto px-2 py-1 rounded border text-red-600">Eliminar</button>
//           </div>
//         </div>
//       )}

//       {/* Editable area */}
//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         className="min-h-[200px] border p-4 rounded prose prose-sm max-w-none"
//         //style={{ whiteSpace: 'pre-wrap' }}
//       >
//         <p>Empieza a escribir aquí... selecciona texto y usa los botones para dar formato.</p>
//       </div>

//       {/* small status message */}
//       {message && <div className="mt-2 text-sm text-green-600">{message}</div>}

//       <div className="mt-4 text-xs text-gray-600">
//         <p><strong>Notas:</strong></p>
//         <ul className="list-disc pl-5">
//           <li>Los estilos que se aplican usan clases de Tailwind (ej: <code>font-bold</code>, <code>text-sm</code>, <code>text-center</code>).</li>
//           <li>Al seleccionar una imagen/video y usar los controles, se aplican clases Tailwind de alineación y tamaño (float-left, mx-auto, w-1/2, etc.).</li>
//           <li>El botón "Copiar HTML" copia el HTML interno del editor con las clases aplicadas; pega en tu proyecto que tenga Tailwind para ver los estilos.</li>
//         </ul>
//       </div>
//     </div>
//   );
// }













// import React, { useState, useRef } from "react";

// const DescriptionForm = () => {
//   const [content, setContent] = useState("<p>Tu música va Contigo</p><p>Disfruta de sus graves profundos y claridad excepcional en un tamaño mini, ideal para guardarlo en cualquier parte y disfrutar de tu música donde sea que te encuentres.</p><p>¿Sorprendido? ¡Hasta tus amigos querrán uno!</p>");
//   const [isHtmlView, setIsHtmlView] = useState(false);
//   const editorRef = useRef(null);

//   const handleBold = () => {
//     document.execCommand('bold', false, null);
//   };

//   const handleItalic = () => {
//     document.execCommand('italic', false, null);
//   };

//   const handleUnderline = () => {
//     document.execCommand('underline', false, null);
//   };

//   const handleHeading = (level) => {
//     document.execCommand('formatBlock', false, `h${level}`);
//   };

//   const handleAlign = (alignment) => {
//     document.execCommand('justify' + alignment, false, null);
//     handleContentChange()
//   };


//   const handleFontSize = (size) => {
//     document.execCommand('fontSize', false, size);
//   };

//   const handleInsertImage = () => {
//     const imageUrl = prompt("Ingrese la URL de la imagen:");
//     if (imageUrl) {
//       const embedCode = `<img class=" block m-auto rounded-xl w-[250px]" src=${imageUrl}>`
//     //   document.execCommand('insertImage', false, imageUrl);
//     document.execCommand('insertHTML', false, embedCode);
//       handleContentChange()
//     }
//   };

//   const handleInsertVideo = () => {
//     const videoUrl = prompt("Ingrese la URL del video (YouTube o Vimeo):");
//     if (videoUrl) {
//     //   const embedCode = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
//       const embedCode = `
//         <iframe 
//           class="w-[560px] h-[315px] block m-auto"
//           src="${videoUrl}" 
//           frameborder="0" 
//           allowfullscreen>
//         </iframe>
//       `;
//       document.execCommand('insertHTML', false, embedCode);
//       handleContentChange()
//     }
//   };

//   const handleCopyHtml = () => {
//     navigator.clipboard.writeText(content).then(() => {
//       alert("HTML copiado al portapapeles!");
//     });
//   };

//   const handleToggleView = () => {
//     setIsHtmlView(!isHtmlView);
//   };

//   const handleContentChange = () => {
//     if (editorRef.current) {
//       setContent(editorRef.current.innerHTML);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg border border-blue-200 overflow-hidden">
//           {/* Toolbar */}
//           <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <select 
//                 className="text-sm border border-gray-300 rounded px-2 py-1"
//                 onChange={(e) => handleHeading(e.target.value)}
//               >
//                 <option value="1">Encabezado 1</option>
//                 <option value="2">Encabezado 2</option>
//                 <option value="3">Encabezado 3</option>
//                 <option value="p">Parrafo</option>
//               </select>
              
//               <button onClick={handleBold} className="p-1 hover:bg-gray-200 rounded transition-colors">
//                 <span className="font-bold">B</span>
//               </button>
//               <button onClick={handleItalic} className="p-1 hover:bg-gray-200 rounded transition-colors">
//                 <span className="italic">I</span>
//               </button>
//               <button onClick={handleUnderline} className="p-1 hover:bg-gray-200 rounded transition-colors">
//                 <span className="underline">U</span>
//               </button>
              
//               <select 
//                 className="text-sm border border-gray-300 rounded px-2 py-1 ml-2"
//                 onChange={(e) => handleFontSize(e.target.value)}
//               >
//                 <option value="1">Tamaño 1</option>
//                 <option value="2">Tamaño 2</option>
//                 <option value="3">Tamaño 3</option>
//                 <option value="4">Tamaño 4</option>
//                 <option value="5">Tamaño 5</option>
//               </select>
              
//               <div className="flex space-x-1 ml-2">
//                 <button onClick={() => handleAlign('Left')} className="p-1 hover:bg-gray-200 rounded transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//                 <button onClick={() => handleAlign('Center')} className="p-1 hover:bg-gray-200 rounded transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                   </svg>
//                 </button>
//                 <button onClick={() => handleAlign('Right')} className="p-1 hover:bg-gray-200 rounded transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//               </div>
              
//               <button onClick={handleInsertImage} className="p-1 hover:bg-gray-200 rounded transition-colors ml-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </button>
              
//               <button onClick={handleInsertVideo} className="p-1 hover:bg-gray-200 rounded transition-colors ml-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.727A1 1 0 0121 8.364v8.272a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={handleToggleView}
//                 className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
//               >
//                 {isHtmlView ? 'Editar' : 'HTML'}
//               </button>
//               <button 
//                 onClick={handleCopyHtml}
//                 className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
//               >
//                 Copiar HTML
//               </button>
//             </div>
//           </div>

//           {/* Editor Content */}
//           <div className="p-4">
//             {isHtmlView ? (
//               <div className="border border-gray-300 rounded p-4 bg-gray-50 min-h-64">
//                 <pre className="whitespace-pre-wrap text-sm">{content}</pre>
//               </div>
//             ) : (
//               <div 
//                 ref={editorRef}
//                 contentEditable 
//                 dangerouslySetInnerHTML={{ __html: content }}
//                 //onInput={handleContentChange}
//                 className="min-h-64 border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 style={{ minHeight: '200px' }}
//               />
//             )}
//           </div>
//         </div>

//         <button onClick={() => handleContentChange()}>ACTUALIZAR</button>

//         {/* Preview Section */}
//         <div className="mt-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
//           <h3 className="text-lg font-semibold mb-3">Vista previa</h3>
//           <div 
//             className="border border-gray-300 rounded p-4"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DescriptionForm;