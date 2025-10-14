import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoBack from "../components/GoBack";

const Work = () => {
 
   const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#FFFFF0] relative">
      <GoBack />
      {/* <button onClick={handleBack} className="absolute top-28 left-3.5">go back</button> */}
      <div className="max-w-[1000px] pt-40  mx-auto">
        {/* heading */}

        <div className="lg:flex grid justify-center items-center">
          <div className="relative w-[360px] lg:w-auto">
            <img src="/container1.webp" alt="work container" />
            <Link to="artWorks" className="absolute top-[44%] left-[28%] text-[22px] lg:text-[34px] font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase">Artworks</Link>
          </div>
          <div className="relative w-[360px] lg:w-auto">
            <img src="/container1.webp" alt="project container" />
            <Link to="designWorks" className="absolute top-[42%] lg:left-[32%] left-[31%]  text-center  text-[22px] lg:text-[34px]  font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase"style={{lineHeight: 1}}>Design <br /> Projects</Link>
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default Work;
