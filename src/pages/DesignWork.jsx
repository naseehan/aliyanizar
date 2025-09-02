import React, { useState } from "react";

const slides = [
  { id: 1, src: "https://picsum.photos/id/1018/600/400", alt: "Slide 1" },
  { id: 2, src: "https://picsum.photos/id/1015/600/400", alt: "Slide 2" },
  { id: 3, src: "https://picsum.photos/id/1019/600/400", alt: "Slide 3" },
  { id: 4, src: "https://picsum.photos/id/1020/600/400", alt: "Slide 4" },
  { id: 5, src: "https://picsum.photos/id/1021/600/400", alt: "Slide 5" },
];

export default function DesignWork() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-10 mt-40">
      {/* Slides wrapper */}
      <div className="flex items-center justify-center gap-4 transition-all duration-500">
        {slides.map((slide, i) => {
          // figure out if slide is active, left, or right
          let position = "scale-75 opacity-50";
          if (i === current) {
            position = "scale-100 opacity-100 z-10";
          } else if (
            i === (current - 1 + slides.length) % slides.length ||
            i === (current + 1) % slides.length
          ) {
            position = "scale-90 opacity-80";
          }

          return (
            <img
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              className={`w-64 h-40 object-cover rounded-xl shadow-lg transition-transform duration-500 ${position}`}
            />
          );
        })}
      </div>

      {/* Left button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ◀
      </button>

      {/* Right button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
