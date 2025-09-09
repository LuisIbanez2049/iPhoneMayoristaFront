import { useRef } from "react";

export default function Editor() {
  const editableRef = useRef(null);

  const handleBlur = (e) => {
    // Evita perder el foco
    e.preventDefault();
    editableRef.current.focus();
  };

  return (
    <div className="w-[600px] h-[400px] border p-4">
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        className="w-full h-full outline-none"
      >
        Empieza a escribir aquí...
      </div>
    </div>
  );
}
