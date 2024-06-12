import React from "react";

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <div id="images-container">
      {images.length > 0 ? (
        images.map((image, index) => (
          <img
            key={index}
            alt={image.breed}
            src={image.image}
            onClick={() => onOpenModal(index)}
          />
        ))
      ) : (
        <p>No images.</p>
      )}
    </div>
  );
};

export default ImageGallery;
