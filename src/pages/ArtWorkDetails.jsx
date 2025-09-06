import React from "react";
import { useParams } from "react-router-dom";
import { products } from "./shopItems";

const ArtWorkDetails = () => {
  let { slug } = useParams();

  let product = products.find((item) => item.name == slug);

  return (
    <div className="relative  bg-[#FFFFF0]">
      <div className="max-w-[1000px] pt-27 sm:pt-40  mx-auto">

        {/* art work details */}
        <div className="">
          <div className="lg:fixed  lg:h-[460px] lg:w-[460px] transition-all duration-300 ease-in-out lg:hover:z-20 lg:hover:transform  lg:hover:scale-110">
          <img src={product.img} alt={product.name} className="w-full h-full"/>
          </div>
          <div className="lg:z-10 lg:relative max-w-[600px] left-[40%]">
            <div className="py-12 px-20">
            <h1 className="font-['Maghfirea',sans-serif] text-[#004953] text-[25px] sm:text-3xl font-semibold tracking-[3px] capitalize">{product.name}</h1>
            <p className="text-[#987300] font-[Ubuntu] text-[18px] sm:text-[20px]">{product.categories}</p>
            </div>
            <div className="bg-[#e9e9e9] p-16">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem quis quibusdam iusto quasi magnam qui placeat deleniti, fugiat sint amet et accusamus ipsum sequi laborum animi pariatur porro distinctio nisi.
            A omnis autem earum corporis, repudiandae quam, facere nobis doloribus praenderit exercitationem.
            Illo voluptatem consequatur nulla, nisi rerum dolor deserunt quaerat, omnis similique aspernatur explicabo unde qui voluptas fugit. Eligendi harum, ipsam placeat ratione quas nihil saepe perferendis, eaque deleniti, doloremque modi!
            Nemo nesciunt esse hic neque accusamus! Eius odit impedit voluptatem maxime molestiae? Voluptates officia dolores repudiandae voluptas consequatur quaerat vitae dolor voluptatibus ad at! Velit repudiandae laboriosam explicabo et consectetur!
            Quidem eos consequatur sunt, quam, enim quos rerum facere quibusdam atque a nesciunt ipsum aperiam nostrum praesentium soluta voluptatum itaque quaerat rem totam, sequi labore iusto voluptas! Impedit, odio aspernatur.
            Dolore debitis suscipit provident fugit voluptas veritatis sit, aut animi laboriosam cum error, omnis blanditiis alias unde beatae. Saepe vitae expedita quas beatae tenetur iste dolore nisi? Voluptatem, tempora ipsam.
            Hic dolores asperiores, quisquam repellat in commodi cupiditate minus provident sed laudantium iusto suscipit rem eius ipsum, consequuntur deleniti minima aspernatur reiciendis ratione! Aperiam suscipit, nulla repudiandae fuga nisi beatae.
            Consectetur modi magnam iste dolorem beatae, illum porro quas. Nulla rerum magni blanditiis unde eveniet dolores laboriosam earum sed facilis sint. Delectus quasi modi mollitia officiis explicabo nisi excepturi recusandae.
            Blae quas atque libero, assumenda, dolore necessitatibus omnis molestias iusto voluptatibus incidunt quaerat suscipit, nulla quod esse odit.
            Dicta nulla distinctio, corporis velit, impedit labore nesciunt quas, beatae quod eaque dignissimos! Provident, facere illum. Numquam ut quibusdam quae exercitationem, modi aut, enim suscipit voluptas quia maxime harum! Nisi?
            Cupiditate aspernatur, dicta reiciendis odit ut animi nulla numquam, pariatur quod nisi cum, mollitia in molestiae sunt at dolore incidunt sit assumenda non. Quo minus aliquam autem aliquid, sint asperiores?
            Porro, voluptatibus, facere sint provident at tempora ipsam quos error non voluptatum eveniet! Nemo ducimus amet molestias sed alias iste! Labore ipsa voluptas reprehenderit culpa ad officia vitae unde voluptatem!
            Tenetur obcaecati ipsam nostrum molestiae ullam natus voluptas praesentium fugit error. Maiores libero facere vel tempore, ad molestiae assumenda neque odit ducimus deleniti, tempora commodi asperiores unde aliquam culpa obcaecati!
            Fugerunt sed veritatis animi quidem dolores aspernatur necessitatibus inventore possimus voluptatem corporis molestias consectetur obcaecati explicabo? Provident.
            Fugit eaque totam quibusdam, nihil accusantium maiores cupiditate? Nemo iste et in tenetur nulla dolores veniam quo? Facere voluptatibus qui consequatur. Adipisci atque qui sint, voluptatem dolorum minus illo consectetur.
            Magni voluptates nemo illum reprehenderit dicta similique fugit voluptas, deleniti molestiae fuga repellendus consequuntur doloribus, voluptatem nihil quibusdam exercitationem ea reiciendis porro? Atque exercitationem, delectus consequuntur id tempora iste asperiores?
            Reiciendis, fuga. At, quod asperiores, magni odit aut laboriosam adipisci beatae quasi porro maiores vel, hic iure nesciunt. Assumenda magni beatae animi quasi totam repellendus doloribus neque, ipsam veritatis expedita.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtWorkDetails;
