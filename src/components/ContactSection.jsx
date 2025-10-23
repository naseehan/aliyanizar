import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const contactRef = React.useRef();

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      what: e.target.what.value,
      message: e.target.message.value,
    };

    try {
      await toast.promise(
        fetch("https://aliyanizar.onrender.com/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then((res) => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        }),
        {
          pending: "⏳ Sending your message...",
          success: "✅ Form submitted successfully!",
          error: "❌ Something went wrong. Please try again!",
        }
      );

      e.target.reset();
    } catch (err) {
      if (err.message === "Too many requests") {
        toast.error("⏱️ You're sending messages too fast. Please wait a minute before trying again.");
      } else {
        toast.error("❌ Something went wrong. Please try again!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFFF0] relative">
      <div className="hidden md:block">
        <img
          src="/spinning-circle.webp"
          alt="spinning"
          className="absolute w-[310px] bottom-5 left-[-69px]"
        />
      </div>
      <div className="invisible">services</div>

      <div
        className="max-w-[1000px] grid px-4 lg:px-0 py-12 mx-auto lg:flex gap-12 lg:gap-[6rem] items-start"
        ref={contactRef}
      >
        <div className="grid max-w-[400px] basis-[40%] gap-5 ">
          <h2
            className="text-[50px] font-bold tracking-[3px] text-[#D4AF37] font-['Maghfirea',sans-serif] uppercase"
            id="heading"
          >
            Let’s Collaborate & Create
          </h2>
          <p className="font-medium font-[Ubuntu] text-[#b9900d]">
            Whether you’re looking to add art to your life, style your space, or
            visualize a new idea—we’d love to hear from you.{" "}
          </p>
          {/* <br /> */}
          <p className="font-medium font-[Ubuntu] text-[#b9900d]">
            Contact me at <strong>Info@aliyanizarstudio.com</strong>{" "}
          </p>
          <p className="font-medium font-[Ubuntu] text-[#b9900d]">
            Or feel free to leave a message via the form.
          </p>
        </div>
        <div className="basis-[60%]">
          <form onSubmit={handleSubmit} method="POST" className="grid gap-3.5">
            <label htmlFor="name" className="text-[#b9900d]">
              Name*
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className=" border p-2.5"
              required
              maxLength={30}
            />
            <label htmlFor="email" className="text-[#b9900d]">
              Email Address*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className=" border p-2.5"
              required
              maxLength={30}
            />
            <label htmlFor="phone" className="text-[#b9900d]">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className=" border p-2.5"
              maxLength={12}
              inputMode="numeric"
            />
            <label htmlFor="what" className="text-[#b9900d]">
              What's this regarding?*
            </label>
            <input
              type="text"
              name="what"
              id="what"
              className=" border p-2.5"
              required
              maxLength={100}
            />
            <label htmlFor="message" className="text-[#b9900d]">
              Message*
            </label>
            <textarea
              type="text"
              name="message"
              id="message"
              className=" border p-2.5"
              required
              maxLength={300}
            />
            <div className="flex py-13">
              <button
                type="submit"
                value="send"
                disabled={loading}
                className={`text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] transition-colors duration-200 uppercase
    ${
      loading
        ? "bg-gray-300 cursor-not-allowed"
        : "text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff]"
    }`}
              >
                {loading ? "Submitting..." : "Submit"}
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
