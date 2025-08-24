import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import bg from "../assets/bgwork.png";
import "../App.css";
import HeroText from "../components/HeroText";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import Projects from "../components/Projects";
import ServiceSection from "../components/ServiceSection";
import ContactSection from "../components/ContactSection";
import circle from "../assets/spinning-circle.png";
import ToTop from "../components/ToTop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const image1 = React.useRef();
  const image2 = React.useRef();

   useGSAP(() => {
    gsap.fromTo(
      image1.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "bounce.in",
        scrollTrigger: {
          trigger: image1.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);


   useGSAP(() => {
    gsap.fromTo(
      image2.current,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "bounce.in",
        scrollTrigger: {
          trigger: image2.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  return (
    <div className="relative">
      <div className="parallaxWrapper relative">
        <ParallaxBanner
          className="parallax aspect-[2/1] h-screen"
          layers={[
          
            {
              speed: -30,
              children: <HeroText />,
            },
           
            {
              image: bg,
              speed: -2,
            },
          ]}
        />
        <div ref={image1} className="absolute w-[170px] top-[30%] left-[10%]">
        <img
          
          src={circle}
          alt="spinning circle"
          className=" rounded-full animate-spin-slow hidden lg:block"
          loading="lazy"
          style={{ willChange: "transform, opacity" }}
        />
        </div>
        <div ref={image2} className="absolute w-[170px] top-[30%] right-[10%] ">
        <img
          src={circle}
          alt="spinning circle"
          className="rounded-full animate-spin-slow2 hidden lg:block"
          loading="lazy"
        />
        </div>
      </div>

      <Slider />
      <AboutSection />
      <Projects />
      <ServiceSection />
      <ContactSection />
      <ToTop />
    </div>
  );
};

export default Home;
