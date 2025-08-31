import React from "react";

const Sidebar = ({
  toggle,
  length,
  arrayOfItems,
  deleteItem,
  name,
  checkout,
  handleFilter,
}) => {
  return (
    <div
      className={`z-999 fixed top-0 h-screen w-[270px] sm:w-[330px] bg-white transition-all duration-500 ease-in-out ${
        toggle ? "right-0 opacity-100" : "-right-[330px] opacity-0"
      }`}
    >
      {length === 0 ? (
        <p className="p-4">No items in {name}</p>
      ) : (
        <div className="p-4 space-y-4">
          {arrayOfItems.map((item, index) => (
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
                onClick={() => deleteItem(item.id)}
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
          {checkout && (
            <div className="flex">
              <button
                className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"
                onClick={handleFilter}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
