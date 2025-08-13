import React from "react";
import { Link } from "react-router-dom";
import author from "../assets/nas.jpg";
import RotatingTextCircle from "./RotatingTextCircle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import avatar from "../assets/aliya2.jpg"

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
      <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      <div
        className="grid lg:w-[1000px] my-12 mx-auto
 items-center lg:grid-cols-2 gap-[60px] grid-cols-1"
      >
        <div className="px-4 lg:px-0 text-center lg:text-start">
          <h1
            className="text-[60px] font-bold font-[Flaviotte] tracking-[3px] text-[#b9900d]
"
          >
            HELLO!
          </h1>
          <p className="text-[24px] mb-12 leading-[1.5] font-[Flaviotte] uppercase tracking-[4px] font-semibold text-[#b9900d] lg:max-w-[28rem]">
            I am Aliya Nizar,
            <br />
            a Dubai-based freelance artist and interior designer. Here, you'll
            find a selection of projects that have defined my creative path.
            Currently, I'm at my desk crafting and curating new experiences.
            <br />
            {/* Let's connect and create something beautiful together! */}
          </p>
          <div className="flex ">
            <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200">
              MORE DETAILS
            </Link>
          </div>
        </div>

        <div className=" h-[480px] w-[480px] mx-auto lg:h-[520px]  relative">
          <img
            src={avatar}
            alt="author"
            loading="lazy"
            className="h-full w-full rounded-t-[50%] 
"
          />
          <div
            className="absolute top-[-22px] right-[-22px]
"
          >
            <RotatingTextCircle />
          </div>
        </div>
      </div>
      <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
    </div>
  );
};

export default AboutSection;
