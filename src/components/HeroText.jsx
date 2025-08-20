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
      delay: anime.stagger(120)
    });
  }, []);

  // Bottom arc text
  useEffect(() => {
    if (textRef.current) {
      circleInstance.current = new CircleType(textRef.current).dir(-1);
      const updateRadius = () => {
        circleInstance.current.radius(120);
        
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }
  }, []);


  // Top arc text (reversed)
  useEffect(() => {
    if (reverseRef.current) {
      reverseInstance.current = new CircleType(reverseRef.current);
      const updateRadius = () => {
        reverseInstance.current.radius(180);
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }
  }, []);

  return (
    <div className="mt-6 sm:mt-14 lg:mt-21 text-center block" 
    // ref={root}
    >
    

<p
        ref={reverseRef}
        className="text-[28px] lg:text-[35px] text-[#cb9b4a] font-[Maghfirea,sans-serif] font-medium [text-shadow:#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px]"
      >
        <span className="text-[18px]">⋄</span> INTERIOR DESIGNER <span>⋄</span>
      </p>

      <h1
        className="text-[54px] lg:text-[86px] font-medium font-[Maghfirea,sans-serif] text-[#004953] tracking-[8px]" ref={motionRef}
      >
        ALIYA NIZAR
      </h1>

  <p
        ref={textRef}
        className="text-[28px] lg:text-[35px] text-[#cb9b4a] font-[Maghfirea,sans-serif] font-medium[text-shadow:#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px] "
      >
        <span>⋄</span> ARTIST <span>⋄</span>
      </p>
      
    </div>
  );
};

export default HeroText;
