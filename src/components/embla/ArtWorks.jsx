import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import "./embla.css";
import { products } from "../../pages/shopItems";
import { Link, useNavigate } from "react-router-dom";
import GoBack from "../GoBack";
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const ArtWorks = (props) => {
  const options = { loop: true };
  const SLIDE_COUNT = 5;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  let navigate = useNavigate();
  const handleClick = (slug) => {
    let keyword = slug.toLowerCase().replace(/s\+/g, "-");
    navigate(`${keyword}`);
  };

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView(true);
    const selectedIndex = emblaApi.selectedScrollSnap();
    const isScrollEvent = eventName === "scroll";

    // check screen is whether mobile or not
    const isMobile = window.innerWidth <= 640;

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }
        let tweenValue;
        if (isMobile) {
          tweenValue = 1.4 - Math.abs(diffToTarget * tweenFactor.current);
        } else {
          tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        }
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];

        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  let length = products.length;
  let perPage = 9;
  let totalPage = Math.ceil(length / perPage);

  let pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const [currentPage, setCurrentPage] = useState(1);
  const [firstProduct, setFirstProduct] = useState(0);
  const [lastProduct, setLastProduct] = useState(9);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setFirstProduct((prev) => prev - 9);
      setLastProduct((prev) => prev - 9);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
      setFirstProduct((prev) => prev + 9);
      setLastProduct((prev) => prev + 9);
    }
  };

  const handleChangeProduct = (page) => {
    setCurrentPage(page);
    setLastProduct(page * 9);
    setFirstProduct((page - 1) * 9);
  };

  return (
    <div className="bg-[#FFFFF0] pt-27 sm:pt-40 relative">
      <GoBack />
      {/* header */}
      <div className="text-center max-w-[615px] mx-auto">
        <h1 className="text-[60px] font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase">
          artworks
        </h1>
        <br />
      </div>

      <div className="embla pb-16">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {products.map((item) => (
              <div className="embla__slide" key={item.id}>
                <div className="embla__slide__number">
                  <button onClick={() => handleClick(item.name)}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>

      <div className="max-w-[1000px] mx-auto grid [grid-template-columns:repeat(auto-fit,minmax(293px,1fr))] gap-[40px] pt-[95px]">
        {products.slice(firstProduct, lastProduct).map((item) => (
          <div key={item.id}>
            <div
              className="grid justify-center items-center  text-center gap-[3%] md:gap-x-[240px] pb-[39px] min-h-[570px]
            "
            >
              <div className="relative flex justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[300px] h-[380px] object-contain bg-white"
                />
                <button
                  onClick={() => handleClick(item.name)}
                  className="absolute inset-0"
                ></button>
              </div>
              <div>
                <h1 className="uppercase text-2xl md:text-[30px] font-bold font-['Maghfirea'] text-[#b9900d] tracking-[3px]">
                  {item.name}
                </h1>
                <p className="text-[#b9900d] capitalize text-[14px] md:text-[17px]  font-medium font-[Ubuntu]">
                  {item.dimensions}
                </p>
              </div>
            </div>
            <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
          </div>
        ))}
      </div>
      {/* pagination */}
      <div className="flex max-w-[1000px] mx-auto justify-center mt-[70px] gap-5">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          ←{" "}
        </button>
        <div className="flex gap-5">
          {pages.map((item) => (
            <span
            key={item}
              className={`${currentPage == item ? "bg-[#d8d8d8]" : ""} p-2.5`}
              onClick={() => handleChangeProduct(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <button onClick={handleNext} disabled={currentPage === totalPage}>
          {" "}
          →{" "}
        </button>
      </div>
    </div>
  );
};

export default ArtWorks;
