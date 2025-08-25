// CustomCursor.jsx
import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return; // don't enable cursor on touch devices

    setEnabled(true);

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);

    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    const elements = document.querySelectorAll("button, a, label");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  if (!enabled) return null; // don't render on mobile

  return (
    <img
      src={hovered ? "/cursor-gold.webp" : "/cursor.webp"}
      alt="custom cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      className={`fixed w-8 h-8 pointer-events-none 
                  -translate-x-1/2 -translate-y-1/2 
                  z-[9999] transition-transform duration-200
                  ${hovered ? "scale-150" : "scale-100"}`}
    />
  );
};

export default CustomCursor;
