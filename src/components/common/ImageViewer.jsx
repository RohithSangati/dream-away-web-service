import React, { useState } from "react";

const ImageViewer = ({ images = [], closeViewer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <button
          className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
          onClick={closeViewer}
        >
          &times;
        </button>
        <button
          className="absolute left-5 text-white text-3xl font-bold cursor-pointer"
          onClick={prevImage}
        >
          &#8592;
        </button>
        <img
          src={images[currentIndex]}
          alt={`img-${currentIndex}`}
          className="max-h-[80vh] max-w-[80vw] rounded shadow-lg"
        />
        <button
          className="absolute right-5 text-white text-3xl font-bold cursor-pointer"
          onClick={nextImage}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
