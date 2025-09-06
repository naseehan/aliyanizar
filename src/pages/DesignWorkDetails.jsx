import React from "react";
import { useParams } from "react-router-dom";

const DesignWorkDetails = () => {
  let { slug } = useParams();
  return (
    <div className="relative  bg-[#FFFFF0] px-4">
      <div className="max-w-[1200px] pt-27 sm:pt-40  mx-auto">

        {/* design work image  */}
        <div>
            <img
                src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
                alt=""
                loading="lazy"
                className="max-h-[500px] w-full object-cover"
              />

        </div>

        {/* description */}
        <div className="text-center mx-auto my-20 sm:my-40 max-w-[500px]">
            <h1 className="font-['Maghfirea',sans-serif] text-[#004953] text-[25px] sm:text-3xl font-semibold tracking-[3px] capitalize my-8">{slug}</h1>
            <p className="text-[#987300] font-[Ubuntu] text-[18px] sm:text-[20px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus tempora fugiat nulla alias deserunt quisquam, accusamus inventore nemo commodi mollitia fugit voluptates obcaecati delectus, impedit assumenda sit suscipit. Minus, eaque?
            Sunt dignissimos, officiis reiciendis, at molestias voluptas doloremque ratione odio dolorem distinctio nemo porro nisi, deserunt ipsa. Officiis, quae minus perspiciatis itaque nemo placeat quasi, velit, reprehenderit dicta asperiores corporis.
            Reiciendis tenetur ad inventore earum illo culpa, repudiandae, sit ex nobis fugiat iure ficiis, voluptates sit hic iure atque iam. Aperiam?
            Praesentium dolorem doloribus ducimus blanditiis molestiae dolor consequatur deleniti natus, similique deserunt pariatur obcaecati dolorum sed tempore quod, eius cumque et aspernatur perspiciatis possimus veniam. Quisquam aut quae obcaecati? Mollitia.
            Animi ratione, dignissimos cupiditate atque sunt sed ab omnis praesentium mollitia rerum. Accusamus alias nihil sunt est repellat nam harum reiciendis maiores, officia, eos esse veritatis ea enim minima rem.</p>
        </div>

        {/* more images */}
        <div className="grid sm:[grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] gap-8">
            <img
                src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
                alt=""
                loading="lazy"
                className="max-h-[500px] w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
                alt=""
                loading="lazy"
                className="max-h-[500px] w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg"
                alt=""
                loading="lazy"
                className="max-h-[500px] w-full object-cover"
              />
        </div>
      </div>
    </div>
  );
};

export default DesignWorkDetails;
