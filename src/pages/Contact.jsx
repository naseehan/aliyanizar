import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoBack from "../components/GoBack";
import { toast } from "react-toastify";

const Contact = () => {
  const location = window.location.href;
  let link = import.meta.env.VITE_LINK;

  const [loading, setLoading] = useState(false);

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative  bg-[#FFFFF0]">
      <GoBack />
      <div className="max-w-[1000px] pt-25 sm:pt-40 pb-10 mx-auto">
        {/* container */}
        <div className="grid gap-12">
          {/* header */}
          <div className="max-w-[360px] pl-4 lg:pl-0">
            <h1 className="text-[50px] font-bold tracking-[3px] text-[#c16d3c] font-[Maghfirea,sans-serif] uppercase">
              Let’s Collaborate & Create
            </h1>
            <br />
            <br />
            <p className="font-medium font-[Ubuntu] text-[#b9900d]">
              Whether you’re looking to add art to your life, style your space,
              or visualize a new idea—we’d love to hear from you.{" "}
            </p>

            <br />
            <p className="font-medium font-[Ubuntu] text-[#b9900d]">
              Contact me at <strong>Info@aliyanizarstudio.com</strong>{" "}
            </p>
            <p className="font-medium font-[Ubuntu] text-[#b9900d]">
              Or feel free to leave a message via the form.
            </p>
          </div>

          {/* form */}
          <div className="">
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] px-4 lg:px-0"
            >
              <input type="hidden" name="_next" value={location} />
              <div className="grid gap-2.5">
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
              </div>
              <div className="grid gap-2.5">
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
              </div>
              <div className="grid gap-2.5">
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
              </div>
              <div className="grid gap-2.5">
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
              </div>
              <div className="grid col-span-full gap-2.5">
                <label htmlFor="message" className="text-[#b9900d]">
                  Message*
                </label>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  className=" border p-2.5"
                  maxLength={300}
                  required
                />
              </div>
              <div className="flex py-16  mx-auto col-span-full">
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
      </div>
    </div>
  );
};

export default Contact;
