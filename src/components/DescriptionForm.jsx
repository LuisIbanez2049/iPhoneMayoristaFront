import React, { useState, useRef } from "react";

const DescriptionForm = () => {
  const [content, setContent] = useState("<p>Tu música va Contigo</p><p>Disfruta de sus graves profundos y claridad excepcional en un tamaño mini, ideal para guardarlo en cualquier parte y disfrutar de tu música donde sea que te encuentres.</p><p>¿Sorprendido? ¡Hasta tus amigos querrán uno!</p>");
  const [isHtmlView, setIsHtmlView] = useState(false);
  const editorRef = useRef(null);

  const handleBold = () => {
    document.execCommand('bold', false, null);
  };

  const handleItalic = () => {
    document.execCommand('italic', false, null);
  };

  const handleUnderline = () => {
    document.execCommand('underline', false, null);
  };

  const handleHeading = (level) => {
    document.execCommand('formatBlock', false, `h${level}`);
  };

  const handleAlign = (alignment) => {
    document.execCommand('justify' + alignment, false, null);
    handleContentChange()
  };


  const handleFontSize = (size) => {
    document.execCommand('fontSize', false, size);
  };

  const handleInsertImage = () => {
    const imageUrl = prompt("Ingrese la URL de la imagen:");
    if (imageUrl) {
      const embedCode = `<img class=" block m-auto rounded-xl w-[250px]" src=${imageUrl}>`
    //   document.execCommand('insertImage', false, imageUrl);
    document.execCommand('insertHTML', false, embedCode);
      handleContentChange()
    }
  };

  const handleInsertVideo = () => {
    const videoUrl = prompt("Ingrese la URL del video (YouTube o Vimeo):");
    if (videoUrl) {
    //   const embedCode = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
      const embedCode = `
        <iframe 
          class="w-[560px] h-[315px] block m-auto"
          src="${videoUrl}" 
          frameborder="0" 
          allowfullscreen>
        </iframe>
      `;
      document.execCommand('insertHTML', false, embedCode);
      handleContentChange()
    }
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert("HTML copiado al portapapeles!");
    });
  };

  const handleToggleView = () => {
    setIsHtmlView(!isHtmlView);
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-blue-200 overflow-hidden">
          {/* Toolbar */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select 
                className="text-sm border border-gray-300 rounded px-2 py-1"
                onChange={(e) => handleHeading(e.target.value)}
              >
                <option value="1">Encabezado 1</option>
                <option value="2">Encabezado 2</option>
                <option value="3">Encabezado 3</option>
                <option value="p">Parrafo</option>
              </select>
              
              <button onClick={handleBold} className="p-1 hover:bg-gray-200 rounded transition-colors">
                <span className="font-bold">B</span>
              </button>
              <button onClick={handleItalic} className="p-1 hover:bg-gray-200 rounded transition-colors">
                <span className="italic">I</span>
              </button>
              <button onClick={handleUnderline} className="p-1 hover:bg-gray-200 rounded transition-colors">
                <span className="underline">U</span>
              </button>
              
              <select 
                className="text-sm border border-gray-300 rounded px-2 py-1 ml-2"
                onChange={(e) => handleFontSize(e.target.value)}
              >
                <option value="1">Tamaño 1</option>
                <option value="2">Tamaño 2</option>
                <option value="3">Tamaño 3</option>
                <option value="4">Tamaño 4</option>
                <option value="5">Tamaño 5</option>
              </select>
              
              <div className="flex space-x-1 ml-2">
                <button onClick={() => handleAlign('Left')} className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button onClick={() => handleAlign('Center')} className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <button onClick={() => handleAlign('Right')} className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              <button onClick={handleInsertImage} className="p-1 hover:bg-gray-200 rounded transition-colors ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button onClick={handleInsertVideo} className="p-1 hover:bg-gray-200 rounded transition-colors ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.727A1 1 0 0121 8.364v8.272a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleToggleView}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                {isHtmlView ? 'Editar' : 'HTML'}
              </button>
              <button 
                onClick={handleCopyHtml}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                Copiar HTML
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-4">
            {isHtmlView ? (
              <div className="border border-gray-300 rounded p-4 bg-gray-50 min-h-64">
                <pre className="whitespace-pre-wrap text-sm">{content}</pre>
              </div>
            ) : (
              <div 
                ref={editorRef}
                contentEditable 
                dangerouslySetInnerHTML={{ __html: content }}
                //onInput={handleContentChange}
                className="min-h-64 border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minHeight: '200px' }}
              />
            )}
          </div>
        </div>

        <button onClick={() => handleContentChange()}>ACTUALIZAR</button>

        {/* Preview Section */}
        <div className="mt-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Vista previa</h3>
          <div 
            className="border border-gray-300 rounded p-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionForm;