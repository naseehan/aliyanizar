import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

const Projects = () => {

const headingRef = React.useRef();
const buttonRef = React.useRef()

  return (
    <div className="bg-[#FFFFF0]">

        {/* heading */}
      <div className="py-20 mx-auto text-center">
        <h1 className="text-[50px] font-bold tracking-[5px] text-[#D4AF37] font-[Flaviotte,sans-serif] uppercase" id="heading" ref={headingRef}>
          Design Projects
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

{/* project section */}
<div className="max-w-[1000px] my-12 mx-auto px-8 lg:px-0">
  <div className="grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-5">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="group relative hover:-translate-y-3 duration-500 h-[500px]">
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
