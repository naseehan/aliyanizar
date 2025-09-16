import React, { useEffect, useRef } from "react";
import CircleType from "circletype";
// import { anime } from "animejs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

const HeroText = () => {
  // const root = useRef(null);
  const textRef = useRef(null);
  const reverseRef = useRef(null);
  const aliyaRef = React.useRef();
  const wrapperRef = React.useRef();
  const circleInstance = useRef(null);
  const reverseInstance = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      aliyaRef.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: aliyaRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      reverseRef.current,
      { y: 250, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.in",
        scrollTrigger: {
          trigger: reverseRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);





  // Bottom arc text
  useEffect(() => {
    if (textRef.current) {
      circleInstance.current = new CircleType(textRef.current);
      const updateRadius = () => {
        circleInstance.current.radius(100);
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
        reverseInstance.current.radius(130);
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }
  }, []);

 useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { y: 250, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.in",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);


  return (
    <div
      className="mt-30 text-center block"
      // ref={root}
    >
      <div className="relative mb-[30px]">
        <p
          ref={reverseRef}
          className="text-[27px] font-bold text-[#cb9b4a] font-[Maghfirea,sans-serif]"
        >
          ⋄ INTERIOR DESIGNER ⋄
        </p>

        <p
          ref={textRef}
          className="text-[27px]  text-[#cb9b4a] font-[Maghfirea,sans-serif] font-bold absolute left-[50%]  top-[53px] circle-text"
        >
          ⋄ ARTIST ⋄
        </p>
        

      </div>
      <h1
        className="text-[40px] lg:text-[60px] font-medium font-[Cloudy,sans-serif] text-[#004953] tracking-[5px]"
        ref={aliyaRef}
      >
        aliya nizar
      </h1>
    </div>
  );
};

export default HeroText;
