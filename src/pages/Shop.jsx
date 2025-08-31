import React, { useEffect, useState } from "react";
import "../App.css";
import { products } from "./shopItems";
import { categories } from "./shopItems";

const Shop = () => {
  const [price, setPrice] = useState(35);
  const [cateHide, setCateHide] = useState(true);
  const [priceHide, setPriceHide] = useState(true);
  const [faveHide, setFaveHide] = useState(false);
  const [faves, setFaves] = useState(() => {
    try {
      const savedFaves = localStorage.getItem("faves");
      return savedFaves ? JSON.parse(savedFaves) : [];
    } catch {
      return [];
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [filterdProducts, setFilteredProducts] = useState(products);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState();
  const totalLength = products.length;

  const addFaves = (product, id) => {
    setFaves((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.filter((item) => item.id !== id); // remove if exists
      } else {
        return [...prev, product];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("faves", JSON.stringify(faves));
  }, [faves]);

  const handleFilter = () => {
    let product = products.filter((item) => item.offerPrice <= price);
    setFilteredProducts(product);
  };
  // show || hide price filter
  const hidePriceFilter = () => {
    setPriceHide(!priceHide);
  };
  // show || hide categories filter
  const toggleCates = () => {
    setCateHide(!cateHide);
  };

  // show || hide cart sidebar
  const handleCartToggle = () => {
    setShowCart((prev) => !prev);
    setFaveHide(false);
  };
  // show || hide fave sidebar
  const handleFaveToggle = () => {
    setFaveHide((prev) => !prev);
    setShowCart(false);
  };

  const searchFunction = (e) => {
    let query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredProducts(
      products.filter((item) => item.name.toLocaleLowerCase().includes(query))
    );
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

  const deleteCartItem = (pid) => {
    setCart(cart.filter((prev) => prev.id != pid));
  };

  const deleteFaveItem = (pid) => {
    setFaves(faves.filter((prev) => prev.id != pid));
  };

  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  const filterByCates = (name) => {
    setFilteredProducts(() =>
      products.filter((item) => item.categories == name)
    );
  };

  return (
    <div className="lg:flex pt-40 bg-[#FFFFF0] relative">
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
        <div
          className={`z-999 fixed top-0 h-screen w-[270px] sm:w-[330px] bg-white transition-all duration-500 ease-in-out ${
            showCart ? "right-0 opacity-100" : "-right-[330px] opacity-0"
          }`}
        >
          {cart.length === 0 ? (
            <p className="p-4">No items in cart</p>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-2 relative"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-[80px] w-[80px] object-cover rounded"
                  />
                  <button
                    className="absolute top-0 right-0"
                    onClick={() => deleteCartItem(item.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div className="flex flex-col">
                    <h1 className="font-semibold">{item.name}</h1>
                    <div>
                      <span>{item.quantity} × </span>
                      <span className="text-sm text-gray-700">
                        AED{item.offerPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex">
                <button
                  className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"
                  onClick={handleFilter}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>

        {/*faviorates sidebar */}
        <div
          className={`z-999 fixed top-0 h-screen w-[270px] sm:w-[330px] bg-white transition-all duration-500 ease-in-out ${
            faveHide ? "right-0 opacity-100" : "-right-[330px] opacity-0"
          }`}
        >
          {faves.length === 0 ? (
            <p className="p-4">No items in Faviorates</p>
          ) : (
            <div className="p-4 space-y-4">
              {faves.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b pb-2 relative"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-[80px] w-[80px] object-cover rounded"
                  />
                  <button
                    className="absolute top-0 right-0"
                    onClick={() => deleteFaveItem(item.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div className="flex flex-col">
                    <h1 className="font-semibold">{item.name}</h1>
                    <div>
                      <span className="text-sm text-gray-700">
                        AED{item.offerPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto lg:w-[1200px]  gap-8 px-2 sm:px-4">
        {/* header */}
        <div className="text-center max-w-[615px] mx-auto">
          <h1 className="text-[60px] font-bold tracking-[8px] text-[#c16d3c] font-['Maghfirea',sans-serif] uppercase">
            shop
          </h1>
          <br />
        </div>
        <div className="h-px bg-[#D4AF37] mx-auto max-w-[1000px]"></div>

        {/* search */}
        <div className="px-[3.25rem] py-[3.7rem] h-[184px] max-w-[600px] mx-auto">
          <input
            onChange={searchFunction}
            value={search || ""}
            type="search"
            name="search"
            id="search"
            className="border border-[#c9c8bf] pr-9 pl-5 py-2.5 rounded-[30px] text-[#6d6d65]  bg-[#FFFFF0] w-[100%] focus:border-[#606060]"
            placeholder="Search for Products..."
          />
        </div>

        <div className="sm:flex sm:justify-start">
          {/* filter */}
          <div className="w-250px hidden sm:block">
            <h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-3xl font-semibold mb-2.5 text-center">
              Filter
            </h1>
            <div>
              {/* filter by categories */}
              <div className="px-[3.25rem] mt-[2rem]  grid gap-3">
                <div className="flex items-center gap-[18px] mb-2.5">
                  <h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-[22px] font-semibold ">
                    Categories
                  </h1>
                  <button onClick={toggleCates}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <ul
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    cateHide ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
                  }`}
                >
                  {categories.map((item, i) => (
                    <li
                      key={i}
                      className=" transition-transform duration-300 ease-out"
                    >
                      <button
                        className="text-[14px] md:text-[16px]   font-[Ubuntu]  max-w-[474px] text-[#b9900d] capitalize"
                        onClick={() => filterByCates(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* filter by price */}
              <div className="px-[3.25rem] mt-[1rem]  grid gap-3">
                <div className="flex items-center gap-[18px] mb-2.5">
                  <h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-[22px] font-semibold ">
                    Price
                  </h1>
                  <button onClick={hidePriceFilter}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div
                  className={`transition-all duration-300 ease-out ${
                    priceHide
                      ? "max-h-0 opacity-0"
                      : "max-h-[500px] opacity-100"
                  }`}
                >
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

          {/* products */}
          <div className="grid lg:w-[100%]">
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(144px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(239px,1fr))] gap-3 sm:gap-10 mt-16 shop-page-products">
              {filterdProducts.map((item, i) => (
                <div
                  key={i}
                  className="text-center leading[2] w-[100%] sm:w-[239px]"
                >
                  <div className="relative group ">
                    <img
                      src={item.img}
                      alt="art image"
                      loading="lazy"
                      className=""
                    />
                    <div className="absolute top-[7px] right-[9px] text-white bg-[#fff] rounded-full h-[44px] w-[44px] flex items-center justify-center group">
                      <button
                        className="z-30 pointer"
                        onClick={() => addFaves(item, item.id)}
                      >
                        <i className="fa-solid fa-heart fa-lg text-[#b9900d]  group-hover:text-[#fff]"></i>
                      </button>
                    </div>

                    {/* when hovering */}
                    <div className="absolute inset-0 bg-[#000] bg-opacity-70 sm:flex flex-col justify-center items-center text-white opacity-0 pointer-events-none group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300 hidden">
                      <button
                        className="text-[30px] font-bold font-['Maghfirea'] tracking-[4px]"
                        onClick={() => handleClick(item.id)}
                      >
                        Add To Cart
                      </button>
                      <button
                        className="text-[30px] font-bold font-['Maghfirea'] tracking-[4px]"
                        // onClick={() => handleClick(item.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div>
                    {/* <p className=" font-[Ubuntu]">
                      {item.categories[1]}, {item.categories[2]}
                    </p> */}
                    <h3 className="font-['Maghfirea',sans-serif] text-[#b9900d] text-3xl font-semibold tracking-[3px] capitalize">
                      {item.name}
                    </h3>
                    <div className="flex justify-center text-[20px] gap-3">
                      {/* <p className="line-through text-[#93938f] font-[Ubuntu]">
                        AED{item.ogPrice} {"  "}
                      </p> */}
                      <p className="text-[#987300] font-[Ubuntu]">
                        {" "}
                        AED{item.offerPrice}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:hidden">
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
        </div>
      </div>
    </div>
  );
};

export default Shop;
