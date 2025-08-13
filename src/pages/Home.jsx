import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";
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
        className="parallax"
        layers={[
          // Bottom layer (fixed)
            {
            speed: -30,
            children: <img src={middle} alt="Middle layer" 
            
            className="parallax-image" />,
          },
           {
            speed: -30,
            children: 
           <HeroText />
            
            // className="parallax-image" />,
          },
          {
            speed: -30,
            
            children: <img src={bottom} alt="Bottom layer" 
            
            className="parallax-image" />,
          },
         
          // Top layer (scrolls faster)
          {
            // speed: 0,
            children: <img src={top} alt="Top layer" className="parallax-image"
            //  style={{ transform: "translateY(-100px)" }}
              />,
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
