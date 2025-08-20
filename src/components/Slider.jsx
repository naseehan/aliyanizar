import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Slider.css";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animation = { duration: 30000, easing: (t) => t };
const Slider = () => {

let navigate = useNavigate()
const handleClick = (slug) => {
  navigate(`artworkdetails/${slug}`)
}

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
          toggleActions: "play none none none", // play only once
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
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: true,
    slides: {
      perView: 3, // show 3 slides at a time
      spacing: 20, // gap between slides in px
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

  return (
    <div className="bg-[#FFFFF0]">
      {/* heading */}

      <div className="py-20 mx-auto text-center">
        <h1
          className="text-[50px] font-bold tracking-[5px] text-[#D4AF37] font-[Flaviotte,sans-serif]"
          id="heading"
          ref={headingRef}
        >
          ARTWORKS
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

      {/* carousel */}

      <div ref={sliderRef} className="keen-slider py-8" id="slider">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="keen-slider__slide number-slide1 relative hover:-translate-y-5 group cursor-pointer"
            onClick={() => handleClick("momma-and-bear")}
          >
            <img
              className="h-full w-full object-cover"
              src="https://cdn.pixabay.com/photo/2025/01/07/21/44/cats-9317796_1280.jpg"
              alt=""
            />
            <div
              className="
                   
                   absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white opacity-0 pointer-events-none
             group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300"
            >
              <h3
                className=" text-[40px] font-bold font-[Flaviotte] tracking-[4px] text-white
"
              >
                Artwork Title
              </h3>
              <p
                className="text-[20px] font-semibold
 text-center"
              >
                LEARN MORE
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex pb-20" ref={buttonRef}>
        <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200" to="/works">
          MORE WORK
        </Link>
      </div>
    </div>
  );
};

export default Slider;
