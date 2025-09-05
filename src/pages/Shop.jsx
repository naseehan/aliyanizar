import React, { useEffect, useState } from "react";
import "../App.css";
import { products } from "./shopItems";
import { categories } from "./shopItems";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [price, setPrice] = useState(35);
  const [cateHide, setCateHide] = useState(true);
  const [priceHide, setPriceHide] = useState(true);
  const [faveHide, setFaveHide] = useState(false);
  const [filterHide, setFilterHide] = useState(false);
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
  let navigate = useNavigate()
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

  // filter by price
  const handleFilter = () => {
    let product = products.filter((item) => item.offerPrice <= price);
    setFilteredProducts(product);
    setFilterHide(false);
  };
  // show || hide price filter
  const hidePriceFilter = () => {
    setPriceHide(!priceHide);
  };

  // show || hide categories filter
  const toggleCates = () => {
    setCateHide(!cateHide);
  };

  // goto artwork details page
  const goToDetailsPage = (name) => {
    let keyword = name.toLowerCase().replace(/s\+/g, "-")
    navigate(`/works/artWorks/${keyword}`)
  }

  const handleFilterToggle = () => {
    setFilterHide((prev) => !prev);
    setFaveHide(false);
    setShowCart(false);
  };
  // show || hide cart sidebar
  const handleCartToggle = () => {
    setShowCart((prev) => !prev);
    setFaveHide(false);
    setFilterHide(false);
  };
  // show || hide fave sidebar
  const handleFaveToggle = () => {
    setFaveHide((prev) => !prev);
    setShowCart(false);
    setFilterHide(false);
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
    const val = Number(e.target.value);
    setPrice(val);

    // calculate percentage relative to min/max
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    const percent = ((val - min) / (max - min)) * 100;

    // update CSS variable
    e.target.style.setProperty("--value", `${percent}%`);
  };

  const filterByCates = (name) => {
    if(name == "All"){
      setFilteredProducts(products)
       setFilterHide(false);
    }else{
    setFilteredProducts(() =>
      products.filter((item) => item.categories == name)
    );
    setFilterHide(false);
  }
  };

  return (
    <div className="lg:flex pt-27 sm:pt-40 bg-[#FFFFF0] relative">
      {/* sidebar */}
      <div className="z-999">
        {/* sidebuttons */}
        <div
          className={`z-999 transition-all duration-500 ease-in-out fixed top-[50%]  grid gap-2.5 ${
            showCart || faveHide || filterHide
              ? "right-[268px] sm:right-[329px]"
              : "right-0"
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

          <div className="flex sm:hidden bg-white shadow-[0_0_9.8px_0.2px_rgba(0,0,0,0.1)] tracking-[0.11em]  items-center gap-2 p-4 relative">
            <button onClick={handleFilterToggle} className="">
              <i className="fa-solid fa-sliders fa-lg text-[#b9900d]"></i>
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

        {/* filter sidebar mobile device only */}
        <div
          className={`sm:hidden z-999 fixed top-0 h-screen w-[270px] sm:w-[330px] bg-white transition-all duration-500 ease-in-out ${
            filterHide ? "right-0 opacity-100" : "-right-[330px] opacity-0"
          }`}
        >
          <div className="mt-14">
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
              {/* <div className="px-[3.25rem] mt-[1rem]  grid gap-3">
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
              </div> */}
            </div>
          </div>
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
        <div className="px-[3.25rem] sm:py-[3.7rem] pt-10 sm:h-[184px] max-w-[600px] mx-auto relative">
          <input
            onChange={searchFunction}
            value={search || ""}
            type="search"
            name="search"
            id="search"
            className="border border-[#c9c8bf] pr-9 pl-5 py-2.5 rounded-[30px] text-[#6d6d65]  bg-[#FFFFF0] w-[100%] focus:border-[#606060]"
            placeholder="Search for Products..."
          />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="absolute w-4 h-4 right-[70px] top-[55px] sm:top-[74px]"
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
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
              {/* <div className="px-[3.25rem] mt-[1rem]  grid gap-3">
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
                    className="w-full search-input"
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
              </div> */}
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
                  <div className="relative group h-[280px] sm:h-[300px]">
                    <img
                      src={item.img}
                      alt="art image"
                      loading="lazy"
                      className="h-[100%]"
                    />
                        {/* favourates button */}
                        {!item.sold  && ( <div className="absolute -top-[6px] sm:right-[9px] -left-2 text-white rounded-full h-[44px] w-[44px] flex items-center justify-center group">
                      <button
                        className="z-30 pointer"
                        onClick={() => addFaves(item, item.id)}
                      >
                        <i
                          className={`${
                            faves.some((fav) => fav.id == item.id)
                              ? "fa-solid"
                              : "fa-regular"
                          } fa-heart fa-lg text-[#b9900d]  sm:group-hover:text-[#fff]`}
                        ></i>
                      </button>
                    </div>)}
                     

                    {/* sold or not  */}
                    {item.sold && ( <div className="absolute bottom-[7px] sm:right-[9px] left-1 ">
                     <img src="/badge.png" alt="sold" />
                    </div>)}
                   
                    {/* cart button only on mobile screens and not for sold items*/}
                    {!item.sold  && ( 
                    <div className="absolute -top-[7px] -right-[7px] text-white rounded-full h-[44px] w-[44px] flex items-center justify-center group sm:hidden">
                      <button
                        className="z-30 pointer"
                        onClick={() => handleClick(item.id)}
                      >
                        <i className="fa-solid fa-cart-shopping fa-lg text-[#b9900d]  sm:group-hover:text-[#fff]"></i>
                      </button>
                    </div>
                    )}

                    {/* when hovering */}
                    <div className="absolute inset-0 bg-[#000] bg-opacity-70 sm:flex flex-col justify-center items-center text-white opacity-0 pointer-events-none group-hover:opacity-70 group-hover:pointer-events-auto transition-opacity duration-300 hidden">
                      {!item.sold  && ( 
                      <button
                        className="text-[30px] font-bold font-['Maghfirea'] tracking-[4px]"
                        onClick={() => handleClick(item.id)}
                      >
                        Add To Cart
                      </button>
                      )}
                      <button
                        className="text-[30px] font-bold font-['Maghfirea'] tracking-[4px]"
                        onClick={() => goToDetailsPage(item.name)}
                      >
                        View Details
                      </button>

                  
                    </div>
                  </div>

                  <div>
                    <h3 className="font-['Maghfirea',sans-serif] text-[#004953] text-[25px] sm:text-3xl font-semibold tracking-[3px] capitalize">
                      {item.name}
                    </h3>
                    {/* <div className="flex justify-center text-[18px] sm:text-[20px] gap-3">
                      <p className="text-[#987300] font-[Ubuntu]">
                       Price on Request
                      </p>
                    </div> */}
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
