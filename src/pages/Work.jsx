import React from "react";
import { Link } from "react-router-dom";
import GoBack from "../components/GoBack";

const Work = () => {
  return (
    <div className="bg-[#FFFFF0] relative">
      <GoBack />
      <div className="max-w-[1000px] pt-40  mx-auto">
        {/* heading */}

        <div className="lg:flex grid justify-center items-center">
          <div className="relative w-[360px] lg:w-auto">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/container-mobile.webp"
              />
              <source media="(min-width: 769px)" srcSet="/container1.webp" />
              <img
                src="/container1.webp"
                alt="Work container"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </picture>

            <Link
              to="artWorks"
              className="absolute top-[44%] left-[28%] text-[22px] lg:text-[34px] font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase"
            >
              Artworks
            </Link>
          </div>

          <div className="relative w-[360px] lg:w-auto">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/container-mobile.webp"
              />
              <source media="(min-width: 769px)" srcSet="/container1.webp" />
              <img
                src="/container1.webp"
                alt="Work container"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <Link
              to="designWorks"
              className="absolute top-[42%] lg:left-[32%] left-[31%]  text-center  text-[22px] lg:text-[34px]  font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase"
              style={{ lineHeight: 1 }}
            >
              Design <br /> Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
