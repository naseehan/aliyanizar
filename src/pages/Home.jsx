import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import top from "../assets/top.png"
import bottom from "../assets/bottom.png"
import middle from "../assets/middle.png"
import "../App.css"
import HeroText from "../components/HeroText";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import Projects from "../components/Projects";
import Services from "../components/Services";
import ContactSection from "../components/ContactSection";

const Home = () => {
 

  return (
  <>
      <div style={{position: "relative"}} className="parallaxWrapper">
        <ParallaxBanner
        className="parallax aspect-[2/1]"
        layers={[
          // Bottom layer (fixed)
            {
            // speed: -30,
            // children: <img src={middle} alt="Middle layer" 
            
            // className="parallax-image " />,
            image: middle, speed: -30
          },
           {
            speed: -30,
            children: 
           <HeroText />
            
            // className="parallax-image" />,
          },
          {
            // speed: -30,
            
            // children: <img src={bottom} alt="Bottom layer" 
            
            // className="parallax-image " />,
             image: bottom, speed: -30
          },
         
          // Top layer (scrolls faster)
          {
            // speed: 1,
            // children: <img src={top} alt="Top layer" className="parallax-image "/>,
             image: top, speed: 0
          },
        ]}
        style={{ height: "701px" }}
      />
      </div>
     


     <Slider />
     <AboutSection />
     <Projects />
     <Services />
     <ContactSection />
      </>
  )
};

export default Home;
