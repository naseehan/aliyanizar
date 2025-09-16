import React from "react";

const Sidebar = ({
  toggle,
  length,
  arrayOfItems,
  deleteItem,
  name,
  checkout,
}) => {
  return (
    <div
      className={`z-40 fixed top-0 h-screen w-[270px] overflow-auto sm:w-[330px] bg-white transition-all duration-500 ease-in-out ${
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
                src={item.thumbnail}
                alt={item.name}
                className="h-[80px] w-[80px] object-cover rounded"
                loading="lazy"
              />
              <button
                className="absolute top-0 right-0"
                onClick={() => deleteItem(item.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="flex flex-col">
                <h1 className="font-semibold capitalize">{item.name}</h1>
                <div>
                  <span>{item.quantity} × </span>
                  <span className="text-sm text-gray-700">
                    Price on Request
                  </span>
                </div>
              </div>
            </div>
          ))}
          {checkout && (
            <div className="flex">
              <button
                className="text-center border border-solid p-[10px_15px] w-[200px] mx-auto text-[20px] font-semibold font-['Maghfirea',sans-serif] tracking-[3px] text-[#D4AF37] hover:bg-[#8a733e] hover:text-[#fff] transition-colors duration-200"
                onClick={() => {
                  const message = arrayOfItems
                    .map(
                      (item) =>
                        `Product: ${item.name} Count: ${item.quantity}`
                    )
                    .join("%0A"); // use %0A for line breaks

                  const text = `Hi, I'm interested in buying these:%0A%0A${message}`;

                  window.open(
                    `https://wa.me/+971562826331?text=${text}`,
                    "_blank"
                  );
                }}
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
