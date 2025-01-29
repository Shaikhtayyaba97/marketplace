"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/ccup.jpg",
  "/10.jpg",
  "/cring.jpg",
  "/cbraclet.jpg",
  "/menwatch.jpg",
  "/7.jpg",
  "/wwatch.jpg",
  "/ccup.jpg",
  "/10.jpg",
  "/cring.jpg",
  "/mshampoo.jpg"
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#6EC207] via-[#A8E063] to-[#D0F0C0] px-4 pt-4 md:pt-0">
      <div className="relative w-full max-w-3xl h-72 md:h-96 overflow-hidden rounded-lg shadow-lg bg-white/30 backdrop-blur-md p-2">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute w-full h-full object-contain rounded-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageSlider;