import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {



const headingRef = React.useRef();
const buttonRef = React.useRef()
const projectRef = React.useRef()

// for heading motion
useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);


  // for project motion
    useGSAP(() => {
    gsap.fromTo(
      projectRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: projectRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

  return (
    <div className="bg-[#FFFFF0]" >

        {/* heading */}
      <div className="py-20 mx-auto text-center">
        <h2 className="text-[60px] font-bold tracking-[5px] text-[#D4AF37] font-['Maghfirea',sans-serif] uppercase" id="heading" ref={headingRef}>
          Design Projects
        </h2>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

{/* project section */}
<div className="max-w-[1000px] my-12 mx-auto px-3 sm:px-8 lg:px-0" ref={projectRef}
// onClick={() => handleClick("project-title")}
>
  <div className="grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-5">
      <div className="group relative hover:-translate-y-3 duration-500 h-[400px] sm:h-[446px] sm:w-auto">
        <img
          src="/comingSoonHome.webp"
          alt=""
          loading="lazy"
          className="w-full h-full"
        />
        {/* when hovering */}
        <div className="absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white opacity-70  sm:opacity-0  sm:group-hover:opacity-70 sm:group-hover:pointer-events-auto transition-opacity duration-300">
          <h3 className="text-[40px] font-medium font-[Flaviotte] tracking-[4px]">
            Interiors
          </h3>
          {/* <p className="text-[20px] font-semibold text-center">
            Learn More
          </p> */}
        </div>

      </div>

       <div className="group relative hover:-translate-y-3 duration-500 h-[400px]  sm:w-auto sm:h-[446px]">
        <img
          src="/murals/Dhikr.webp"
          alt="murals"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* when hovering */}
        <div className="absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-center items-center text-white opacity-70  sm:opacity-0  sm:group-hover:opacity-70 sm:group-hover:pointer-events-auto transition-opacity duration-300">
          <h3 className="text-[40px] font-medium font-[Flaviotte] tracking-[4px]">
            Wall Murals
          </h3>
          <Link to="/murals" aria-label="Learn more about Wall Murals">
          <p className="text-[20px] font-semibold text-center">
            View Murals
          </p>
          </Link>
        </div>

      </div>

       <div className="group relative hover:-translate-y-3 duration-500 h-[400px]  sm:w-auto sm:h-[446px]">
        <img
          src="/comingSoonHome.webp"
          alt="crafts"
          loading="lazy"
          className="w-full h-full"
        />
        {/* when hovering */}
        <div className="absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white opacity-70  sm:opacity-0  sm:group-hover:opacity-70 sm:group-hover:pointer-events-auto transition-opacity duration-300">
          <h3 className="text-[40px] font-medium font-[Flaviotte] tracking-[4px]">
            Crafts
          </h3>
          {/* <p className="text-[20px] font-semibold text-center">
            Learn More
          </p> */}
        </div>

      </div>
  </div>
</div>


      <div className="flex pb-20" ref={buttonRef}>
        <Link to='/works/designWorks'
          className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] border-[#D4AF37] text-[#946C00] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200">
          MORE WORKS
        </Link>
      </div>
    </div>
  );
};

export default Projects;
