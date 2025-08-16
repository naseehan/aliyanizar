import React from 'react'

const ProjectDetails = () => {
  return (
    <div className="  bg-[#FFFFF0]">
<div className="max-w-[1000px] pt-20  mx-auto">
 <div className=" py-12 mx-auto px-8 lg:px-0" >
  <div className="grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-x-5 gap-y-20">
 <div className='grid'>
        <h1 className="text-[45px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif] uppercase">Art work name</h1>
   
      <div className="grid lg:[grid-template-columns:repeat(auto-fit,minmax(172px,1fr))] gap-5">

        <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif]'>project type</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
             <div className="h-px bg-[#D4AF37] "></div>
        </div>

          <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif]'>Role</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
             <div className="h-px bg-[#D4AF37] "></div>
        </div>

          <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif]'>tools used</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
            <div className="h-px bg-[#D4AF37] md:hidden"></div>
        </div>

          <div className='grid gap-9'>
            <div>
            <h1 className='uppercase text-[26px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif]'>year</h1>
            <p className='capitalize text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]'>personal project</p>
            </div>
        </div>
      </div>
      </div>

<div className='grid gap-4'>
    <p className="text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]">In 2023 Neo Financial partnered with Junior Achievements Canada to develop a youth money Mastercard, with a new card design, branding and campaign to launch the partnership. The JA card is to introduce teens to start building independence with financial services & tools to manage their money, save smarter and earn rewards with Neo.</p>
    <p className="text-[14px] md:text-[17px]  font-light font-[Ubuntu]  max-w-[474px] text-[#b9900d]">The branding started off with developing a card design that would appeal to a younger audience, and would be distinct from the general Neo cards. We worked with the JA’s current colour palette, and came up with the paint brush style as the main brand elements. Once all the print elements were complete, the landing page for the JA card and the video campaign was developed by myself and the Neo creative team. As the lead designer for the project, I was tasked with supporting the animators and videographers with branded graphic and UI elements for the video campaign.</p>
</div>

</div>


{/* images */}
<div className='grid mt-16 gap-10'>
  <img src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg" alt="" loading='lazy' className='max-h-[500px] w-full object-cover'/>
  <img src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg" alt="" loading='lazy' className='max-h-[500px] w-full object-cover'/>
  <img src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg" alt="" loading='lazy' className='max-h-[500px] w-full object-cover'/>
</div>

</div>
</div>
    </div>
  )
}

export default ProjectDetails
