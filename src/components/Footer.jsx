import React from "react";
import icon1 from "../assets/social/dribble.png";
import icon2 from "../assets/social/instagram.png";
import icon3 from "../assets/social/linkedin.png";
import icon4 from "../assets/social/behance.png";


const Footer = () => {
  return (
    <div>
       <div className="h-[3px] bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
    <div className="bg-[#FFFFF0] grid justify-center py-10 gap-8">
    <div className="flex justify-center items-center gap-[30px]">
      <img src={icon1} alt="dribble"  loading="lazy"/>
      <img src={icon2} alt="instagram"  loading="lazy"/>
      <img src={icon3} alt="linkedin"  loading="lazy"/>
      <img src={icon4} alt="behance" loading="lazy" />
    </div>
    <p className="text-[#b9900d]">©2025 aliyanizarstudio. All Rights Reserved</p>
    </div>
  
    </div>
  );
};

export default Footer;
