import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spinning from "../assets/spinning-circle.png"

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {

  const form = useRef();
  const contactRef = React.useRef()



  useGSAP(() => {
    gsap.fromTo(
      contactRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 100%",
          toggleActions: "play none none none", // play only once
        },
      }
    );
  }, []);



  return (
    <div className="bg-[#FFFFF0] relative">
      <div className="hidden md:block">
              <img src={spinning} alt="spinning image" loading="lazy" className="absolute w-[200px] bottom-5 left-0" />
            </div>
      <div className="invisible">services</div>

      <div className="max-w-[1000px] grid px-4 lg:px-0 py-12 mx-auto lg:flex gap-12 lg:gap-[6rem] items-start" ref={contactRef}>

        <div className="grid max-w-[400px] basis-[40%] gap-5 ">
          <h1
            className="text-[50px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif] uppercase"
            id="heading"
          >
            Lets work together
          </h1>
          <p className="font-medium font-[Ubuntu] text-[#b9900d]">
            Feel free to leave me a message via the form, or you can get a hold
            of me at <strong>aliyanizar023@gmail.com</strong> 
            <br />
            <br />
          Lets create something beautiful and impactful.</p>
        </div>

        <div className="basis-[60%]">
          <form action="https://formsubmit.co/802d01dd2e487f17e9f0ebf88ae34b8c " method="POST" className="grid gap-3.5">
            <label htmlFor="name" className="text-[#b9900d]" >Name*</label>
            <input type="text" name="name" id="name" className=" border p-2.5" required maxLength={30}/>
            <label htmlFor="email" className="text-[#b9900d]">Email Address*</label>
            <input type="email" name="email" id="email" className=" border p-2.5" required maxLength={30}/>
            <label htmlFor="phone" className="text-[#b9900d]">Phone</label>
            <input type="text" name="phone" id="phone" className=" border p-2.5" maxLength={12} inputMode="numeric" />
            <label htmlFor="what" className="text-[#b9900d]">What's this regarding?*</label>
            <input type="text" name="what" id="what" className=" border p-2.5" required maxLength={100}/>
            <label htmlFor="message" className="text-[#b9900d]">Message*</label>
            <textarea type="text" name="message" id="message" className=" border p-2.5" required maxLength={300}/>
               <div className="flex py-13">
        <button type="submit"  className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200 uppercase">
          submit
        </button>
      </div>
          </form>
        
        </div>
      </div>

      {/* <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div> */}
      
    </div>
  );
};

export default ContactSection;