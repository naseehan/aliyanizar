import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function RotatingTextCircle() {
  const circleRef = useRef(null);

  useEffect(() => {
    const text = "cat mom - disney nerd - plant lover - ";
    const radius = 80;
    const circle = circleRef.current;

    // Clear previous letters (if any)
    circle.innerHTML = "";

    // Place each letter around the circle
    for (let i = 0; i < text.length; i++) {
      const char = document.createElement("span");
      char.innerText = text[i];
      const angle = (i / text.length) * Math.PI * 2;
      char.style.transform = `
        rotate(${angle}rad) 
        translate(${radius}px) 
        rotate(${Math.PI / 2}rad)
      `;
      char.style.position = "absolute";
      char.style.top = "50%";
      char.style.left = "50%";
      char.style.transformOrigin = "0 0";
      char.className =
        " text-[15px] font-[Flaviotte] uppercase text-[#b9900d]"; // tailwind text styles
      circle.appendChild(char);
    }

    // Animate rotation
    gsap.to(circle, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
  }, []);

  return (
    <div
      ref={circleRef}
      className="relative w-[200px] h-[200px] rounded-full"
    ></div>
  );
}
