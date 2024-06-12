// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./api.js";
import Modal from "./Modal";
import Select from "react-select";

function App() {
  const [breeds, setBreeds] = useState({});
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.getBreeds();
        setBreeds(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    const selectedBreed = selectedOption.value;
    if (!selectedBreeds.includes(selectedBreed)) {
      setSelectedBreeds([...selectedBreeds, selectedBreed]);
    }

    async function fetchImages() {
      try {
        const data = await api.getImages(selectedBreed);
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchImages();
  };

  const handleDeleteSelectedBreed = (selectedBreed) => {
    setSelectedBreeds(
      selectedBreeds.filter((breed) => breed !== selectedBreed)
    );

    setImages(images.filter((image) => image.breed !== selectedBreed));
  };

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxWidth: 400, // Adjust the minimum width of the control
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left", // Align options to the left
    }),
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getOptionLabel = (option) => {
    return capitalizeFirstLetter(option.label);
  };

  const breedOptions = Object.keys(breeds).flatMap((breed) =>
    breeds[breed].length > 0
      ? breeds[breed].map((subBreed) => ({
          value: `${breed} ${subBreed}`,
          label: `${breed} ${subBreed}`,
        }))
      : [{ value: breed, label: breed }]
  );

  return (
    <div className="App">
      <header>
        <h1>Puppygram</h1>
        <Select
          options={breedOptions}
          onChange={handleSelectChange}
          placeholder="Select or search for a breed"
          styles={customStyles}
          getOptionLabel={getOptionLabel}
        />
        <div id="selected-breeds">
          {selectedBreeds.map((breed, index) => (
            <button
              className="selected"
              key={index}
              onClick={() => handleDeleteSelectedBreed(breed)}
            >
              {capitalizeFirstLetter(breed)}{" "}
              <span className="delete-selected">&times;</span>
            </button>
          ))}
        </div>
      </header>
      <div id="images-container">
        {images.length > 0 ? (
          images.map((image, index) => (
            <>
              <img
                key={index}
                alt={image.breed}
                src={image.image}
                onClick={() => handleOpenModal(index)}
              />
              {/* <figcaption>{capitalizeFirstLetter(image.breed)}</figcaption> */}
            </>
          ))
        ) : (
          <p>No images.</p>
        )}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={images[selectedImageIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      <footer>
        <p>
          🐶 Images provided by{" "}
          <a
            href="https://dog.ceo/dog-api/documentation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dog API
          </a>
        </p>
        <p>
          👩🏻‍💻 Coded in 2024 by{" "}
          <a
            href="https://www.sashvosh.com"
            target="_blank"
            rel="noopener
            noreferrer"
          >
            Sarah Voshall
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
