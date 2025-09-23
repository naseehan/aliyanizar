import React from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import icon1 from "../assets/calligraphy.svg";
import icon2 from "../assets/illu.svg";
import icon3 from "../assets/3d.svg";
import icon4 from "../assets/staircase.svg";
import paint from "../assets/paint.svg"

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = () => {
  const headingRef = React.useRef();
   const serviceRef = React.useRef();

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

    useGSAP(() => {
    gsap.fromTo(
      serviceRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: serviceRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);


  return (
    <div className="bg-[#FFFFF0] relative">
      <div className="hidden md:block">
        <img src="/spinning-circle.webp" alt="spinning image" loading="lazy" className="absolute w-[200px] bottom-29 right-4" />
      </div>
      {/* heading */}
      <div className=" mx-auto text-center">
        <h1
          className="text-[50px] font-bold tracking-[5px] text-[#D4AF37] font-['Maghfirea',sans-serif] uppercase"
          id="heading"
          ref={headingRef}
        >
          services
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

      {/* services */}
      <div className="max-w-[1000px] my-12 mx-auto grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))]" ref={serviceRef}>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea',sans-serif] text-[#b9900d]">
            <img src={paint} alt="paint" loading='lazy' className="w-[50px]"/>
            <h1 className="tracking-[3px]">PAINTINGS</h1>
          </div>
          <p className="text-[14px] md:text-[17px]  font-medium font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
            Canvases • Mural Walls • fabric(clothing) • wood
              panels
          </p>
        </div>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea',sans-serif] text-[#b9900d]">
            <img src={icon2} alt={icon2} loading='lazy' className="w-[50px]"/>
            <h1 className="tracking-[3px]">Illustrations </h1>
          </div>
          <p className="text-[14px] md:text-[17px]  font-medium font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
            Invitation cards • Digital art
          </p>
        </div>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea',sans-serif] text-[#b9900d]">
            <img src={icon1} alt={icon1} loading='lazy' className="w-[50px]"/>
            <h1 className="tracking-[3px]">CALLIGRAPHY</h1>
          </div>
          <p className="text-[14px] md:text-[17px]  font-medium font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
           Canvas paintings • Prints
          </p>
        </div>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px]  font-bold font-['Maghfirea',sans-serif] text-[#b9900d]">
            <img src={icon3} alt={icon3} loading='lazy' className="w-[50px]"/>
            <h1 className="tracking-[3px]">3D VISUALIZATION</h1>
          </div>
          <p className="text-[14px] md:text-[17px] font-medium font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
            3D Models and Visualization for Interior Spaces
          </p>
        </div>

         <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] w-[300px] font-bold font-['Maghfirea',sans-serif] text-[#b9900d]">
            <img src={icon4} alt={icon4} loading='lazy' className="w-[50px]"/>
            <h1 className="tracking-[3px]">Interior Design Consultation</h1>
          </div>
          <p className="text-[14px] md:text-[17px] font-medium font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
           Concept development • Mood boards • CAD • 3D • Interior Styling
          </p>
        </div>

      </div>

      <div className="flex pb-20">
        <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200" to="/services">
          MORE DETAILS
        </Link>
      </div>
      
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>

    </div>
  );
};

export default ServiceSection;
