import React, { useRef, useState } from "react";
import HtmlToTailwind from "./HtmlToTailwind";

const DescriptionForm = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

   // Guarda lo que el usuario editó
  const handleSave = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // 🔹 Helper para reemplazar clases en un nodo
  const replaceClass = (node, groupRegex, newClass) => {
    if (!node.classList) return;

    // Eliminar clases previas que matcheen el grupo
    Array.from(node.classList).forEach((cls) => {
      if (groupRegex.test(cls)) {
        node.classList.remove(cls);
      }
    });

    // Agregar la nueva clase
    if (newClass) node.classList.add(newClass);
  };

  // Ejecutar comandos de formato
  const execCommand = (command, value = null) => {
  if (["justifyLeft", "justifyCenter", "justifyRight"].includes(command)) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;

    // Si es texto, subimos al padre
    if (node.nodeType === 3) node = node.parentNode;

    // Subimos en la jerarquía hasta encontrar un <p>
    while (node && node.nodeName !== "P") {
      node = node.parentNode;
    }

    if (node && node.nodeName === "P") {
      if (command === "justifyLeft")
        replaceClass(node, /^text-(left|center|right)$/, "text-left");
      if (command === "justifyCenter")
        replaceClass(node, /^text-(left|center|right)$/, "text-center");
      if (command === "justifyRight")
        replaceClass(node, /^text-(left|center|right)$/, "text-right");
    }
    return; // evitamos que se ejecute el execCommand nativo
  }

  // Si no es un comando custom → usamos execCommand nativo
  document.execCommand(command, false, value);
  editorRef.current?.focus();
};




  const addFormat = (format) => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  
  const range = selection.getRangeAt(0);
  let node = range.commonAncestorContainer;

  // Si es nodo de texto, subir al padre
  if (node.nodeType === 3) {
    node = node.parentNode;
  }

  if (!node) return;

  let classList = node.getAttribute("class");
  let classes = classList ? classList.split(/\s+/).filter(Boolean) : [];

  // Grupos exclusivos
  const alignClasses = ["text-left", "text-center", "text-right"];
  const sizeClasses = ["text-[16px]", "text-[19px]", "text-[22px]"];

  if (alignClasses.includes(format)) {
    // === Caso Alineación ===
    if (classes.includes(format)) {
      // Si ya tiene la misma → eliminar
      classes = classes.filter(cls => cls !== format);
    } else {
      // Reemplazar cualquier otra de alineación
      classes = classes.filter(cls => !alignClasses.includes(cls));
      classes.push(format);
    }
  } else if (sizeClasses.includes(format)) {
    // === Caso Tamaño ===
    if (classes.includes(format)) {
      // Si ya tiene ese tamaño exacto → no hacer nada
      return;
    } else {
      // Reemplazar cualquier otro tamaño de este grupo
      classes = classes.filter(cls => !sizeClasses.includes(cls));
      classes.push(format);
    }
  } else {
    // === Caso general === (toggle normal)
    if (classes.includes(format)) {
      classes = classes.filter(cls => cls !== format);
    } else {
      classes.push(format);
    }
  }

  // Actualizar el atributo class
  if (classes.length > 0) {
    node.setAttribute("class", classes.join(" "));
  } else {
    node.removeAttribute("class");
  }
};





  // Aumentar o disminuir tamaño de imagen/video seleccionada
  const adjustMediaSize = (increase) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    
    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;
    console.log(node.firstChild)
    // Si es nodo de texto, subir al padre
    if (node.nodeType === 3) {
      node = node.parentNode;
    }

    // Caso 1: si es IMG o IFRAME directamente
    if (node.nodeName === "IMG") {
      const currentWidth = parseInt(
        node.style.width || getComputedStyle(node).width
      );
      const newWidth = increase
        ? currentWidth + 50
        : Math.max(100, currentWidth - 50);
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
        resizeImg(img, increase)
        return;
      }
    }
  };

  // función auxiliar para redimensionar iframes manteniendo relación 16:9
  const resizeIframe = (iframe, increase) => {
    let className = iframe.className;

    const widthRegex = /w-\[(\d+)px\]/;
    const heightRegex = /h-\[(\d+)px\]/;

    let newClass = className;

    if (widthRegex.test(className)) {
      const currentW = parseInt(className.match(widthRegex)[1]); // ancho en vw
      const newW = increase ? currentW + 30 : Math.max(20, currentW - 30);

      // Calcular nueva altura proporcional (16:9)
      const newH = Math.round(((newW * 9) / 16));
      // 👆 (newW vw → px) → (ancho px * 9 / 16)

      // Actualizar ancho y alto en la clase
      newClass = newClass.replace(widthRegex, `w-[${newW}px]`);
      if (heightRegex.test(newClass)) {
        newClass = newClass.replace(heightRegex, `h-[${newH}px]`);
      } else {
        newClass += ` h-[${newH}px]`;
      }
    }

    iframe.className = newClass;
  };


  // función auxiliar para redimensionar imagenes
  const resizeImg = (img, increase) => {
    let className = img.className;

    const widthRegex = /w-\[(\d+)px\]/;

    let newClass = className;

    if (widthRegex.test(className)) {
      const currentW = parseInt(className.match(widthRegex)[1]); // ancho en px
      const newW = increase ? currentW + 40 : Math.max(20, currentW - 40);

      // Actualizar ancho y alto en la clase
      newClass = newClass.replace(widthRegex, `w-[${newW}px]`);
      
    }

    img.className = newClass;
  };

  // Insertar imagen o video
  const insertMedia = (type) => {
    if (type === "image") {
      const url = prompt("Ingresa la URL de la imagen:");
      if (url) {
        execCommand(
          "insertHTML",
          `<p style="text-align: center;">
            <img 
             class="sm:w-[700px] sm:h-auto w-full block m-auto"
             src="${url}" alt="imagen" />
          </p>`
        );
      }
    } else if (type === "video") {
      const url = prompt("Ingresa la URL del video (YouTube, por ejemplo):");
      if (url) {
        execCommand(
          "insertHTML",
          `
            <p style="text-align: center;">
              <iframe
                class="sm:w-[560px]  sm:h-[315px] w-[290px] h-[160px] rounded-lg m-auto"
                src="${url}" 
                frameborder="0" 
                allowfullscreen
                
              </iframe>
            </p>
          `
        );
      }
    }
  };

  // Copiar HTML generado
  const copyHtml = () => {
    const html = editorRef.current.innerHTML;
    navigator.clipboard.writeText(html).then(() => {
      alert("HTML copiado al portapapeles");
    });
  };

  // Limpiar formato
  const clearFormatting = () => {
    execCommand("removeFormat");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="w-[90%]"
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          overflow: "hidden",
          margin: "20px 0",
        }}
      >
        {/* Barra de herramientas */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            padding: "8px 10px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
            alignItems: "center",
          }}
        >
          {/* Formato de texto */}
          <div>


            <button type="button" onClick={() => execCommand("bold")}>
              <svg
                className="w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"></path>
              </svg>
            </button>
            <button type="button" onClick={() => execCommand("italic")}>
              <svg
                className="w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"></path>
              </svg>
            </button>
            <button type="button" onClick={() => execCommand("underline")}>
              <svg
                className="w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"></path>
              </svg>
            </button>
          </div>

          {/* Tamaño de letra */}
          <select
            className="p-1 rounded-lg"
            onChange={(e) => {
              execCommand("fontSize", e.target.value);
              e.target.value = "";
            }}
          >
            <option value="">Tamaño</option>
            <option value="1">Pequeño</option>
            <option value="3">Mediano</option>
            <option value="5">Grande</option>
          </select>

          {/* Alineación */}
          <div className="flex flex-row gap-3">



            
            <button type="button" onClick={() => execCommand("justifyLeft")}>
              <svg
                className="w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"></path>
              </svg>
            </button>
            <button type="button" onClick={() => execCommand("justifyCenter")}>
              <svg
                className="w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"></path>
              </svg>
            </button>
            <button type="button" onClick={() => execCommand("justifyRight")}>
              <svg
                className="w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"></path>
              </svg>
            </button>
          </div>

          {/* Insertar elementos */}
          <button type="button" onClick={() => insertMedia("image")}>
            <svg
              className="w-[24px] h-[24px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
            </svg>
          </button>
          <button type="button" onClick={() => insertMedia("video")}>
            <svg
              className="w-[24px] h-[24px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 4C16.5523 4 17 4.44772 17 5V9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16ZM15 6H3V18H15V6ZM8 8H10V11H13V13H9.999L10 16H8L7.999 13H5V11H8V8ZM21 8.84131L17 11.641V12.359L21 15.1587V8.84131Z"></path>
            </svg>
          </button>

          {/* Ajustar tamaño media */}
          <button type="button" onClick={() => adjustMediaSize(true)}>
            <svg
              className="w-[24px] h-[24px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
            </svg>
          </button>
          <button type="button" onClick={() => adjustMediaSize(false)}>
            <svg
              className="w-[24px] h-[24px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 11H17V13H7V11Z"></path>
            </svg>
          </button>

          {/* Limpiar */}
          <button type="button" onClick={clearFormatting}>
            <i className="fa-solid fa-broom"></i>
          </button>

          <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Guardar cambios
        </button>

          {/* Copiar HTML */}
          <button
            type="button"
            onClick={copyHtml}
            style={{
              marginLeft: "auto",
              padding: "5px 10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 4,
            }}
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
            minHeight: "400px",
            padding: "15px",
            lineHeight: "1.6",
            outline: "none",
            backgroundColor: "white",
          }}
          onInput={(e) => {
            const imgs = e.target.querySelectorAll("img");
            imgs.forEach((img) => {
              replaceClass(img, /^m-?auto$/, "m-auto");
              replaceClass(img, /^block$/, "block");
            });

            const iframes = e.target.querySelectorAll("iframe");
            iframes.forEach((iframe) => {
              replaceClass(iframe, /^m-?auto$/, "m-auto");
              replaceClass(iframe, /^block$/, "block");
            });
          }}
        >
          <p >Escribe aquí tu contenido...</p>
          <HtmlToTailwind html={''} />

        </div>

        {/* Vista previa del HTML (opcional) */}
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderTop: "1px solid #eee",
            fontSize: "12px",
            color: "#555",
          }}
        >
          <strong>HTML generado:</strong>
          <pre
            style={{ margin: "5px 0", maxHeight: "100px", overflow: "auto" }}
          >
            {editorRef.current?.innerHTML || "<p>Escribe aquí...</p>"}

            <h1 className="font-bold text-[25px]">Content</h1>
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DescriptionForm;















//--------------------------------------------------------LO DE ABAJO FUNCIONA VERSION2--------------------------------------------------


// import React, { useRef, useState } from "react";
// import HtmlToTailwind from "./HtmlToTailwind";

// const DescriptionForm = () => {
//   const editorRef = useRef(null);
//   const [content, setContent] = useState("");

//    // Guarda lo que el usuario editó
//   const handleSave = () => {
//     if (editorRef.current) {
//       setContent(editorRef.current.innerHTML);
//     }
//   };

//   // 🔹 Helper para reemplazar clases en un nodo
//   const replaceClass = (node, groupRegex, newClass) => {
//     if (!node.classList) return;

//     // Eliminar clases previas que matcheen el grupo
//     Array.from(node.classList).forEach((cls) => {
//       if (groupRegex.test(cls)) {
//         node.classList.remove(cls);
//       }
//     });

//     // Agregar la nueva clase
//     if (newClass) node.classList.add(newClass);
//   };

//   // Ejecutar comandos de formato
//   const execCommand = (command, value = null) => {
//     if (["justifyLeft", "justifyCenter", "justifyRight"].includes(command)) {
//       const selection = window.getSelection();
//       if (!selection.rangeCount) return;
//       const range = selection.getRangeAt(0);
//       let node = range.commonAncestorContainer;

//       // Si es texto, subimos al padre
//       if (node.nodeType === 3) node = node.parentNode;

//       if (node && node.nodeName === "P") {
//         if (command === "justifyLeft")
//           replaceClass(node, /^text-(left|center|right)$/, "text-left");
//         if (command === "justifyCenter")
//           replaceClass(node, /^text-(left|center|right)$/, "text-center");
//         if (command === "justifyRight")
//           replaceClass(node, /^text-(left|center|right)$/, "text-right");
//       }
//       return; // evitamos que se ejecute el execCommand nativo
//     }

//     // Si no es un comando custom → usamos execCommand nativo
//     document.execCommand(command, false, value);
//     editorRef.current?.focus();
//   };

//   // Aumentar o disminuir tamaño de imagen/video seleccionada
//   const adjustMediaSize = (increase) => {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;

    
//     const range = selection.getRangeAt(0);
//     let node = range.commonAncestorContainer;
//     console.log(node.firstChild)
//     // Si es nodo de texto, subir al padre
//     if (node.nodeType === 3) {
//       node = node.parentNode;
//     }

//     // Caso 1: si es IMG o IFRAME directamente
//     if (node.nodeName === "IMG") {
//       const currentWidth = parseInt(
//         node.style.width || getComputedStyle(node).width
//       );
//       const newWidth = increase
//         ? currentWidth + 50
//         : Math.max(100, currentWidth - 50);
//       node.style.width = `${newWidth}px`;
//       node.style.display = "block";
//       node.style.margin = "0 auto";

//       return;
//     }

//     if (node.nodeName === "IFRAME") {
//       resizeIframe(node, increase);
//       return;
//     }

//     // Caso 2: si es P (contenedor), buscar IMG o IFRAME dentro
//     if (node.nodeName === "P") {
//       const iframe = node.querySelector("iframe");
//       const img = node.querySelector("img");

//       if (iframe) {
//         resizeIframe(iframe, increase);
//         return;
//       }
//       if (img) {
//         const currentWidth = parseInt(
//           img.style.width || getComputedStyle(img).width
//         );
//         const newWidth = increase
//           ? currentWidth + 50
//           : Math.max(100, currentWidth - 50);
//         img.style.width = `${newWidth}px`;
//         img.style.display = "block";
//         img.style.margin = "0 auto";
//         //console.log("hola") //-------------------------------------------------------------------------------------
//         //node.firstChild.removeAttribute("class")
//         node.firstChild.className = "";
//         //console.log(node.firstChild)
//         return;
//       }
//     }
//   };

//   // función auxiliar para redimensionar iframes manteniendo relación 16:9
//   const resizeIframe = (iframe, increase) => {
//     let className = iframe.className;

//     const widthRegex = /w-\[(\d+)vw\]/;
//     const heightRegex = /h-\[(\d+)px\]/;

//     let newClass = className;

//     if (widthRegex.test(className)) {
//       const currentW = parseInt(className.match(widthRegex)[1]); // ancho en vw
//       const newW = increase ? currentW + 10 : Math.max(20, currentW - 10);

//       // Calcular nueva altura proporcional (16:9)
//       const newH = Math.round(((newW * 9) / 16) * (window.innerWidth / 100));
//       // 👆 (newW vw → px) → (ancho px * 9 / 16)

//       // Actualizar ancho y alto en la clase
//       newClass = newClass.replace(widthRegex, `w-[${newW}vw]`);
//       if (heightRegex.test(newClass)) {
//         newClass = newClass.replace(heightRegex, `h-[${newH}px]`);
//       } else {
//         newClass += ` h-[${newH}px]`;
//       }
//     }

//     iframe.className = newClass;
//   };

//   // Insertar imagen o video
//   const insertMedia = (type) => {
//     if (type === "image") {
//       const url = prompt("Ingresa la URL de la imagen:");
//       if (url) {
//         execCommand(
//           "insertHTML",
//           `<p style="text-align: center;"><img src="${url}" alt="imagen" class="block m-auto" style="width: 700px; height: auto; " /></p>`
//         );
//       }
//     } else if (type === "video") {
//       const url = prompt("Ingresa la URL del video (YouTube, por ejemplo):");
//       if (url) {
//         execCommand(
//           "insertHTML",
//           `
//             <p style="text-align: center;">
//               <iframe
//                 class="sm:w-[30vw]  sm:h-[294px] w-[290px] h-[160px] rounded-lg m-auto"
//                 src="${url}" 
//                 frameborder="0" 
//                 allowfullscreen
                
//               </iframe>
//             </p>
//           `
//         );
//       }
//     }
//   };
//   // class="sm:w-[30vw]  sm:h-[294px] w-[290px] h-[160px] rounded-lg m-auto"

//   // Copiar HTML generado
//   const copyHtml = () => {
//     const html = editorRef.current.innerHTML;
//     navigator.clipboard.writeText(html).then(() => {
//       alert("HTML copiado al portapapeles");
//     });
//   };

//   // Limpiar formato
//   const clearFormatting = () => {
//     execCommand("removeFormat");
//   };

//   return (
//     <div className="w-full flex flex-col items-center">
//       <div
//         className="w-[90%]"
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: 8,
//           overflow: "hidden",
//           margin: "20px 0",
//         }}
//       >
//         {/* Barra de herramientas */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "14px",
//             padding: "8px 10px",
//             backgroundColor: "#f5f5f5",
//             borderBottom: "1px solid #ddd",
//             alignItems: "center",
//           }}
//         >
//           {/* Formato de texto */}
//           <div>
//             <button type="button" onClick={() => execCommand("bold")}>
//               <svg
//                 className="w-[24px] h-[24px]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"></path>
//               </svg>
//             </button>
//             <button type="button" onClick={() => execCommand("italic")}>
//               <svg
//                 className="w-[24px] h-[24px]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"></path>
//               </svg>
//             </button>
//             <button type="button" onClick={() => execCommand("underline")}>
//               <svg
//                 className="w-[24px] h-[24px]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"></path>
//               </svg>
//             </button>
//           </div>

//           {/* Tamaño de letra */}
//           <select
//             className="p-1 rounded-lg"
//             onChange={(e) => {
//               execCommand("fontSize", e.target.value);
//               e.target.value = "";
//             }}
//           >
//             <option value="">Tamaño</option>
//             <option value="1">Pequeño</option>
//             <option value="3">Mediano</option>
//             <option value="5">Grande</option>
//           </select>

//           {/* Alineación */}
//           <div className="flex flex-row gap-3">
//             <button type="button" onClick={() => execCommand("justifyLeft")}>
//               <svg
//                 className="w-[24px] h-[24px]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"></path>
//               </svg>
//             </button>
//             <button type="button" onClick={() => execCommand("justifyCenter")}>
//               <svg
//                 className="w-[24px] h-[24px]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"></path>
//               </svg>
//             </button>
//             <button type="button" onClick={() => execCommand("justifyRight")}>
//               <svg
//                 className="w-[24px] h-[24px]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"></path>
//               </svg>
//             </button>
//           </div>

//           {/* Insertar elementos */}
//           <button type="button" onClick={() => insertMedia("image")}>
//             <svg
//               className="w-[24px] h-[24px]"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
//             </svg>
//           </button>
//           <button type="button" onClick={() => insertMedia("video")}>
//             <svg
//               className="w-[24px] h-[24px]"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M16 4C16.5523 4 17 4.44772 17 5V9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16ZM15 6H3V18H15V6ZM8 8H10V11H13V13H9.999L10 16H8L7.999 13H5V11H8V8ZM21 8.84131L17 11.641V12.359L21 15.1587V8.84131Z"></path>
//             </svg>
//           </button>

//           {/* Ajustar tamaño media */}
//           <button type="button" onClick={() => adjustMediaSize(true)}>
//             <svg
//               className="w-[24px] h-[24px]"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
//             </svg>
//           </button>
//           <button type="button" onClick={() => adjustMediaSize(false)}>
//             <svg
//               className="w-[24px] h-[24px]"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 11H17V13H7V11Z"></path>
//             </svg>
//           </button>

//           {/* Limpiar */}
//           <button type="button" onClick={clearFormatting}>
//             <i className="fa-solid fa-broom"></i>
//           </button>

//           <button
//           onClick={handleSave}
//           className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
//         >
//           Guardar cambios
//         </button>

//           {/* Copiar HTML */}
//           <button
//             type="button"
//             onClick={copyHtml}
//             style={{
//               marginLeft: "auto",
//               padding: "5px 10px",
//               background: "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: 4,
//             }}
//           >
//             📋 Copiar HTML
//           </button>
//         </div>

//         {/* Editor */}
//         <div
//           ref={editorRef}
//           contentEditable
//           spellCheck="false"
//           style={{
//             minHeight: "400px",
//             padding: "15px",
//             lineHeight: "1.6",
//             outline: "none",
//             backgroundColor: "white",
//           }}
//           onInput={(e) => {
//             const imgs = e.target.querySelectorAll("img");
//             imgs.forEach((img) => {
//               replaceClass(img, /^m-?auto$/, "m-auto");
//               replaceClass(img, /^block$/, "block");
//             });

//             const iframes = e.target.querySelectorAll("iframe");
//             iframes.forEach((iframe) => {
//               replaceClass(iframe, /^m-?auto$/, "m-auto");
//               replaceClass(iframe, /^block$/, "block");
//             });
//           }}
//         >
//           <p>Escribe aquí tu contenido...</p>
//           <HtmlToTailwind html={'<p>Escribe aquí tu contenido...</p><div><p>Escribe aquí tu contenido...</p><div><div><div><p class=" text-center"><img alt="imagen" class="mx-auto w-[250px] m-auto block" src="https://res.cloudinary.com/dlyoighih/image/upload/v1748106382/iPadAir2_ntoqdo.jpg"></p><p class=" text-center"><br></p><p class=" text-center"><b><i><u><font size="5">Que pasa</font></u></i></b>?</p><p class=" text-center"><br></p><p class=" text-center"><iframe src="https://res.cloudinary.com/dlyoighih/video/upload/v1747970285/samples/elephants.mp4" frameborder="0" allowfullscreen="" iframe="" class="sm:w-[20vw] sm:h-[196px] w-full h-[200px] rounded-lg m-auto block"></iframe></p><p class=" text-center"><br></p><p class=" text-center"><b><font size="5"><u>ARI GAMEPLAYS</u></font></b></p><p class=" text-center"><br></p><p style="text-align: center;"><img src="https://res.cloudinary.com/dlyoighih/image/upload/v1755578333/y7azbfqdnkxg681fx6rr.png" alt="imagen" class="m-auto block" style="width: 300px; display: block; margin: 0px auto;"></p><div></div></div></div></div></div>'} />

//         </div>

//         {/* Vista previa del HTML (opcional) */}
//         <div
//           style={{
//             marginTop: "10px",
//             padding: "10px",
//             backgroundColor: "#f9f9f9",
//             borderTop: "1px solid #eee",
//             fontSize: "12px",
//             color: "#555",
//           }}
//         >
//           <strong>HTML generado:</strong>
//           <pre
//             style={{ margin: "5px 0", maxHeight: "100px", overflow: "auto" }}
//           >
//             {editorRef.current?.innerHTML || "<p>Escribe aquí...</p>"}

//             <h1 className="font-bold text-[25px]">Content</h1>
//             {content}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DescriptionForm;














//--------------------------------------------------------LO DE ABAJO FUNCIONA VERSION1--------------------------------------------------
// import React, { useRef } from 'react';
// import HtmlToTailwind from './HtmlToTailwind';

// const DescriptionForm = () => {
//   const editorRef = useRef(null);

//   // Ejecutar comandos de formato
//   const execCommand = (command, value = null) => {
//     document.execCommand(command, false, value);
//     editorRef.current?.focus();
//   };

//   // Aumentar o disminuir tamaño de imagen/video seleccionada
//   const adjustMediaSize = (increase) => {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     let node = range.commonAncestorContainer;

//     // Si es nodo de texto, subir al padre
//     if (node.nodeType === 3) {
//       node = node.parentNode;
//     }

//     // Caso 1: si es IMG o IFRAME directamente
//     if (node.nodeName === "IMG") {
//       const currentWidth = parseInt(node.style.width || getComputedStyle(node).width);
//       const newWidth = increase ? currentWidth + 50 : Math.max(100, currentWidth - 50);
//       node.style.width = `${newWidth}px`;
//       node.style.display = "block";
//       node.style.margin = "0 auto";
//       return;
//     }

//     if (node.nodeName === "IFRAME") {
//       resizeIframe(node, increase);
//       return;
//     }

//     // Caso 2: si es P (contenedor), buscar IMG o IFRAME dentro
//     if (node.nodeName === "P") {
//       const iframe = node.querySelector("iframe");
//       const img = node.querySelector("img");

//       if (iframe) {
//         resizeIframe(iframe, increase);
//         return;
//       }
//       if (img) {
//         const currentWidth = parseInt(img.style.width || getComputedStyle(img).width);
//         const newWidth = increase ? currentWidth + 50 : Math.max(100, currentWidth - 50);
//         img.style.width = `${newWidth}px`;
//         img.style.display = "block";
//         img.style.margin = "0 auto";
//         return;
//       }
//     }
//   };

//   // función auxiliar para redimensionar iframes manteniendo relación 16:9
//   const resizeIframe = (iframe, increase) => {
//     let className = iframe.className;

//     const widthRegex = /w-\[(\d+)vw\]/;
//     const heightRegex = /h-\[(\d+)px\]/;

//     let newClass = className;

//     if (widthRegex.test(className)) {
//       const currentW = parseInt(className.match(widthRegex)[1]); // ancho en vw
//       const newW = increase ? currentW + 10 : Math.max(20, currentW - 10);

//       // Calcular nueva altura proporcional (16:9)
//       const newH = Math.round((newW * 9) / 16 * (window.innerWidth / 100));
//       // 👆 (newW vw → px) → (ancho px * 9 / 16)

//       // Actualizar ancho y alto en la clase
//       newClass = newClass.replace(widthRegex, `w-[${newW}vw]`);
//       if (heightRegex.test(newClass)) {
//         newClass = newClass.replace(heightRegex, `h-[${newH}px]`);
//       } else {
//         newClass += ` h-[${newH}px]`;
//       }
//     }

//     iframe.className = newClass;
//   };

//   // Insertar imagen o video
//   const insertMedia = (type) => {
//     if (type === 'image') {
//       const url = prompt('Ingresa la URL de la imagen:');
//       if (url) {
//         execCommand('insertHTML', `<p style="text-align: center;"><img src="${url}" alt="imagen" class="block m-auto" style="width: 700px; height: auto; " /></p>`);
//       }
//     } else if (type === 'video') {
//       const url = prompt('Ingresa la URL del video (YouTube, por ejemplo):');
//       if (url) {

//         execCommand('insertHTML', `
//             <p style="text-align: center;">
//               <iframe
//                 class="sm:w-[30vw]  sm:h-[294px] w-[290px] h-[160px] rounded-lg m-auto"
//                 src="${url}"
//                 frameborder="0"
//                 allowfullscreen

//               </iframe>
//             </p>
//           `);

//       }
//     }
//   };

//   // Copiar HTML generado
//   const copyHtml = () => {
//     const html = editorRef.current.innerHTML;
//     navigator.clipboard.writeText(html).then(() => {
//       alert('HTML copiado al portapapeles');
//     });
//   };

//   // Limpiar formato
//   const clearFormatting = () => {
//     execCommand('removeFormat');
//   };

//   return (
//     <div className='w-full flex flex-col items-center'>
//       <div className='w-[90%]' style={{ border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden', margin: '20px 0' }}>
//         {/* Barra de herramientas */}
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '14px',
//             padding: '8px 10px',
//             backgroundColor: '#f5f5f5',
//             borderBottom: '1px solid #ddd',
//             alignItems: 'center',
//           }}
//         >
//           {/* Formato de texto */}
//           <div>
//             <button type="button" onClick={() => execCommand('bold')}>
//               <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"></path>
//               </svg>
//             </button>
//             <button type="button" onClick={() => execCommand('italic')}>
//               <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"></path></svg>
//             </button>
//             <button type="button" onClick={() => execCommand('underline')}>
//               <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"></path></svg>
//             </button>
//           </div>

//           {/* Tamaño de letra */}
//           <select
//             className='p-1 rounded-lg'
//             onChange={(e) => {
//               execCommand('fontSize', e.target.value);
//               e.target.value = '';
//             }}
//           >
//             <option value="">Tamaño</option>
//             <option value="1">Pequeño</option>
//             <option value="3">Mediano</option>
//             <option value="5">Grande</option>
//           </select>

//           {/* Alineación */}
//           <div className='flex flex-row gap-3'>
//             <button type="button" onClick={() => execCommand('justifyLeft')}>
//               <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"></path></svg>
//             </button>
//             <button type="button" onClick={() => execCommand('justifyCenter')}>
//               <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"></path></svg>
//             </button>
//             <button type="button" onClick={() => execCommand('justifyRight')}>
//               <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"></path></svg>
//             </button>
//           </div>

//           {/* Insertar elementos */}
//           <button type="button" onClick={() => insertMedia('image')}>
//             <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
//             </svg>
//           </button>
//           <button type="button" onClick={() => insertMedia('video')}>
//             <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M16 4C16.5523 4 17 4.44772 17 5V9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16ZM15 6H3V18H15V6ZM8 8H10V11H13V13H9.999L10 16H8L7.999 13H5V11H8V8ZM21 8.84131L17 11.641V12.359L21 15.1587V8.84131Z"></path>
//             </svg>
//           </button>

//           {/* Ajustar tamaño media */}
//           <button type="button" onClick={() => adjustMediaSize(true)}>
//             <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
//             </svg>
//           </button>
//           <button type="button" onClick={() => adjustMediaSize(false)}>
//             <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 11H17V13H7V11Z"></path>
//             </svg>
//           </button>

//           {/* Limpiar */}
//           <button type="button" onClick={clearFormatting}>
//             <i className="fa-solid fa-broom"></i>
//           </button>

//           {/* Copiar HTML */}
//           <button
//             type="button"
//             onClick={copyHtml}
//             style={{ marginLeft: 'auto', padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
//           >
//             📋 Copiar HTML
//           </button>
//         </div>

//         {/* Editor */}
//         <div
//           ref={editorRef}
//           contentEditable
//           spellCheck="false"
//           style={{
//             minHeight: '400px',
//             padding: '15px',
//             lineHeight: '1.6',
//             outline: 'none',
//             backgroundColor: 'white',
//           }}
//           onInput={(e) => {
//             // Aseguramos que las imágenes y videos sigan centrados si se modifican
//             const imgs = e.target.querySelectorAll('img');
//             imgs.forEach(img => {
//               if (img.style.display !== 'block') img.style.display = 'block';
//               if (img.style.margin !== '0 auto') img.style.margin = '0 auto';
//             });
//             const iframes = e.target.querySelectorAll('iframe');
//             iframes.forEach(iframe => {
//               iframe.style.display = 'block';
//               iframe.style.margin = '0 auto';
//             });
//           }}
//         >
//           <p>Escribe aquí tu contenido...</p>
//                   <HtmlToTailwind html={'<p>Escribe aquí tu contenido...</p><div><p>Escribe aquí tu contenido...</p><div><p>Escribe aquí tu contenido...</p><p class=" text-center"><b><font size="5">Reloj</font></b></p><p class=" text-center"><img alt="imagen" class="block m-auto block w-[300px] block" src="https://res.cloudinary.com/dlyoighih/image/upload/v1747970289/samples/shoe.jpg" style="display: block; margin: 0px auto;"></p><p class=" text-center"><br></p><p class=" text-center"><font size="5"><b><u>Video</u></b></font></p><p class=" text-center"><iframe src="https://res.cloudinary.com/dlyoighih/video/upload/v1747970285/samples/elephants.mp4" frameborder="0" allowfullscreen="" iframe="" class="sm:w-[40vw]  sm:h-[393px] w-[290px] h-[160px] rounded-lg m-auto block block" style="display: block; margin: 0px auto;"></iframe></p><p class=" text-center"><br></p><p class=" text-center text-left" style="text-align: left;">Quiero seguir editando <i>esto...</i></p><div></div></div></div>'}/>

//         </div>

//         {/* Vista previa del HTML (opcional) */}
//         <div
//           style={{
//             marginTop: '10px',
//             padding: '10px',
//             backgroundColor: '#f9f9f9',
//             borderTop: '1px solid #eee',
//             fontSize: '12px',
//             color: '#555',
//           }}
//         >
//           <strong>HTML generado:</strong>
//           <pre style={{ margin: '5px 0', maxHeight: '100px', overflow: 'auto' }}>
//             {editorRef.current?.innerHTML || '<p>Escribe aquí...</p>'}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };
// // <p>Escribe aquí tu contenido...</p><p style="text-align: center;"><iframe class="sm:w-[30vw]  sm:h-[294px] w-[290px] h-[160px] rounded-lg" src="https://res.cloudinary.com/dlyoighih/video/upload/v1747970285/samples/elephants.mp4" frameborder="0" allowfullscreen="" <="" iframe="" style="display: block; margin: 0px auto;"></iframe></p>
// export default DescriptionForm;
