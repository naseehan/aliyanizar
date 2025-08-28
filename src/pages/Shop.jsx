import React, { useState } from "react";
import "../App.css";
import { products } from "./shopItems";

const Shop = () => {
  const [price, setPrice] = useState(35);

  const [cart, setCart] = useState([]);
  const [filterdProducts, setFilteredProducts] = useState(products);

  const totalLength = products.length;

  const handleFilter = () => {
    let product = products.filter((item) => item.offerPrice <= price);
    setFilteredProducts(product);
  };

  const handleClick = (id) => {
    setCart((prevCart) => {
      // check if product exists
      const product = products.find((item) => item.id === id);

      // check if there is already a product in cart
      const exists = prevCart.find((item) => item.id === id);

      if (exists) {
        return prevCart.map((item) =>
          item.id == id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="flex pt-50 bg-[#FFFFF0]">
      <div className="max-w-[1200px] mx-auto w-[1200px] lg:flex gap-8 px-4">
        {/* products */}
        <div className="grid lg:w-[70%]">
          <div className="grid justify-center text-center sm:flex sm:justify-between items-center">
            <div className="">
              <p className="text-[#6d6d65]">
                showing 1-8 of {totalLength} results
              </p>
            </div>
            <div>
              <select
                name="sort"
                id="sort"
                className="border border-[#c9c8bf] pr-9 pl-5 py-2.5 rounded-[30px] text-[#6d6d65] text-[17px] bg-[#FFFFF0] focus:border-[#606060]"
              >
                <option value="Relevance">Relevance</option>
                <option value="Sort by Popularity">Sort by Popularity</option>
                <option value="Sort by Latest">Sort by Latest</option>
                <option value="Sort by Popularity">Sort by Popularity</option>
                <option value="Sort by price: low to high">
                  Sort by price: low to high
                </option>
                <option value="Sort by price: high to low">
                  Sort by price: high to low
                </option>
              </select>
            </div>
          </div>

          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(286px,1fr))] gap-10 mt-16 shop-page-products">
            {filterdProducts.map((item, i) => (
              <div key={i} className="text-center leading[2]  ">
                <div className="relative group ">
                  <img
                    src={item.img}
                    alt="art image"
                    loading="lazy"
                    className=""
                  />
                  <div className="absolute top-[7px] right-[9px] text-white bg-[#c9a050] rounded-full h-[44px] w-[44px] flex items-center justify-center">
                    {item.offer}%
                  </div>

                  {/* when hovering */}
                  <div className="absolute inset-0 bg-[#3d3219] bg-opacity-70 sm:flex flex-col justify-around items-center text-white opacity-0 pointer-events-none group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300 hidden">
                    <button
                      className="text-[30px] font-bold font-['Maghfirea'] tracking-[4px]"
                      onClick={() => handleClick(item.id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

                <div>
                  <p className=" font-[Ubuntu]">
                    {item.categories[1]}, {item.categories[2]}
                  </p>
                  <h3 className="font-['Maghfirea',sans-serif] text-[#b9900d] text-3xl font-semibold tracking-[3px] capitalize">
                    {item.name}
                  </h3>
                  <div className="flex justify-center text-[20px] gap-3">
                    <p className="line-through text-[#93938f] font-[Ubuntu]">
                      AED{item.ogPrice} {"  "}
                    </p>
                    <p className="text-[#987300] font-[Ubuntu]">
                      {" "}
                      AED{item.offerPrice}
                    </p>
                  </div>
                </div>
                <div className="flex sm:hidden">
                  {" "}
                  <button
                    className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"
                    onClick={() => handleClick(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* filter */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(329px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(360px,1fr))] lg:max-h-[600px] gap-3 my-10 lg:my-0">
          <div className="bg-[#eeede0] px-[3.25rem] py-[3.7rem]  lg:w-[370px]">
            <h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-3xl font-semibold mb-2.5">
              Cart
            </h1>
            {cart.length === 0 ? (
              <p className="text-[#6d6d65] font-[Ubuntu]">
                No products in the cart
              </p>
            ) : (
              <div className="grid gap-8">
                {cart.map((item) => (
                  <div className="flex gap-8" key={item.id}>
                    <img
                      src={item.img}
                      alt="image"
                      className="h-[78px] w-[78px]"
                    />
                    <div className="">
                      <h1 className="font-semibold text-[20px] tracking[1px]">
                        {item.name}
                      </h1>
                      {/* number of same items */}
                      <span>{item.quantity} × </span>
                      <span className="text-[#b9900d]">
                        AED{item.offerPrice}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex">
                  <button className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#eeede0] px-[3.25rem] py-[3.7rem] h-[184px] lg:w-[370px]">
            <h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-3xl font-semibold mb-2.5">
              Search
            </h1>
            <input
              type="search"
              name="search"
              id="search"
              className="border border-[#c9c8bf] pr-9 pl-5 py-2.5 rounded-[30px] text-[#6d6d65]  bg-[#FFFFF0] focus:border-[#606060]"
              placeholder="Search for Products..."
            />
          </div>
          <div className="bg-[#eeede0] px-[3.25rem] py-[3.7rem] h-[240px] lg:w-[370px] grid gap-3">
            <h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-3xl font-semibold mb-2.5">
              Filter
            </h1>
            <input
              type="range"
              name="range"
              id="range"
              min="10"
              max="35"
              value={price}
              onChange={handleChange}
              className="search-input w-full relative"
            />
            <p className="text-[#6d6d65] font-[Ubuntu]">
              Price : AED10 - AED{price}
            </p>
            <div className="flex">
              <button
                className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
