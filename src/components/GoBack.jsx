import React from 'react'
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
 const navigate = useNavigate();
  const handleClick = () => {
   navigate(-1)
  };

  return (
   <div className="absolute sm:fixed top-17 sm:top-27 left-2.5 sm:left-[35px] z-40">
        <button
        onClick={handleClick}
          className="text-center relative text-black text-xl font-semibold group flex sm:h-[50px] sm:w-[50px] h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_0_0_4px_rgba(180,160,255,0.25)] transition-all duration-300 ease-in-out hover:w-[140px] hover:rounded-[50px] hover:bg-[#D4AF37] cursor-pointer overflow-hidden"
          type="button"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
              className='transition-transform duration-300 ease-in-out group-hover:-translate-x-[200%]  bg-[#D4AF37] rounded-xl h-12 w-[20px] flex items-center justify-center sm:absolute left-3 top-[1px]  z-10'
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#fff"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#fff"
              ></path>
            </svg>

            <span
    className="absolute bottom-[-20px] text-white text-[0px] transition-all duration-300 ease-in-out group-hover:static group-hover:text-[13px] group-hover:opacity-100"
  >
    Go Back
  </span>
        </button>
      </div>
  )
}

export default GoBack
