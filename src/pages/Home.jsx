import React, { useEffect, Suspense, lazy } from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import "../App.css";
import HeroText from "../components/HeroText";
const Slider = lazy(() => import("../components/Slider"));
const AboutSection = lazy(() => import("../components/AboutSection"));
const Projects = lazy(() => import("../components/Projects"));
const ServiceSection = lazy(() => import("../components/ServiceSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
import ToTop from "../components/ToTop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Title, Meta, Link } from 'react-head';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const image1 = React.useRef();
  const image2 = React.useRef();

  // ✅ Dynamically preload home images and clean up after leaving
  useEffect(() => {
    const imagesToPreload = [
      "/bgwork.webp",
      "/spinning-circle1.webp",
      "/logo.webp",
    ];

    // Create and append preload links
    const links = imagesToPreload.map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      document.head.appendChild(link);
      return link;
    });

    // ✅ Cleanup function: remove them from <head> on unmount
    return () => {
      links.forEach((link) => link.remove());
    };
  }, []);

  // ✅ Animations
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
<>
      <Title>Aliya Nizar Studio</Title>
      <Meta
        name="description"
        content="Aliya Nizar Studio showcases the work of Dubai-based artist and interior designer Aliya Nizar. Visitors can explore her curated portfolio, purchase prints and original artworks, or consult her for bespoke design proposals."
      />
      <Link rel="canonical" href="https://aliyanizarstudio.com/" />


    <div className="relative">
      <div className="parallaxWrapper relative">
        <ParallaxBanner
          className="parallax aspect-[2/1] h-screen"
          layers={[
            { speed: -30, children: <HeroText /> },
            // { image: "/bgwork.webp", speed: -2 },
          ]}
        />

        <div ref={image1} className="absolute w-[130px] top-[30%] left-[10%]">
          <img
            src="/spinning-circle1.webp"
            alt="spinning circle"
            className="rounded-full animate-spin-slow hidden lg:block"
          />
        </div>

        <div ref={image2} className="absolute w-[130px] top-[30%] right-[10%]">
          <img
            src="/spinning-circle1.webp"
            alt="spinning circle"
            className="rounded-full animate-spin-slow2 hidden lg:block"
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
    </>
  );
};

export default Home;
