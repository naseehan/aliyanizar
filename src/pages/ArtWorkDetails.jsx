import React from 'react'

const ArtWorkDetails = () => {
  return (
     <div className="  bg-[#FFFFF0]">
<div className="max-w-[1000px] pt-20  mx-auto">


    {/* art work details */}
      <div className=" py-12 mx-auto px-8 lg:px-0" >
  <div className="grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-x-5 gap-y-32">
      <div  className="relative h-[500px]">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
          alt=""
          loading="lazy"
          className="w-full h-full"
        />
      </div>

       <div  className="relative h-[500px]">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
          alt=""
          loading="lazy"
          className="w-full h-full"
        />
      </div>

      <div>
        <h1 className="text-[45px] font-bold tracking-[3px] text-[#c16d3c] font-[Maghfirea,sans-serif] uppercase">Art work name</h1>
        <p className="text-[14px] md:text-[17px]  font-normal font-[Ubuntu]  max-w-[474px] text-[#b9900d]">A forest scene of a mama bear with her three cubs climbing the tree trunks.</p>
      </div>

      <div className="grid lg:[grid-template-columns:repeat(auto-fit,minmax(172px,1fr))] gap-5">

        <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Maghfirea,sans-serif]'>project type</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
             <div className="h-px bg-[#D4AF37] "></div>
        </div>

          <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Maghfirea,sans-serif]'>Role</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
             <div className="h-px bg-[#D4AF37] "></div>
        </div>

          <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Maghfirea,sans-serif]'>tools used</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
            <div className="h-px bg-[#D4AF37] md:hidden"></div>
        </div>

          <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Maghfirea,sans-serif]'>year</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
        </div>
      </div>
  </div>
</div>
</div>
</div>
  )
}

export default ArtWorkDetails
