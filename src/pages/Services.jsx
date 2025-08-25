import React from "react";
import { Link } from "react-router-dom";
import icon1 from "../assets/calligraphy.webp";
import icon2 from "../assets/illu.webp";
import icon3 from "../assets/3d.webp";
import icon4 from "../assets/staircase.webp";
import paint from "../assets/paint.webp"

const Services = () => {
  return (
    <div className="  bg-[#FFFFF0]">
      <div className="max-w-[1000px] pt-40  mx-auto">
        {/* header */}

        <div className="text-center max-w-[615px] mx-auto">
          <h1 className="text-[60px] font-bold tracking-[3px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase">
            services
          </h1>
          {/* <p className="font-medium font-[Ubuntu] text-[#b9900d] text-[19px]">
            Develop your passion project with eye catching branding, packaging,
            web design & illustrations.{" "}
          </p> */}
          <br />
        </div>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>

        {/* services */}
        <div className="my-12 mx-auto grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] items-stretch gap-y-[30px]">

          <div className="p-5 grid gap-y-6">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea'] text-[#b9900d]">
              <img src={paint} alt="paint" loading="lazy" />
              <h1 className="tracking-[3px]">PAINTINGS</h1>
            </div>
            <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
              Canvases • Mural Walls • fabric(clothing) • wood
              panels
            </p>
            <p className="text-[#987300] leading-[26px]">
              Specialized custom hand-painted artworks across a variety of
              surfaces—canvases, mural- wall arts, wearable fabrics, and wooden
              panels. Each piece is thoughtfully crafted to reflect the client’s
              vision, adding a personal touch to any space or item.
            </p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea'] text-[#b9900d]">
              <img src={icon2} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">ILLUSTRATIONS</h1>
            </div>
            <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
              Invitation cards • Digital art
            </p>
            <p className="text-[#987300] leading-[26px]  ">
              Illustration services range from unique invitation card designs to
              dynamic digital artworks. Delivering creative visuals that are
              both striking and meaningful, whether it’s for a celebration, a
              brand, or a personal project.
            </p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea'] text-[#b9900d]">
              <img src={icon1} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">CALLIGRAPHY</h1>
            </div>
            <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize">
              Canvas paintings • Prints
            </p>
            <p className="text-[#987300] leading-[26px]  ">
              Elegant hand-crafted Arabic calligraphy on canvas, or as framed
              prints. With a focus on detail and aesthetics, the calligraphy
              pieces add a refined and timeless element as décor or gift.
            </p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px]  font-bold font-['Maghfirea'] text-[#b9900d]">
              <img src={icon3} alt="" loading="lazy" />
              
              <h1 className="tracking-[3px]">3D VISUALIZATION</h1>
            </div>
            <p className="text-[14px] md:text-[17px] font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
              3D Models and Visualization for Interior Spaces
            </p>
            <p className="text-[#987300] leading-[26px]  ">
              Bringing interior ideas to life with realistic 3D models and
              visualizations. 3D services provide a clear and immersive look of
              the space before implementation—ideal for making informed design
              decisions.
            </p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px]  font-bold font-['Maghfirea'] text-[#b9900d]">
              <img src={icon4} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">Interior Design Consultation</h1>
            </div>
            <p className="text-[14px] md:text-[17px] font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
              Concept development • Mood boards • CAD • 3D • Interior Styling
            </p>
            <p className="text-[#987300] leading-[26px]  ">
              A comprehensive design consultation service that includes concept
              development, curated mood boards, technical CAD drawings, 3D
              renderings, and tailored interior styling. A guide through the
              entire creative process to design spaces that feel both functional
              and beautifully personal.
            </p>
          </div>
        </div>

        {/* quote */}
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
        <div className="text-center max-w-[615px] mx-auto py-20 px-2.5">
          <p className="font-medium font-[Ubuntu] text-[#b9900d] text-[19px] mb-8">
           Looking to create something unique together? Reach out and let's make it happen.
          </p>
          <div className="flex">
            <Link
              className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200 uppercase"
              to="/contact"
            >
              get a quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
