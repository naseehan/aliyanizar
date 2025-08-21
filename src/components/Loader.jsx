import React from "react";
import "./loader.css";
import logo from "../assets/logo.png";
export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFF0] z-50">
      <div className="relative flex items-center justify-center font-['Maghfirea',sans-serif] text-[#D4AF37] font-medium text-[50px]">

        <img src={logo} alt="Logo" className="w-40 h-40" />

        <span className="absolute z-10 top-8 left-[50px]">A</span>
        <span className="absolute top-14 left-[82px]">N</span>

        {/* Progress Circle */}
        <svg className="absolute w-48 h-48" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray="283" // circumference of circle
            strokeDashoffset="283" // fully hidden at start
            className="animate-draw"
          />
        </svg>
      </div>
    </div>
  );
}
