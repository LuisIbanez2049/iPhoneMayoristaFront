import React, { useEffect, useRef, useState } from "react";
import HtmlToTailwind from "./HtmlToTailwind";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import MessageAlert from "./MessageAlert";

const DescriptionFormEDIT = ({ onActualizarDescripcion, id }) => {

  const baseUrl = "http://localhost:8080"


  const editorRef = useRef(null);
  const [savedRange, setSavedRange] = useState(null);
  const [content, setContent] = useState("");
  const [areThereChanges, setAreThereChanges] = useState(false)



  const [description, setDescription] = useState("")
  const [descriptionEnviar, setDescriptionEnviar] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [viewAlertMesaggeFromAPI, setViewAlertMesaggeFromAPI] = useState(false)
  const [textMessageAlert, setTextMessageAlert] = useState("")

  const bodyForAPI = {
    productId: id,
    name: "",
    price: -1,
    stock: -1,
    categoryId: -1,
    fileLinks: [],
    description: descriptionEnviar,
  }

  const handleOnClickAcceptAlertMessage = () => {
    setViewAlertMesaggeFromAPI(false)
    setTextMessageAlert("")
  }



  useEffect(() => {
    axios.get(`${baseUrl}/api/product/${id}`)
      .then((response) => {
        console.log(response.data)

        setDescription(response.data.description)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])


  const actualizarProducto = () => {
    setIsLoading(true)
    console.log(bodyForAPI)
    const token = localStorage.getItem("token")
    //console.log(token)
    let tokenSinComillas = token.replace(/"/g, '');
    //console.log(tokenSinComillas)
    // axios.get("http://localhost:8080/api/materias/availablesubjects", {
    axios.post(`${baseUrl}/api/product/edit`, bodyForAPI, {
      headers: {
        Authorization: `Bearer ${tokenSinComillas}`
      }
    })
      .then((response) => {
        console.log(response.data)
        setIsLoading(false)
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





  //----------------------------------ESTADOS Y FUNCIONES PARA LOS FORMULARIOS DE IMAGEN Y VIDEO----------------------------------------------
  const [viewImageForm, setViewImageForm] = useState(false)
  const [viewVideForm, setViewVideoForm] = useState(false)
  const [link, setLink] = useState("");
  const [aspect, setAspect] = useState("16:9");

  const handleSubmitImage = (e) => {
    e.preventDefault();
    console.log("Link enviado:", link);
    // Aquí puedes hacer lo que necesites con el link
    insertMedia("image")
    console.log("entra aui?")
  };

  const handleSubmitVideo = (e) => {
    e.preventDefault();
    console.log("Video link:", link, "Aspecto:", aspect);
    insertMedia("video")

  };

  //----------------------------------ESTADOS Y FUNCIONES PARA LOS FORMULARIOS DE IMAGEN Y VIDEO----------------------------------------------


  //--------------------------------EVITA PERDER EL FOCO CUANDO HAGO CLICK FUERA DEL CONTENT EDITABLE---------
  const handleBlur = (e) => {
    // Si se hace blur a un input o textarea, no forzar focus
    if (
      e.relatedTarget &&
      (e.relatedTarget.tagName === "INPUT" ||
        e.relatedTarget.tagName === "TEXTAREA")
    ) {
      return;
    }
    // Re-enfocar el contentEditable
    editorRef.current.focus();
  };


  // Guardar la selección antes de perder el foco
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
    }
  };

  // Restaurar selección después de cerrar modal/input
  const restoreSelection = () => {
    if (savedRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);
      editorRef.current.focus();
    }
  };
  //--------------------------------EVITA PERDER EL FOCO CUANDO HAGO CLICK FUERA DEL CONTENT EDITABLE---------




  //--------------------------------TRANSFORMAR LINK DE YOUTUBE PARA PODER INCRUSTAR EN MI WEB---------
  function getEmbedUrl(url) {
    let videoId;

    // Si viene en formato "watch?v="
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    // Si viene en formato "youtu.be/"
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }
  //--------------------------------TRANSFORMAR LINK DE YOUTUBE PARA PODER INCRUSTAR EN MI WEB---------



  // Guarda lo que el usuario editó
  const handleSave = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      setDescriptionEnviar(editorRef.current.innerHTML)
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
  // función auxiliar para redimensionar iframes detectando su aspecto automáticamente
  const resizeIframe = (iframe, increase) => {
    let className = iframe.className;

    const widthRegex = /w-\[(\d+)px\]/;
    const heightRegex = /h-\[(\d+)px\]/;

    let newClass = className;

    if (widthRegex.test(className) && heightRegex.test(className)) {
      const currentW = parseInt(className.match(widthRegex)[1]); // ancho px
      const currentH = parseInt(className.match(heightRegex)[1]); // alto px

      // Detectar relación de aspecto original
      const ratio = currentW / currentH; // ej: 16/9 ≈ 1.78, 9/16 ≈ 0.56

      const newW = increase ? currentW + 30 : Math.max(100, currentW - 30);
      const newH = Math.round(newW / ratio);

      // actualizar ancho y alto en la clase
      newClass = newClass.replace(widthRegex, `w-[${newW}px]`);
      newClass = newClass.replace(heightRegex, `h-[${newH}px]`);
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

      if (link) {
        console.log("Entra en el exCommand?")
        execCommand(
          "insertHTML",
          `<p style="text-align: center;">
            <img 
             class="sm:w-[700px] sm:h-auto w-full block m-auto"
             src="${link}" alt="imagen" />
          </p>`
        );
        setLink("")
        setViewImageForm(false)
      }
    } else if (type === "video") {
      //const url = prompt("Ingresa la URL del video (YouTube, por ejemplo):");
      if (link) {
        let embedLink = "";
        if (link.includes("youtu")) {
          console.log("Link: " + link + "\n" + "Embed link: " + getEmbedUrl(link))
          embedLink = getEmbedUrl(link)
        }
        if (aspect == "16:9") {
          execCommand(
            "insertHTML",
            `
            <p style="text-align: center;">
              <iframe
                class="sm:w-[560px]  sm:h-[315px] w-full h-[160px] rounded-lg m-auto"
                src="${embedLink ? embedLink : link}" 
                frameborder="0" 
                allowfullscreen
                
              </iframe>
            </p>
          `
          );
          setViewVideoForm(false)
          setLink("")
        } else {
          execCommand(
            "insertHTML",
            `
            <p style="text-align: center;">
              <iframe
                class="sm:w-[315px]  sm:h-[560px] w-full h-[520px] rounded-lg m-auto"
                src="${embedLink ? embedLink : link}" 
                frameborder="0" 
                allowfullscreen
                
              </iframe>
            </p>
          `
          );
          setAspect("16:9")
          setViewVideoForm(false)
          setLink("")
        }
      }
    }
  };


  // Copiar HTML generado
  const copyHtml = () => {
    handleSave()
    setAreThereChanges(false)
    const html = editorRef.current.innerHTML;
    navigator.clipboard.writeText(html).then(() => {
      //alert("HTML copiado al portapapeles");
      console.log(html)
      let enviarDescription = `${html}`
      //onActualizarDescripcion('' + html)
      setDescriptionEnviar(html)
      actualizarProducto()
    });
  };

  // Limpiar formato
  const clearFormatting = () => {
    execCommand("removeFormat");
  };

  return (
    <div className=" lg:w-[950px]  flex flex-col items-center m-auto">




      <LoadingSpinner isLoading={isLoading} />
      <MessageAlert view={viewAlertMesaggeFromAPI} onClickAccept={handleOnClickAcceptAlertMessage} text={textMessageAlert} />


      {/* -------------------------------------------------------FORMULARIO IMAGEN/VIDEO------------------------------------------------------- */}
      <div className={`z-10 w-full h-[100vh]  fixed top-0 flex flex-col justify-center items-center transition-opacity duration-500 ${viewImageForm ? "opacity-100 pointer-events-auto" : viewVideForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className=" relative p-2  flex flex-col justify-center items-center">

          {/* -------------------------------------------------------FORMULARIO IMAGEN------------------------------------------------------- */}
          <div className={` relative flex items-center justify-center bg-gray-100 rounded-xl transition-opacity duration-500 ${viewImageForm ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none"}`}>
            <form
              onSubmit={handleSubmitImage}
              className=" relative bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
              {/* Botón X */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-black transition"
                onClick={() => setViewImageForm(false)}
              >
                {/* Ícono X */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586L4.293 2.879 2.879 4.293 8.586 10l-5.707 5.707 1.414 1.414L10 11.414l5.707 5.707 1.414-1.414L11.414 10l5.707-5.707-1.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                Introducir enlace
              </h2>

              <input
                type="url"
                placeholder="https://ejemplo.com"
                onBlur={restoreSelection} // 👈 cuando se cierra, vuelve el foco al editor
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-black focus:border-black 
                     placeholder-gray-400 transition"
              />

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-medium 
                     hover:bg-gray-800 active:scale-95 transition"
              >
                Aceptar
              </button>
            </form>
          </div>
          {/* -------------------------------------------------------FORMULARIO IMAGEN------------------------------------------------------- */}




          {/* -------------------------------------------------------FORMULARIO VIDEO------------------------------------------------------- */}
          <div className={` absolute flex items-center justify-center bg-gray-100 rounded-xl transition-opacity duration-500 ${viewVideForm ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none"}`}>
            <form
              onSubmit={handleSubmitVideo}
              className="relative bg-white shadow-lg rounded-xl p-8 w-[400px]"
            >
              {/* Botón X */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-black transition"
                onClick={() => setViewVideoForm(false)}
              >
                {/* Ícono X */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586L4.293 2.879 2.879 4.293 8.586 10l-5.707 5.707 1.414 1.414L10 11.414l5.707 5.707 1.414-1.414L11.414 10l5.707-5.707-1.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                Agregar video
              </h2>

              {/* Input */}
              <input
                type="url"
                placeholder="https://video.com/ejemplo"
                onBlur={restoreSelection} // 👈 cuando se cierra, vuelve el foco al editor
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-black focus:border-black 
                     placeholder-gray-400 transition"
              />

              {/* Botones de aspecto */}
              <div className="flex justify-center gap-4 mb-6">

                {/* Botón 16:9 */}
                <button
                  type="button"
                  onClick={() => setAspect("16:9")}
                  className={`flex flex-col items-center px-4 py-2 border rounded-lg transition 
                       ${aspect === "16:9" ? "border-black bg-gray-100" : "border-gray-300 hover:border-black"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mb-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="3" y="8" width="18" height="8" rx="2" ry="2" />
                  </svg>
                  <span className="text-sm">16:9</span>
                </button>


                {/* Botón 9:16 */}
                <button
                  type="button"
                  onClick={() => setAspect("9:16")}
                  className={`flex flex-col items-center px-4 py-2 border rounded-lg transition 
                       ${aspect === "9:16" ? "border-black bg-gray-100" : "border-gray-300 hover:border-black"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mb-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="8" y="3" width="8" height="18" rx="2" ry="2" />
                  </svg>
                  <span className="text-sm">9:16</span>
                </button>

              </div>

              {/* Botón Aceptar */}
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-medium 
                     hover:bg-gray-800 active:scale-95 transition"
              >
                Aceptar
              </button>
            </form>
          </div>
          {/* -------------------------------------------------------FORMULARIO VIDEO------------------------------------------------------- */}



        </div>
      </div>
      {/* -------------------------------------------------------FORMULARIO IMAGEN/VIDEO------------------------------------------------------- */}


      <div
        className="w-[90%]"
        style={{
          //border: "1px solid #ccc",
          borderRadius: 8,
          overflow: "visible",
          margin: "20px 0",
        }}
      >

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-t-2xl mb-[15px]">
          <h2 className="text-2xl font-bold text-white text-center">Descripción</h2>
          <p className="text-gray-300 text-center mt-1">Agrega la descripción del producto abajo</p>
        </div>


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

          className=" sticky top-6 rounded-[8px] shadow-lg"
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
          <button type="button" onClick={() => setViewImageForm(true)}>
            <svg
              className="w-[24px] h-[24px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
            </svg>
          </button>
          <button type="button" onClick={() => setViewVideoForm(true)}>
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

          {/* <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Guardar cambios
        </button> */}

          {/* Copiar HTML */}
          <button
            type="button"
            className={`${areThereChanges ? "bg-[#002fff]" : "bg-[#80808085]"} transition-all duration-400`}
            onClick={copyHtml}
            style={{
              marginLeft: "auto",
              padding: "5px 10px",
              color: "white",
              border: "none",
              borderRadius: 4,
            }}
          >
            Guardar cambios
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          spellCheck="false"
          suppressContentEditableWarning={true}
          //onBlur={handleBlur}
          onMouseUp={handleSelection}  // Guarda selección al clickear
          onKeyUp={handleSelection}    // Guarda selección al escribir
          className=" outline-none border border-[#ccc] rounded-lg mt-[15px]"
          style={{
            minHeight: "400px",
            padding: "15px",
            lineHeight: "1.6",
            outline: "none",
            backgroundColor: "white",
          }}
          onInput={(e) => {
            handleSave()
            setAreThereChanges(true)
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
          <p className={`${description ? "hidden" : "show"}`}>Escribe aquí el contenido...</p>
          <HtmlToTailwind html={description} />

        </div>



        {/* Vista previa del HTML (opcional) */}
        {/* <div
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
        </div> */}


      </div>
    </div>
  );
};

export default DescriptionFormEDIT;
