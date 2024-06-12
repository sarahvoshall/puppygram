import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, image, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <figure>
          <img src={image.image} alt="puppy" className="modal-image" />
          <figcaption>{capitalizeFirstLetter(image.breed)}</figcaption>
        </figure>
        <button className="modal-prev" onClick={onPrev}>
          &#8249;
        </button>
        <button className="modal-next" onClick={onNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Modal;
