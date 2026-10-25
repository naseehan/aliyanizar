
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../lib/productsApi";
import { fromSlug } from "../lib/slug";
import GoBack from "../components/GoBack";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toggleFave, removeFave } from "../store/favesSlice";
import { toast } from "react-toastify";

const ArtWorkDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const faves = useSelector((state) => state.faves.items);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [faveHide, setFaveHide] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((items) => {
        if (!cancelled) setProducts(items);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not load product.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const normalizedSlug = fromSlug(slug);

  const product = products.find(
    (item) => item.name.toLowerCase() === normalizedSlug
  );

  const currentProduct = product
    ? cart.find((item) => item.id === product.id)
    : null;

  const currentProductCount = currentProduct?.quantity || 0;

  const handleCartToggle = () => {
    setShowCart((prev) => !prev);
    setFaveHide(false);
  };

  const handleFaveToggle = () => {
    setFaveHide((prev) => !prev);
    setShowCart(false);
  };

  const deleteCartItem = (id) => dispatch(removeFromCart(id));
  const deleteFaveItem = (id) => dispatch(removeFave(id));

  const handleClick = () => {
    if (!product) return;

    const result = dispatch(addToCart(product));

    if (result.meta?.exceeded) {
      toast.error("You can only add up to 5 of this item.");
    }
  };

  const addFaves = (item) => dispatch(toggleFave(item));

  const closeSidebars = () => {
    setShowCart(false);
    setFaveHide(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFF0] pt-40 text-center">
        Loading product…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FFFFF0] pt-40 text-center">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="relative bg-[#FFFFF0]">
      <div
        className={`absolute inset-0 z-50 ${
          showCart || faveHide ? "block" : "hidden"
        }`}
        onClick={closeSidebars}
      />

      <div>
        <div
          className={`z-[70] transition-all duration-500 ease-in-out fixed top-[50%] grid gap-2.5 ${
            showCart || faveHide
              ? "right-[268px] sm:right-[329px]"
              : "right-0"
          }`}
        >
          <div className="flex bg-white shadow-[0_0_9.8px_0.2px_rgba(0,0,0,0.1)] items-center gap-2 p-4 relative">
            {cart.length > 0 && (
              <p className="absolute bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -left-1.5">
                {cart.length}
              </p>
            )}
            <button onClick={handleCartToggle} aria-label="Open cart">
              <i className="fa-solid fa-cart-shopping fa-lg text-[#b9900d]" />
            </button>
          </div>

          <div className="flex bg-white shadow-[0_0_9.8px_0.2px_rgba(0,0,0,0.1)] justify-center items-center gap-2 p-4 relative">
            {faves.length > 0 && (
              <p className="absolute bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -left-1.5">
                {faves.length}
              </p>
            )}
            <button onClick={handleFaveToggle} aria-label="Open favourites">
              <i className="fa-solid fa-heart fa-lg text-[#b9900d]" />
            </button>
          </div>
        </div>

        <Sidebar
          toggle={showCart}
          length={cart.length}
          arrayOfItems={cart}
          deleteItem={deleteCartItem}
          name="Cart"
          checkout={true}
        />

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

      <div className="max-w-[1000px] pt-27 sm:pt-40 mx-auto">
        <div>
          <div className="lg:fixed lg:h-[500px] object-contain lg:w-[450px] transition-all duration-300 ease-in-out lg:hover:z-20 lg:hover:scale-110">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="lg:z-10 lg:relative max-w-[600px] left-[40%] mx-auto lg:mx-0 sm:h-[500px]">
            <div className="py-12 px-7 sm:px-20 text-center sm:text-start">
              <h1 className="font-['Maghfirea',sans-serif] text-[#004953] text-[25px] sm:text-3xl font-semibold tracking-[3px] capitalize">
                {product.name}
              </h1>

              <p className="text-[#987300] font-[Ubuntu] text-[18px] sm:text-[20px]">
                {product.dimensions}
              </p>

              {!product.sold && (
                <div className="mt-3.5 flex gap-5 justify-center">
                  <span className="p-[13px] border border-[#D4AF37]">
                    {currentProductCount}
                  </span>

                  <button
                    className="border p-[10px_15px] w-[200px] text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-white transition-colors duration-200"
                    onClick={handleClick}
                  >
                    Add To Cart
                  </button>

                  <button
                    className="z-30"
                    onClick={() => addFaves(product)}
                    aria-label="Toggle favourite"
                  >
                    <i
                      className={`${
                        faves.some((fav) => fav.id === product.id)
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-heart fa-2xl text-[#b9900d]`}
                    />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#e9e9e9] p-16">
              <p>{product.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtWorkDetails;
