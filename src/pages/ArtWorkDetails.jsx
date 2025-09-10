import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "./shopItems";
import GoBack from "../components/GoBack";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toggleFave, removeFave } from "../store/favesSlice";

const ArtWorkDetails = () => {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const faves = useSelector((state) => state.faves.items);

  let product = products.find((item) => item.name == slug);
  let currentProduct = cart.find((item) => product.id === item.id);
  let currentProductCount;
  
  if(currentProduct){
  currentProductCount = currentProduct.quantity;
  }else{
    currentProductCount = 0
  }
  const [showCart, setShowCart] = useState(false);
  const [faveHide, setFaveHide] = useState(false);

  const handleCartToggle = () => {
    setShowCart((prev) => !prev);
    setFaveHide(false);
  };

  const handleFaveToggle = () => {
    setFaveHide((prev) => !prev);
    setShowCart(false);
  };

  // Remove from cart
  const deleteCartItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Remove fave
  const deleteFaveItem = (id) => {
    dispatch(removeFave(id));
  };
  // Add to cart
  const handleClick = (id) => {
    // const product = products.find((item) => item.id === id);
    dispatch(addToCart(product));
  };
  // add to favourites
   const addFaves = (product) => {
      dispatch(toggleFave(product));
    };

  const closeSidebars = () => {
    setShowCart(false);
    setFaveHide(false);
  };
  return (
    <div className="relative  bg-[#FFFFF0]">
      <div
        className={`absolute inset-0 z-50  ${
          showCart || faveHide ? "block" : "hidden"
        }`}
        onClick={closeSidebars}
      ></div>
      {/* sidebar */}
      <div className="z-999">
        {/* sidebuttons */}
        <div
          className={`z-999 transition-all duration-500 ease-in-out fixed top-[50%]  grid gap-2.5 ${
            showCart || faveHide ? "right-[268px] sm:right-[329px]" : "right-0"
          }`}
        >
          <div className="flex bg-white shadow-[0_0_9.8px_0.2px_rgba(0,0,0,0.1)] tracking-[0.11em]  items-center gap-2 p-4 relative">
            {cart.length > 0 && (
              <p className="absolute bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -left-1.5 font-medium">
                {cart.length}
              </p>
            )}
            <button onClick={handleCartToggle} className="">
              <i className="fa-solid fa-cart-shopping fa-lg text-[#b9900d]"></i>
            </button>
          </div>

          <div className="flex bg-white shadow-[0_0_9.8px_0.2px_rgba(0,0,0,0.1)] tracking-[0.11em]  justify-center items-center gap-2 p-4 relative">
            {faves.length > 0 && (
              <p className="absolute bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -left-1.5 font-medium">
                {faves.length}
              </p>
            )}
            <button onClick={handleFaveToggle} className="">
              <i className="fa-solid fa-heart fa-lg text-[#b9900d]"></i>
            </button>
          </div>
        </div>

        {/*cart sidebar */}

        <Sidebar
          toggle={showCart}
          length={cart.length}
          arrayOfItems={cart}
          deleteItem={deleteCartItem}
          name="Cart"
          checkout={true}
        />

        {/*faviorates sidebar */}

        <Sidebar
          toggle={faveHide}
          length={faves.length}
          arrayOfItems={faves}
          deleteItem={deleteFaveItem}
          name="Favourites"
          checkout={false}
        />
      </div>
      <GoBack />
      <div className="max-w-[1000px] pt-27 sm:pt-40  mx-auto">
        {/* art work details */}
        <div className="">
          <div className="lg:fixed  lg:h-[500px] object-contain lg:w-[450px] transition-all duration-300 ease-in-out lg:hover:z-20 lg:hover:transform  lg:hover:scale-110">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="lg:z-10 lg:relative max-w-[600px] left-[40%] mx-auto  lg:mx-0">
            <div className="py-12 px-7 sm:px-20 text-center sm:text-start">
              <h1 className="font-['Maghfirea',sans-serif] text-[#004953] text-[25px] sm:text-3xl font-semibold tracking-[3px] capitalize">
                {product.name}
              </h1>
              <p className="text-[#987300] font-[Ubuntu] text-[18px] sm:text-[20px]">
                {product.categories}
              </p>

              {/* add to cart button not shown on sold products */}
              {!product.sold && (
                <div className="mt-3.5 flex gap-5 justify-center">
                  <span className="p-[13px] border border-[#D4AF37]">{currentProductCount}</span>
                  <div className="inline">
                    <button className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"   onClick={() => handleClick(product.id)}
                        >
                      Add To Cart
                    </button>
                  </div>

                  {/* favourites button */}
                  <div className="text-white flex justify-center">
                        <button
                          className="z-30 pointer"
                          onClick={() => addFaves(product, product.id)}
                        >
                          <i
                            className={`${
                              faves.some((fav) => fav.id == product.id)
                                ? "fa-solid"
                                : "fa-regular"
                            } fa-heart fa-2xl text-[#b9900d] `}
                          ></i>
                        </button>
                      </div>
                </div>
              )}
            </div>
            <div className="bg-[#e9e9e9] p-16">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
                quis quibusdam iusto quasi magnam qui placeat deleniti, fugiat
                sint amet et accusamus ipsum sequi laborum animi pariatur porro
                distinctio nisi. A omnis autem earum corporis, repudiandae quam,
                facere nobis doloribus praenderit exercitationem. Illo
                voluptatem consequatur nulla, nisi rerum dolor deserunt quaerat,
                omnis similique aspernatur explicabo unde qui voluptas fugit.
                Eligendi harum, ipsam placeat ratione quas nihil saepe
                perferendis, eaque deleniti, doloremque modi! Nemo nesciunt esse
                hic neque accusamus! Eius odit impedit voluptatem maxime
                molestiae? Voluptates officia dolores repudiandae voluptas
                consequatur quaerat vitae dolor voluptatibus ad at! Velit
                repudiandae laboriosam explicabo et consectetur! Quidem eos
                consequatur sunt, quam, enim quos rerum facere quibusdam atque a
                nesciunt ipsum aperiam nostrum praesentium soluta voluptatum
                itaque quaerat rem totam, sequi labore iusto voluptas! Impedit,
                odio aspernatur. Dolore debitis suscipit provident fugit
                voluptas veritatis sit, aut animi laboriosam cum error, omnis
                blanditiis alias unde beatae. Saepe vitae expedita quas beatae
                tenetur iste dolore nisi? Voluptatem, tempora ipsam. Hic dolores
                asperiores, quisquam repellat in commodi cupiditate minus
                provident sed laudantium iusto suscipit rem eius ipsum,
                consequuntur deleniti minima aspernatur reiciendis ratione!
                Aperiam suscipit, nulla repudiandae fuga nisi beatae.
                Consectetur modi magnam iste dolorem beatae, illum porro quas.
                Nulla rerum magni blanditiis unde eveniet dolores laboriosam
                earum sed facilis sint. Delectus quasi modi mollitia officiis
                explicabo nisi excepturi recusandae. Blae quas atque libero,
                assumenda, dolore necessitatibus omnis molestias iusto
                voluptatibus incidunt quaerat suscipit, nulla quod esse odit.
                Dicta nulla distinctio, corporis velit, impedit labore nesciunt
                quas, beatae quod eaque dignissimos! Provident, facere illum.
                Numquam ut quibusdam quae exercitationem, modi aut, enim
                suscipit voluptas quia maxime harum! Nisi? Cupiditate
                aspernatur, dicta reiciendis odit ut animi nulla numquam,
                pariatur quod nisi cum, mollitia in molestiae sunt at dolore
                incidunt sit assumenda non. Quo minus aliquam autem aliquid,
                sint asperiores? Porro, voluptatibus, facere sint provident at
                tempora ipsam quos error non voluptatum eveniet! Nemo ducimus
                amet molestias sed alias iste! Labore ipsa voluptas
                reprehenderit culpa ad officia vitae unde voluptatem! Tenetur
                obcaecati ipsam nostrum molestiae ullam natus voluptas
                praesentium fugit error. Maiores libero facere vel tempore, ad
                molestiae assumenda neque odit ducimus deleniti, tempora commodi
                asperiores unde aliquam culpa obcaecati! Fugerunt sed veritatis
                animi quidem dolores aspernatur necessitatibus inventore
                possimus voluptatem corporis molestias consectetur obcaecati
                explicabo? Provident. Fugit eaque totam quibusdam, nihil
                accusantium maiores cupiditate? Nemo iste et in tenetur nulla
                dolores veniam quo? Facere voluptatibus qui consequatur.
                Adipisci atque qui sint, voluptatem dolorum minus illo
                consectetur. Magni voluptates nemo illum reprehenderit dicta
                similique fugit voluptas, deleniti molestiae fuga repellendus
                consequuntur doloribus, voluptatem nihil quibusdam
                exercitationem ea reiciendis porro? Atque exercitationem,
                delectus consequuntur id tempora iste asperiores? Reiciendis,
                fuga. At, quod asperiores, magni odit aut laboriosam adipisci
                beatae quasi porro maiores vel, hic iure nesciunt. Assumenda
                magni beatae animi quasi totam repellendus doloribus neque,
                ipsam veritatis expedita.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtWorkDetails;
