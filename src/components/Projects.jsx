import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
const navigate = useNavigate()
const handleClick = (slug) => {
navigate(`/projectsDetails/${slug}`)
}

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
        <h1 className="text-[60px] font-bold tracking-[5px] text-[#D4AF37] font-['Maghfirea',sans-serif] uppercase" id="heading" ref={headingRef}>
          Design Projects
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

{/* project section */}
<div className="max-w-[1000px] my-12 mx-auto px-3 sm:px-8 lg:px-0" ref={projectRef}
onClick={() => handleClick("project-title")}>
  <div className="grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-5">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="group relative hover:-translate-y-3 duration-500 h-[400px]  sm:w-auto sm:h-[500px]">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
          alt=""
          loading="lazy"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white opacity-0 pointer-events-none group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300">
          <h3 className="text-[40px] font-bold font-[Flaviotte] tracking-[4px]">
            Design Title
          </h3>
          <p className="text-[20px] font-semibold text-center">
            Design Category
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


      <div className="flex pb-20" ref={buttonRef}>
        <Link
          className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200">
          MORE WORK
        </Link>
      </div>
    </div>
  );
};

export default Projects;
