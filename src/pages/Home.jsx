import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import top from "../assets/top.png"
import bottom from "../assets/bottom.png"
import middle from "../assets/middle.png"
import bg from "../assets/bgwork.png"
import "../App.css"
import HeroText from "../components/HeroText";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import Projects from "../components/Projects";
import ServiceSection from "../components/ServiceSection";
import ContactSection from "../components/ContactSection";
const Home = () => {
 

  return (
  <>

      <div style={{position: "relative"}} className="parallaxWrapper">
        <ParallaxBanner
        className="parallax aspect-[2/1] h-screen sm:h-[600px] lg:h-[701px]"
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
