import React, {Suspense, lazy} from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import "../App.css";
import HeroText from "../components/HeroText";
const Slider  = lazy(() => import("../components/Slider"));
const AboutSection = lazy(() => import ("../components/AboutSection"));
const Projects = lazy(() => import("../components/Projects"));
const ServiceSection = lazy(() => import("../components/ServiceSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
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
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.in",
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
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.in",
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
              image: "/bgwork.webp",
              speed: -2,
            },
          ]}
        />
        <div ref={image1} className="absolute w-[170px] top-[30%] left-[10%]">
        <img
          src="/spinning-circle.webp"
          alt="spinning circle"
          className=" rounded-full animate-spin-slow hidden lg:block"
          width="170"
        />
        </div>
        <div ref={image2} className="absolute w-[170px] top-[30%] right-[10%] ">
        <img
          src="/spinning-circle.webp"
          alt="spinning circle"
          className="rounded-full animate-spin-slow2 hidden lg:block"
          width="170"
        />
        </div>
      </div>

<Suspense fallback={<p>Loading ...</p>}>
      <Slider />
      <AboutSection />
      <Projects />
      <ServiceSection />
      <ContactSection />
      </Suspense>
      <ToTop />
    </div>
  );
};

export default Home;
