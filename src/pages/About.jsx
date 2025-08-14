import React from 'react'
import { Link } from 'react-router-dom'
import avatar from "../assets/aliya2.jpg"
import RotatingTextCircle from "../components/RotatingTextCircle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  return (
    <div className='bg-[#FFFFF0]'>
      <div className='max-w-[1000px] pt-30 mx-auto'>

{/* about section */}
  <div
      className="about-me-section"
    //   ref={aboutRef}
    >
      {/* <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div> */}
      <div
        className="grid lg:w-[1000px] my-12 mx-auto
 items-center lg:grid-cols-2 gap-[60px] grid-cols-1"
      >
        <div className="grid gap-5 px-4 lg:px-0 text-center lg:text-start">
          <h1
            className="text-[60px] font-bold font-[Flaviotte] tracking-[3px] text-[#b9900d]
"
          >
            HELLO!
          </h1>
          <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d] mx-auto">
            I am Aliya Nizar,
            <br />
            a Dubai-based freelance artist and interior designer. Here, you'll
            find a selection of projects that have defined my creative path.
            Currently, I'm at my desk crafting and curating new experiences.
            <br />
          </p>
          <p className='text-[#b9900d]'>Growing up, I watched an endless amount of animations and was always in awe of beautifully illustrated books, which ended up paving my path to becoming a designer and illustrator. When I'm away from my laptop, I am busy being a cat mom, a video gaming nerd and trying to get outside as much as possible, to enjoy the outdoors.</p>
        
        </div>

        <div className="h-[350px] w-[350px] md:h-[480px] md:w-[480px] mx-auto  relative">
          <img
            src={avatar}
            alt="author"
            loading="lazy"
            className="h-full w-full rounded-full object-cover
"
          />
          <div
            className="absolute top-[-22px] right-[-22px]
"
          >
            <RotatingTextCircle />
          </div>
        </div>
      </div>
      <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>
    </div>


      </div>
    </div>
  )
}

export default About
