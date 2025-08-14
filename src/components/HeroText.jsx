import React, { useEffect, useRef } from "react";
import CircleType from "circletype";
// import { anime } from "animejs";
// import splt from "https://cdn.skypack.dev/spltjs@1.0.8";
import anime from "https://cdn.skypack.dev/animejs@3.2.1";

const HeroText = () => {
  // const root = useRef(null);
  const textRef = useRef(null);
  const reverseRef = useRef(null);

  const circleInstance = useRef(null);
  const reverseInstance = useRef(null);

const motionRef = useRef(null);

  useEffect(() => {
    const element = motionRef.current;
    const text = element.textContent;

    element.innerHTML = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // preserve space
      span.style.display = "inline-block";
      element.appendChild(span);
    });

    anime({
      targets: element.querySelectorAll("span"),
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
      delay: anime.stagger(50)
    });
  }, []);

  // Top arc text
  useEffect(() => {
    if (textRef.current) {
      circleInstance.current = new CircleType(textRef.current);
      const updateRadius = () => {
        circleInstance.current.radius(180);
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }
  }, []);

  // Bottom arc text (reversed)
  useEffect(() => {
    if (reverseRef.current) {
      reverseInstance.current = new CircleType(reverseRef.current).dir(-1);
      const updateRadius = () => {
        reverseInstance.current.radius(184);
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }
  }, []);

  return (
    <div className="mt-25 text-center block" 
    // ref={root}
    >
      <p
        ref={textRef}
        className="text-[35px] text-white font-[Maghfirea,sans-serif] font-bold [text-shadow:#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px] "
      >
        <span>⋄</span> A R T I S T <span>⋄</span>
      </p>

      <h1
        className="text-[60px] sm:text-[86px] font-semibold font-[Maghfirea,sans-serif] text-[#D4AF37] tracking-[8px]" ref={motionRef}
      >
        ALIYA NIZAR
      </h1>

      <p
        ref={reverseRef}
        className="text-[35px] text-white font-[Maghfirea,sans-serif] font-bold [text-shadow:#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px]"
      >
        <span className="text-[18px]">⋄</span> INTERIOR DESIGNER <span>⋄</span>
      </p>
    </div>
  );
};

export default HeroText;
