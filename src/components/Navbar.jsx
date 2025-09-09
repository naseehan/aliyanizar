import React, { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../assets/hamburger.webp";
import "../App.css";
import DesktopNavbar from "./DektopNavbar";

const Navbar = () => {
  const [open, isOpen] = useState(false);

  const handleClick = () => {
    isOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#004953] fixed z-[99] top-0 left-0 right-0 w-screen">
      {/* desktop nav */}
      <DesktopNavbar />

      {/* mobile nav */}
      <div className="sm:hidden relative h-[60px]">
        <img
          src={hamburger}
          alt="menu"
          className="py-3.5 cursor-pointer absolute right-2"
          onClick={handleClick}
          loading="lazy"
        />
        <nav
          className={`overflow-hidden transition-all  duration-500 ease-in-out absolute mt-[60px] bg-[#004953] ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul
            className={`grid gap-4 justify-start py-12 px-[9px]  text-[#D4AF37] font-normal text-[30px] text-end tracking-[3px] font-[Maghfirea,sans-serif] `}
          >
            <li className="" onClick={handleClick}>
              <Link to="/">Home</Link>
            </li>
            <div className="h-px bg-[#D4AF37] min-w-[96vw] max-w-[1000px]"></div>

            <li className="" onClick={handleClick}>
              <Link to="/works">Works</Link>
            </li>

            <div className="h-px bg-[#D4AF37] min-w-[96vw] max-w-[1000px]"></div>

            <li className="" onClick={handleClick}>
              <Link to="/about">About</Link>
            </li>
            <div className="h-px bg-[#D4AF37] min-w-[96vw] max-w-[1000px]"></div>

            <li className="" onClick={handleClick}>
              <Link to="/shop">Shop</Link>
            </li>
            <div className="h-px bg-[#D4AF37] min-w-[96vw] max-w-[1000px]"></div>

            <li className="" onClick={handleClick}>
              <Link to="/services">Services</Link>
            </li>
            <div className="h-px bg-[#D4AF37] min-w-[96vw] max-w-[1000px]"></div>
            <li className="" onClick={handleClick}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="h-px bg-[#D4AF37] mx-auto max-w-[840px]"></div>
    </div>
  );
};

export default Navbar;
