import React from "react";
import avatar from "../assets/aliya.webp";
import diamond from "../assets/diamond.webp"

const About = () => {
  return (
    <div className="bg-[#FFFFF0]">
      <div className="max-w-[1000px] pt-30 mx-auto">
        {/* about section */}
        <div
          className="about-me-section"
          //   ref={aboutRef}
        >
          {/* <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div> */}
          <div
            className="grid lg:w-[1000px] py-12 mx-auto
 items-center lg:grid-cols-2 gap-[60px] grid-cols-1"
          >
            <div className="grid gap-5 px-4 lg:px-0 text-center lg:text-start">
              <h1
                className="text-[60px] font-bold font-['Maghfirea',sans-serif] tracking-[3px] text-[#c16d3c]
"
              >
                HELLO<span className="font-[Ubuntu]">!</span>
              </h1>
              <p className="text-[14px] md:text-[17px]  font-semibold font-[Ubuntu]  max-w-[474px] text-[#b9900d] mx-auto">
                I am Aliya Nizar,
                <br />
                a Dubai-based freelance artist and interior designer.
                <br />
                <br />
                Here, you'll find a selection of projects that have defined my
                creative path.
                <br />
                <br />
                Currently, I'm at my desk crafting and curating new experiences.
                <br />
              </p>
              <p className="text-[#b9900d]">
                I’m an Indian artist based in the UAE, where I grew up and
                continue to draw inspiration from my surroundings. My work is a
                blend of art and design—personal expressions that take shape
                through digital and hand-drawn illustrations, as well as
                paintings across diverse media, including canvas, wood, paper,
                and fabric.
              </p>
              <p className="text-[#b9900d]">
                Alongside my art practice, I bring experience as an interior
                designer, having worked as a junior designer, art designer, and
                project coordinator. My expertise lies in concept development,
                space planning, 3D visualization, and material sourcing. Over
                the years, I’ve contributed to projects in retail, residential,
                hospitality, and commercial spaces, each shaping my creative
                approach and design sensibility.
              </p>
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
                className="absolute top-[-42px] right-[30px]
"
              >
                <img src={diamond} alt="diamond shape" loading="lazy" height={130} width={130}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
