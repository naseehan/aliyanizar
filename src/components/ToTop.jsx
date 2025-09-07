import React from 'react'

const ToTop = () => {

const handleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


  return (
    <div className='absolute bottom-[-2.9%] sm:bottom-[-4%] z-50 right-[2%] '>
      <button onClick={handleClick}
  className="group relative flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_0_0_4px_rgba(180,160,255,0.25)] transition-all duration-300 ease-in-out hover:w-[140px] hover:rounded-[50px] hover:bg-[#D4AF37] cursor-pointer overflow-hidden"
>
  <svg
    className="svgIcon w-[12px] transition-transform duration-300 ease-in-out group-hover:-translate-y-[200%]"
    viewBox="0 0 384 512"
  >
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 
         0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 
         14.3 32 32 32s32-14.3 32-32V141.2L329.4 
         246.6c12.5 12.5 32.8 12.5 
         45.3 0s12.5-32.8 0-45.3l-160-160z"
      fill="white"
    />
  </svg>

  <span
    className="absolute bottom-[-20px] text-white text-[0px] transition-all duration-300 ease-in-out group-hover:static group-hover:text-[13px] group-hover:opacity-100"
  >
    Back to Top
  </span>
</button>

    </div>
  )
}

export default ToTop
