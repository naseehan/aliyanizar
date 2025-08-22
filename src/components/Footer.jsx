import React from "react";
import icon2 from "../assets/social/instagram.png";
import icon3 from "../assets/social/linkedin.png";
import icon4 from "../assets/social/behance.png";


const Footer = () => {
  return (
    <div className=" relative bg-[#FFFFF0]">
      <div className="h-[3px] bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      <div className="grid justify-center py-10 gap-8">
        <div className="flex justify-center items-center gap-[30px]">

          <a href="https://www.instagram.com/aliyanizarstudio_art">
            <img
              src={icon2}
              alt="instagram"
              loading="lazy"
              className="cursor-pointer"
            />
          </a>

          <a href="https://www.linkedin.com/in/aliyanizar-10351n5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <img
              src={icon3}
              alt="linkedin"
              loading="lazy"
              className="cursor-pointer"
            />
          </a>

          <a href="https://www.behance.net/AliyaNizar_Designs">
            <img
              src={icon4}
              alt="behance"
              loading="lazy"
              className="cursor-pointer"
            />
          </a>
          
        </div>
        <p className="text-[#b9900d]">
          ©2025 aliyanizarstudio. All Rights Reserved
        </p>
      </div>
      
    </div>
  );
};

export default Footer;
