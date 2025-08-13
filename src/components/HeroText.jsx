import React, { useEffect, useRef } from "react";
import CircleType from "circletype";

const HeroText = () => {

 const textRef = useRef(null);
  const reverseRef = useRef(null); // new ref for reverse arc

  const circleInstance = useRef(null);
  const reverseInstance = useRef(null); // new CircleType instance for reverse

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

  useEffect(() => {
    if (reverseRef.current) {
      reverseInstance.current = new CircleType(reverseRef.current).dir(-1); // reverse direction
      const updateRadius = () => {
        reverseInstance.current.radius(184); // your chosen radius
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }
  }, []);

  return (
     <div className="mt-25 text-center block">
      <p
        ref={textRef}
        className="text-[35px] text-white font-[Maghfirea,sans-serif] font-bold [text-shadow:#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px]"
      >
      <span>⋄</span> ARTIST <span>⋄</span>
      </p>
      <h1 className="text-[86px] font-semibold font-[Maghfirea,sans-serif] text-[#D4AF37] tracking-[8px]">
        ALIYA NIZAR
      </h1>
      <p
        ref={reverseRef}
        className="text-[35px] text-white font-[Maghfirea,sans-serif] font-bold [text-shadow:#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px,#D4AF37_0px_0px_1px]"
      >
       <span className="text-[18px]">⋄</span> INTERIOR DESIGNER <span>⋄</span>
      </p>
    </div>
  )
}

export default HeroText
