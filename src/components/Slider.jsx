import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Slider.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {products} from "../pages/shopItems"

gsap.registerPlugin(ScrollTrigger);

const animation = { duration: 30000, easing: (t) => t };

const Slider = () => {

  let navigate = useNavigate();
  const handleClick = (slug) => {
    let keyword = slug.toLowerCase().replace(/s\+/g, "-");
    navigate(`/works/artWorks/${keyword}`);
  };

  const headingRef = React.useRef();
  const buttonRef = React.useRef();

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      buttonRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Keen slider setup
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    origin: 'center',
    drag: true,
    slides: {
      perView: 3,
      spacing: 80,
      
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });


  // Pause on hover
  React.useEffect(() => {
    if (!instanceRef.current) return;
    const sliderEl = instanceRef.current.container;

    const stop = () => instanceRef.current?.animator.stop();
    const resume = () =>
      instanceRef.current?.moveToIdx(
        instanceRef.current.track.details.abs + 5,
        true,
        animation
      );

    sliderEl.addEventListener("mouseover", stop);
    sliderEl.addEventListener("mouseleave", resume);

    return () => {
      sliderEl.removeEventListener("mouseover", stop);
      sliderEl.removeEventListener("mouseleave", resume);
    };
  }, [instanceRef]);


  return (
    <div className="bg-[#FFFFF0]">
      {/* heading */}
      <div className="py-20 mx-auto text-center">
        <h1
          className="text-[50px] font-bold tracking-[5px] text-[#D4AF37] font-['Maghfirea',sans-serif]"
          id="heading"
          ref={headingRef}
        >
          ARTWORKS
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

      {/* carousel */}
      <div ref={sliderRef} className="keen-slider home-slider py-8" id="slider">
        {products.map(item => (
          <div
            key={item.id}
            className="keen-slider__slide number-slide1 relative hover:-translate-y-5 group cursor-pointer"
            onClick={() => handleClick(item.name)}
          >
            <div className="w-full h-full aspect-[4/3] overflow-hidden bg-white">
            <img
              className="h-full w-full object-contain"
              src={item.img}
              loading="lazy"
              alt="artwork"
            />
            </div>

            {/* overlay */}
            <div
              className="absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white opacity-0 pointer-events-none
             group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300"
            >
              <h3 className="text-[40px] font-bold font-[Flaviotte] tracking-[4px] text-white uppercase">
                {item.name}
              </h3>
              <p className="text-[20px] font-semibold text-center">LEARN MORE</p>
            </div>
          </div>
        ))}
      </div>

      {/* button */}
      <div className="flex pb-20" ref={buttonRef} >
        <Link
          className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"
          to="/works"
        >
          MORE WORKS
        </Link>
      </div>
    </div>
  );
};

export default Slider;
