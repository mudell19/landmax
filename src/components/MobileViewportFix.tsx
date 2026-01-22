import { useEffect } from "react";

export const MobileViewportFix = () => {
  useEffect(() => {
    const applyScale = () => {
      const width = window.screen.width;
      const designWidth = 375; // Largura base do iPhone XS

      // Aplica apenas em celulares maiores que o design base e menores que tablets
      if (width > designWidth && width < 640) {
        const scale = width / designWidth;
        const meta = document.querySelector("meta[name=viewport]");
        if (meta) {
          meta.setAttribute(
            "content",
            `width=${designWidth}, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`
          );
        }
      }
    };

    applyScale();
    window.addEventListener("resize", applyScale);
    return () => window.removeEventListener("resize", applyScale);
  }, []);

  return null; // Componente lógico, não renderiza nada visual
};
