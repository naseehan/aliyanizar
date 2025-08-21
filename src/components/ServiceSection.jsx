import React from "react";
import { Link } from "react-router-dom";
import icon1 from "../assets/calligraphy.png";
import icon2 from "../assets/illu.png";
import icon3 from "../assets/3d.png";
import icon4 from "../assets/staircase.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spinning from "../assets/spinning-circle.png"

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = () => {
  const headingRef = React.useRef();
   const serviceRef = React.useRef();
  const buttonRef = React.useRef();

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
        <img src={spinning} alt="spinning image" loading="lazy" className="absolute w-[200px] bottom-5 right-0" />
      </div>
      {/* heading */}
      <div className=" mx-auto text-center">
        <h1
          className="text-[50px] font-bold tracking-[5px] text-[#D4AF37] font-[Flaviotte,sans-serif] uppercase"
          id="heading"
          ref={headingRef}
        >
          services
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

      {/* services */}
      <div className="max-w-[1000px] my-12 mx-auto grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))]" ref={serviceRef}>
        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-[Flaviotte] text-[#b9900d]">
            <img src={icon1} alt="" loading='lazy'/>
            <h1 className="tracking-[3px]">calligraphy</h1>
          </div>
          <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
            Logo & Identity • Style Guide • Packaging • Art Direction • Design
            Research
          </p>
        </div>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-[Flaviotte] text-[#b9900d]">
            <img src={icon2} alt="" loading='lazy'/>
            <h1 className="tracking-[3px]">Illustrations </h1>
          </div>
          <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
            Logo & Identity • Style Guide • Packaging • Art Direction • Design
            Research
          </p>
        </div>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-[Flaviotte] text-[#b9900d]">
            <img src={icon3} alt="" loading='lazy'/>
            <h1 className="tracking-[3px]">3D Visualisation</h1>
          </div>
          <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
            Logo & Identity • Style Guide • Packaging • Art Direction • Design
            Research
          </p>
        </div>

        <div className="p-5 grid gap-y-3">
          <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px]  font-bold font-[Flaviotte] text-[#b9900d]">
            <img src={icon4} alt="" loading='lazy'/>
            <h1 className="tracking-[3px]">Interior Design Consultation</h1>
          </div>
          <p className="text-[14px] md:text-[17px] font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
            Logo & Identity • Style Guide • Packaging • Art Direction • Design
            Research
          </p>
        </div>
      </div>

      <div className="flex pb-20">
        <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200" to="/services">
          MORE DETAILS
        </Link>
      </div>

      <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
    </div>
  );
};

export default ServiceSection;
