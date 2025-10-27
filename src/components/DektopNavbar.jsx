import React from "react";
import { Link } from "react-router-dom";
import HoverStroke from "./HoverStroke";
const DektopNavbar = () => {
  const links = [
    "Home",
    "About",
    "Works",
    "Logo",
    "Shop",
    "Services",
    "Contact",
  ];

  return (
    <nav>
      <ul className="hidden sm:flex justify-around py-5 lg:max-w-[840px] lg:mx-auto text-[#d4af37] font-normal text-[18px] lg:text-[26px] lg:font-medium tracking-[3px] font-['Maghfirea',sans-serif] h-[84px] items-center">
        {links.map((link) => (
          <li
            key={link}
            className={`${link === "Logo" ? "mx-16 my-0 relative" : ""}`}
          >
            <Link
              to={
                link === "Logo" || link === "Home"
                  ? "/"
                  : `/${link.toLowerCase()}`
              }
              className={`relative ${
                link === "Logo"
                  ? "flex items-center justify-center w-[94px] h-[94px]"
                  : "inline-block group hover:font-bold"
              }`}
            >
              {link === "Logo" ? (
                <>
                  <img
                    src="/logo1.webp"
                    alt="logo"
                    className="absolute h-[94px] rounded-full"
                  />

                  <div className="relative"></div>
                  <span className="absolute z-10 top-7 lg:top-5 left-[33px]">
                    A
                  </span>
                  <span className="absolute top-9 lg:top-8 left-[50px]">N</span>
                </>
              ) : (
                <span className="relative z-10">{link}</span>
              )}

              {link === "Logo" ? "" : <HoverStroke />}
            </Link>
          </li>
        ))}

      </ul>
    </nav>
  );
};

export default DektopNavbar;
