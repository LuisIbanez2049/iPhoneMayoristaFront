import parse from "html-react-parser";

const styleToTailwind = (style) => {
  let classes = [];

  if (!style) return "";

  // Normalizamos (quitamos espacios extras)
  style = style.replace(/\s+/g, " ").toLowerCase();

  // Text align
  if (style.includes("text-align: center")) classes.push("text-center");
  if (style.includes("text-align: right")) classes.push("text-right");
  if (style.includes("text-align: left")) classes.push("text-left");

  // Display
  if (style.includes("display: block")) classes.push("block");
  if (style.includes("display: inline-block")) classes.push("inline-block");
  if (style.includes("display: flex")) classes.push("flex");

  // Margin auto
  if (style.includes("margin: 0 auto")) classes.push("mx-auto");
  if (style.includes("margin: 0px auto")) classes.push("mx-auto");

  // Width
  const widthMatch = style.match(/width:\s*(\d+)px/);
  if (widthMatch) classes.push(`w-[${widthMatch[1]}px]`);

  // Height
  const heightMatch = style.match(/height:\s*(\d+)px/);
  if (heightMatch) classes.push(`h-[${heightMatch[1]}px]`);

  // Font size (convertimos al tamaño aproximado de Tailwind)
  const fontSizeMatch = style.match(/font-size:\s*(\d+)px/);
  if (fontSizeMatch) {
    const size = parseInt(fontSizeMatch[1]);
    if (size <= 12) classes.push("text-xs");
    else if (size <= 14) classes.push("text-sm");
    else if (size <= 16) classes.push("text-base");
    else if (size <= 18) classes.push("text-lg");
    else if (size <= 20) classes.push("text-xl");
    else if (size <= 24) classes.push("text-2xl");
    else if (size <= 30) classes.push("text-3xl");
    else if (size <= 36) classes.push("text-4xl");
    else classes.push("text-5xl");
  }

  // Font weight
  if (style.includes("font-weight: bold")) classes.push("font-bold");
  if (style.includes("font-weight: 500")) classes.push("font-medium");
  if (style.includes("font-weight: 300")) classes.push("font-light");

  return classes.join(" ");
};

const HtmlToTailwind = ({ html }) => {
  return (
    <div className="">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.attribs) {
            // Convertir class -> className
            if (domNode.attribs.class) {
              domNode.attribs.className = domNode.attribs.class;
              delete domNode.attribs.class;
            }

            // Convertir estilos inline a clases Tailwind
            if (domNode.attribs.style) {
              const twClasses = styleToTailwind(domNode.attribs.style);
              domNode.attribs.className =
                (domNode.attribs.className || "") + " " + twClasses;
              delete domNode.attribs.style;
            }
          }
        },
      })}
    </div>
  );
};

export default HtmlToTailwind;
