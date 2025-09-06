import React from "react";
import { useNavigate } from "react-router-dom";

const DesignWork = () => {
    let navigate = useNavigate()
  const handleClick = (slug) => {
     let keyword = slug.toLowerCase().replace(/s\+/g, "-")
    navigate(`${keyword}`)
  };

  return (
    <div className="bg-[#FFFFF0]">
      <div className="max-w-[1300px] pt-27 sm:pt-40 px-4 mx-auto">

         {/* header */}
        <div className="text-center max-w-[615px] mx-auto">
          <h1 className="text-[60px] font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] capitalize">
            design projects
          </h1>
          <br />
        </div>
        <div className="grid sm:[grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="group relative">
              <img
                src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
                alt=""
                loading="lazy"
                className="max-h-[500px] w-full object-cover"
              />
                {/* goto details page on mobile devices */}
                   <button onClick={() => handleClick("Design Name")}className="absolute inset-0 sm:hidden block"></button>
              {/* when hovering */}
              <div className="absolute inset-0 bg-[#000] bg-opacity-70 sm:flex flex-col justify-center items-center text-white opacity-0 pointer-events-none group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300 hidden">
                <button
                  className="text-[30px] font-bold font-['Maghfirea'] tracking-[4px]"
                  onClick={() => handleClick("Design Name")}
                >
                  Project Name
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignWork;
