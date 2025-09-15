import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./murals.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { murals } from "./muralsDetails";

const animation = { duration: 30000, easing: (t) => t };

const Murals = () => {
  let navigate = useNavigate();
  //   const handleClick = (slug) => {
  //     let keyword = slug.toLowerCase().replace(/s\+/g, "-");
  //     navigate(`/works/artWorks/${keyword}`);
  //   };

  const headingRef = React.useRef();
  const buttonRef = React.useRef();
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keen slider setup
  const [sliderRef, instanceRef] = useKeenSlider({
    renderMode: "performance",
    loop: true,
    // origin: 'center',
    drag: true,
    slides: {
      perView: 1,
      spacing: 80,
    },
    // breakpoints: {
    //   "(max-width: 1024px)": {
    //     slides: {
    //       perView: 2,
    //       spacing: 16,
    //     },
    //   },
    //   "(max-width: 640px)": {
    //     slides: {
    //       perView: 1,
    //       spacing: 10,
    //     },
    //   },
    // },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    // updated(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation);
    // },
    // animationEnded(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation);
    // },
  });

  // Pause on hover
  //   React.useEffect(() => {
  //     if (!instanceRef.current) return;
  //     const sliderEl = instanceRef.current.container;

  //     const stop = () => instanceRef.current?.animator.stop();
  //     const resume = () =>
  //       instanceRef.current?.moveToIdx(
  //         instanceRef.current.track.details.abs + 5,
  //         true,
  //         animation
  //       );

  //     sliderEl.addEventListener("mouseover", stop);
  //     sliderEl.addEventListener("mouseleave", resume);

  //     return () => {
  //       sliderEl.removeEventListener("mouseover", stop);
  //       sliderEl.removeEventListener("mouseleave", resume);
  //     };
  //   }, [instanceRef]);

  return (
    <div className="bg-[#FFFFF0] pt-27 sm:pt-40">
      {/* heading */}
      <div className="pb-10 mx-auto text-center">
        <h1
          className="text-[50px] font-bold tracking-[5px] text-[#D4AF37] font-['Maghfirea',sans-serif] uppercase"
          id="heading"
          ref={headingRef}
        >
          murals
        </h1>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
      </div>

      {/* carousel */}
      <div ref={sliderRef} className="keen-slider murals-slider py-8" id="slider">
        {murals.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide number-slide1 relative  cursor-pointer"
          >

            <div className="w-full h-full aspect-[4/3] overflow-hidden group relative">
              <img
                className="h-[232px] lg:h-[500px] w-full object-contain transition-opacity duration-500 sm:group-hover:opacity-0"
                src={item.img}
                loading="lazy"
                alt="artwork"
              />
              <img
                className="hidden sm:block h-[218px] mt-2.5  sm:h-[500px] w-full object-contain sm:absolute top-0 left-0 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100 "
                src={item.hoverImg}
                loading="lazy"
                alt="artwork"
              />
            </div>

            {/* Caption (always visible) */}
            <div className="px-4 py-3 text-center mt-2 rounded h-auto">
              <h3 className="text-[30px] font-bold font-['Maghfirea',sans-serif] tracking-[4px] text-[#b9900d] uppercase">
                {item.name}
              </h3>
              <p className="text-[18px] font-medium text-[#b9900d]">
                {item.categories}
              </p>
              <p className="text-[18px] font-medium text-[#b9900d]">
                {item.size}
              </p>
            </div>

          </div>
        ))}

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

      {/* overlay */}
      {/* {murals.map(item => (
            <div
              className=" bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white"
            >
              <h3 className="text-[40px] font-bold font-[Flaviotte] tracking-[4px] text-white uppercase">
                {item.name}
              </h3>
              <p className="text-[20px] font-semibold text-center">{item.categories}</p>
               <p className="text-[20px] font-semibold text-center">{item.size}</p>
            </div>
))} */}
    </div>
  );
};

export default Murals;

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
