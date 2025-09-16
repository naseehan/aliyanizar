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
      <div className="z-40">
        {/* sidebuttons */}
        <div
          className={`z-40 transition-all duration-500 ease-in-out fixed top-[50%]  grid gap-2.5 ${
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
          <div className="lg:z-10 lg:relative max-w-[600px] left-[40%] mx-auto  lg:mx-0 sm:h-[500px]">
            <div className="py-12 px-7 sm:px-20 text-center sm:text-start">
              <h1 className="font-['Maghfirea',sans-serif] text-[#004953] text-[25px] sm:text-3xl font-semibold tracking-[3px] capitalize">
                {product.name}
              </h1>
              <p className="text-[#987300] font-[Ubuntu] text-[18px] sm:text-[20px]">
                {product.dimensions}
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
               {product.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtWorkDetails;
