import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import hamburger from "../assets/hamburger.png"

const Navbar = () => {

const [open, isOpen] = useState(false)

const handleClick = () => {
   isOpen((prev) => !prev)
}

  return (
    <div className="bg-[#004953] fixed z-[99] top-0 left-0 right-0">
    <nav>
        <ul className="hidden sm:flex justify-around py-5 lg:max-w-[840px] lg:mx-auto text-[#D4AF37] font-normal text-[18px] lg:text-[26px] lg:font-bold tracking-[3px] font-['Maghfirea',sans-serif]">
            <li className=''>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/work">Work</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
             <li className='mx-16 my-0'>
                <Link to="/">Logo</Link>
            </li>
            <li>
                <Link to="/services">Services</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
 </nav>
{/* mobile nav */}
<div>
<img src={hamburger} alt="" className='sm:hidden' onClick={handleClick}/>
<nav>
 <ul className={`sm:hidden gap-4 justify-start py-12 px-4  text-[#D4AF37] font-normal text-[30px]  tracking-[3px] font-[Maghfirea,sans-serif] ${open ? 'grid' : 'hidden'}`} >
            <li className='' onClick={handleClick}>
                <Link to="/">Home</Link>
            </li>
            <div className="h-px bg-[#D4AF37] w-[452px] max-w-[1000px]"></div>
            <li  className='' onClick={handleClick}>
                <Link to="/work">Work</Link>
            </li>
            <div className="h-px bg-[#D4AF37] w-[452px] max-w-[1000px]"></div>
            <li className='' onClick={handleClick}>
                <Link to="/about">About</Link>
            </li>
            <div className="h-px bg-[#D4AF37] w-[452px] max-w-[1000px]"></div>
            <li className='' onClick={handleClick}>
                <Link to="/services">Services</Link>
            </li>
            <div className="h-px bg-[#D4AF37] w-[452px] max-w-[1000px]"></div>
            <li className='' onClick={handleClick}>
                <Link to="/contact">Contact</Link>
            </li>
            
        </ul>
        </nav>
</div>

        <div className="h-px bg-[#D4AF37] mx-auto max-w-[840px]"></div>
   
    </div>

  )
}

export default Navbar
