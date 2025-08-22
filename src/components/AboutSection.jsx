import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import avatar from "../assets/aliya.jpg"
import diamond from "../assets/diamond.png"
import "../App.css"

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  let aboutRef = React.useRef();


  useGSAP(() => {
    gsap.fromTo(
      aboutRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

  return (
    <div
      className="about-me-section  bg-[#FFFFF0]
"
      ref={aboutRef}
    >
      {/* <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div> */}
{/* <img src={divider} alt="divider" loading="lazy" /> */}
{/* <div className="divider"></div> */}
      <div
        className="grid lg:w-[1000px] py-12 mx-auto
 items-center lg:grid-cols-2 gap-[60px] grid-cols-1"
      >
        <div className="px-4 lg:px-0 text-center lg:text-start">
          <h1
            className="text-[60px] font-bold font-['Maghfirea',sans-serif] uppercase tracking-[8px] text-[#b9900d] 
"
          >
            hello!
          </h1>
          <p className="text-[24px] mb-12 leading-[1.5] font-[Flaviotte] uppercase tracking-[4px] font-medium text-[#b9900d] lg:max-w-[29rem]">
            I am Aliya Nizar,
            <br />
            a Dubai-based freelance artist and interior designer.
            <br />
            <br />
             Here, you'll
            find a selection of projects that have defined my creative path.
            <br />
            <br />
            Currently, I'm at my desk crafting and curating new experiences.
            <br />
            {/* Let's connect and create something beautiful together! */}
          </p>
          <div className="flex ">
            <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200" to="/about">
              MORE DETAILS
            </Link>
          </div>
        </div>

        <div className="h-[350px] w-[350px] md:h-[480px] md:w-[480px] mx-auto  relative">
          <img
            src={avatar}
            alt="author"
            loading="lazy"
            className="h-full w-full rounded-full object-cover
"
          />
          <div
            className="absolute top-[-42px] right-[45px]
"
          >
            {/* <RotatingTextCircle /> */}
            <img src={diamond} alt="diamond shape" loading="lazy" height={160} width={160} className="animate-spin-slow"/>
          </div>
        </div>
      </div>
      <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
    </div>
  );
};

export default AboutSection;
