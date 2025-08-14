import React from "react";
import { Link } from "react-router-dom";
import icon1 from "../assets/calligraphy.png";
import icon2 from "../assets/illu.png";
import icon3 from "../assets/3d.png";
import icon4 from "../assets/staircase.png";

const Services = () => {
  return (
    <div className="  bg-[#FFFFF0]">
      <div className="max-w-[1000px] pt-40  mx-auto">
        {/* header */}

        <div className="text-center max-w-[615px] mx-auto">
          <h1 className="text-[60px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif] uppercase">
            services
          </h1>
          <p className="font-medium font-[Ubuntu] text-[#b9900d] text-[19px]">
            Develop your passion project with eye catching branding, packaging,
            web design & illustrations.{" "}
          </p>
          <br />
        </div>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>

        {/* services */}
        <div className="my-12 mx-auto grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] items-stretch">
          <div className="p-5 grid gap-y-6">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-[Flaviotte] text-[#b9900d]">
              <img src={icon1} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">calligraphy</h1>
            </div>
            <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
              Logo & Identity • Style Guide • Packaging • Art Direction • Design
              Research
            </p>
            <p className="text-[#987300] leading-[26px]">Building a brand visually always starts with a logo. When collaborating together we’ll hone in on a concept that is both eye-catching and represents the brand’s value and purpose. I can provide services from logo design, to a full identity system, which entails typography styles, colour palettes, brand elements, photography, etc. Along with developing application rules to how the identity would live in a physical and digital environment.</p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-[Flaviotte] text-[#b9900d]">
              <img src={icon2} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">calligraphy</h1>
            </div>
            <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
              Logo & Identity • Style Guide • Packaging • Art Direction • Design
              Research
            </p>
            <p className="text-[#987300] leading-[26px]  min-h-[182px]">Building a brand visually always starts with a logo. When collaborating together we’ll hone in on a concept that is both eye-catching and represents the brand’s value and purpose. I can provide services from logo design.</p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px] font-bold font-[Flaviotte] text-[#b9900d]">
              <img src={icon3} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">3D Visualisation</h1>
            </div>
            <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
              Logo & Identity • Style Guide • Packaging • Art Direction • Design
              Research
            </p>
            <p className="text-[#987300] leading-[26px]  min-h-[182px]">If you are looking for a new website with a brand roll out, or need a refresher for your current website, I have experience working with custom website builders such as Webflow, and/or could provide design and set up sites, such as Shopify, SquareSpace or Wix.</p>
          </div>

          <div className="p-5 grid gap-y-3">
            <div className="flex gap-[10px] items-center uppercase text-2xl md:text-[30px]  font-bold font-[Flaviotte] text-[#b9900d]">
              <img src={icon4} alt="" loading="lazy" />
              <h1 className="tracking-[3px]">Interior Design Consultation</h1>
            </div>
            <p className="text-[14px] md:text-[17px] font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d]">
              Logo & Identity • Style Guide • Packaging • Art Direction • Design
              Research
            </p>
            <p className="text-[#987300] leading-[26px]  min-h-[182px]">With social media and branding it is always key to keep consistent engagement with your platforms. I provide guidance with developing a social media guideline, and creating content that is impactful and will help communicate the brand’s goals and services.</p>
          </div>
        </div>


{/* quote */}
<div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
<div className="text-center max-w-[615px] mx-auto py-20 px-2.5">
     <p className="font-medium font-[Ubuntu] text-[#b9900d] text-[19px] mb-8">
            Interested in working together, or you have a unique project in mind, feel free to contact me.
          </p>
          <div className="flex">
        <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200 uppercase">
          get a quote
        </Link>
      </div>
</div>
      </div>
    </div>
  );
};

export default Services;
