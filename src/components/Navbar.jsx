import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../assets/hamburger.webp";
import "../App.css";
import DesktopNavbar from "./DektopNavbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // lock scrolling when clicked outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isOpen]);

  let links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Works",
      path: "/works",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="bg-[#004953] fixed z-[80] top-0 left-0 right-0 w-screen ">
      {/* overlay for closing navbar when clicked outside */}
      <div
        className={`absolute inset-0 z-50 h-[100vh] ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={handleClick}
      ></div>
      {/* desktop nav */}
      <DesktopNavbar />

      {/* mobile nav */}
      <div className="sm:hidden relative h-[60px]">
        <img
          src={hamburger}
          srcSet="/hamburger1.png 2x"
          alt="menu"
          className="py-3.5 cursor-pointer absolute right-2"
          onClick={handleClick}
          loading="lazy"
        />
        <nav
          className={`overflow-hidden transition-all  duration-500 ease-in-out absolute mt-[60px] bg-[#004953] z-[60] ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="grid gap-4 justify-start py-12 px-[9px] text-[#D4AF37] font-normal text-[30px] text-end tracking-[3px] font-[Maghfirea,sans-serif]">

            {links.map((link) => (
              <React.Fragment key={link.name}>
                <li onClick={handleClick}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
                <li>
                  <div className="h-px bg-[#D4AF37] min-w-[96vw] max-w-[1000px]"></div>
                </li>
              </React.Fragment>
            ))}

          </ul>
        </nav>
      </div>

      <div className="h-px bg-[#D4AF37] mx-auto max-w-[840px]"></div>
    </div>
  );
};

export default Navbar;
