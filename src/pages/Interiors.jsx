import React, { useEffect } from 'react'
import GoBack from '../components/GoBack'
import { Link, useParams } from 'react-router-dom'

const Interiors = () => {

const {title} = useParams()

  return (
    <div className="bg-[#FFFFF0] relative">
      <GoBack />
      <div className="max-w-[1300px] pt-27 sm:pt-40 px-4 mx-auto">
        {/* header */}
        <div className="text-center max-w-[615px] mx-auto">
          <h1 className="text-[60px] font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase">
            {title}
          </h1>
          <br />
        </div>
        <div className="grid sm:[grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-8">

{[...Array(5)].map((_, i) => (
          <div className="group relative hover:-translate-y-3 duration-500 h-[400px]  sm:w-auto sm:h-[500px]" key={i}>
            <img
              src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
              alt=""
              loading="lazy"
              className="w-full h-full"
            />
            {/* when hovering */}
            <div className="absolute inset-0 bg-[#3d3219] bg-opacity-70 flex flex-col justify-around items-center text-white opacity-70  sm:opacity-0  sm:group-hover:opacity-70 sm:group-hover:pointer-events-auto transition-opacity duration-300">
              <h3 className="text-[40px] font-medium font-[Flaviotte] tracking-[4px] capitalize">
                {title}
              </h3>
              <Link to="interior designs">
              <p className="text-[20px] font-semibold text-center">
                Learn More
              </p>
              </Link>
            </div>
          </div>
))}
         
        </div>
      </div>
    </div>
  )
}

export default Interiors
