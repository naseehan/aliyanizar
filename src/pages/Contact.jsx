import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className='  bg-[#FFFFF0]'>

<div className='max-w-[1000px] pt-40 pb-10 mx-auto'>
      {/* container */}
      <div className='grid gap-12'>
        {/* header */}
        <div className='max-w-[400px] pl-4 lg:pl-0'>
          <h1 className='text-[50px] font-bold tracking-[3px] text-[#D4AF37] font-[Flaviotte,sans-serif] uppercase'>Lets work together</h1>
          <br />
          <p className='font-medium font-[Ubuntu] text-[#b9900d]'>Feel free to leave me a message via the form, or you can get a hold of me at adfisherdesign@gmail.com</p>
          <br />
          <br />
          <p className='font-medium font-[Ubuntu] text-[#b9900d]'>Lets create something beautiful and impactful.</p>
        </div>

        {/* form */}
      <div className="">
          <form action="" className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(360px,1fr))] px-4 lg:px-0" >
            <div className='grid gap-2.5'>
            <label htmlFor="name" className="text-[#b9900d]">Name*</label>
            <input type="text" name="name" id="name" className=" border p-2.5"/>
            </div>
            <div className='grid gap-2.5'>
            <label htmlFor="email" className="text-[#b9900d]">Email Address*</label>
            <input type="email" name="email" id="email" className=" border p-2.5"/>
            </div>
            <div className='grid gap-2.5'>
            <label htmlFor="phone" className="text-[#b9900d]">Phone</label>
            <input type="number" name="phone" id="phone" className=" border p-2.5"/>
            </div>
            <div className='grid gap-2.5'>
            <label htmlFor="what" className="text-[#b9900d]">What's this regarding?*</label>
            <input type="text" name="what" id="what" className=" border p-2.5"/>
            </div>
            <div className='grid col-span-full gap-2.5'>
            <label htmlFor="message" className="text-[#b9900d]">Message*</label>
            <textarea type="text" name="message" id="message" className=" border p-2.5" maxLength={5000}/>
            </div>
          </form>
           <div className="flex py-16">
        <Link className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-[Maghfirea] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200 uppercase">
          submit
        </Link>
      </div>
        </div>


      </div>
      </div>
     
    </div>
  )
}

export default Contact
