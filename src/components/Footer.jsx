import React from "react";
import icon2 from "../assets/social/instagram.webp";
import icon3 from "../assets/social/linkedin.webp";
import icon4 from "../assets/social/behance.webp";


const Footer = () => {
  return (
    <div className=" relative bg-[#FFFFF0]">
            <img src="/divider.webp" alt="divider" className="h-[45px] w-[600px] mx-auto"/>

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
