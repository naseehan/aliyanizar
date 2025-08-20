import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import bg from "../assets/bgwork.png"
import "../App.css"
import HeroText from "../components/HeroText";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import Projects from "../components/Projects";
import ServiceSection from "../components/ServiceSection";
import ContactSection from "../components/ContactSection";
import circle from "../assets/spinning-circle.png"

const Home = () => {


  return (
  <>

      <div className="parallaxWrapper relative">
        <ParallaxBanner
        className="parallax aspect-[2/1] h-screen"
        layers={[
          // Bottom layer (fixed)
          //   {
          //   image: middle, speed: -30
          // },
           {
            speed: -30,
            children: 
           <HeroText />
            
          },
          // {
            
          //   // className="parallax-image " />,
          //    image: bottom, speed: -30
          // },
         
          // Top layer (scrolls faster)
          {
             image: bg, speed: -2
          },
        ]}
      />
      <img src={circle} alt="spinning circle" className="absolute w-[170px] top-[30%] left-[10%] rounded-full animate-spin-slow hidden lg:block" loading="lazy"/>
       <img src={circle} alt="spinning circle" className="absolute w-[170px] top-[30%] right-[10%] rounded-full animate-spin-slow2 hidden lg:block" loading="lazy"/>
      </div>
     

     <Slider />
     <AboutSection />
     <Projects />
     <ServiceSection />
     <ContactSection />
      </>
  )
};

export default Home;
