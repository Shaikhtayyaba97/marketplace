"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/4.jpg",
  "/7.jpg",
  "/5.jpg",
  "/9.jpg",
  "/11.jpg",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Har 2 sec baad image change hogi

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center h-[400px] md:h-[500px] bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-200 overflow-hidden">
      <div className="relative w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] h-[300px] md:h-[400px] flex">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt="slider image"
            width={1200}
            height={400}
            className={`absolute w-full h-full object-contain rounded-lg transition-transform duration-1000 ease-in-out ${
              index === currentIndex
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-full opacity-0 scale-95"
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`, // Smooth left-to-right move
              transition: "transform 1s ease-in-out, opacity 1s ease-in-out, scale 1s ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;