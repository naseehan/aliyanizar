import React from "react";
import "./loader.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Loader() {

  const imageRef = React.useRef();
  const ARef = React.useRef();
  const NRef = React.useRef();

    useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "back",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

   useGSAP(() => {
    gsap.fromTo(
      ARef.current,
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "back.out",
        scrollTrigger: {
          trigger: ARef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

   useGSAP(() => {
    gsap.fromTo(
      NRef.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "back.out",
        scrollTrigger: {
          trigger: NRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFF0] z-50">
      <div className="relative flex items-center justify-center font-['Maghfirea',sans-serif] text-[#D4AF37] font-medium text-[50px]">
        <img src="/logo1.webp" alt="Logo" className="w-40 h-40"  ref={imageRef} />

        <span className="absolute z-10 top-8 left-[50px]" ref={ARef}>A</span>
        <span className="absolute top-14 left-[82px]" ref={NRef}>N</span>
      </div>
    </div>
  );
}
