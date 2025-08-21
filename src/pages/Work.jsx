import React from "react";
import { useNavigate } from "react-router-dom";

const Work = () => {

let navigate = useNavigate()
const handleClick = (slug) => {
  navigate(`/artworkdetails/${slug}`)
}

  return (
    <div className=" bg-[#FFFFF0] ">
      <div className="max-w-[1000px] pt-40  mx-auto">
        {/* heading */}
        <div className="text-center max-w-[686px] mx-auto">
          <h1 className="text-[60px] font-bold tracking-[8px] text-[#c16d3c] font-[Flaviotte,sans-serif] uppercase">
            design projects
          </h1>
          <br />
        </div>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>

        {/* works */}
        <div className=" py-12 mx-auto px-8 lg:px-0">
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="group relative hover:-translate-y-3 duration-500 h-[500px] cursor-pointer"
                 onClick={() => handleClick("momma-and-bear")}
              >
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
      </div>
    </div>
  );
};

export default Work;
