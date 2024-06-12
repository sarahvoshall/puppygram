import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./api.js";
import BreedSelect from "./BreedSelect";
import SelectedBreeds from "./SelectedBreeds";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Footer from "./Footer.jsx";

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

  const handleSelectChange = async (selectedOption) => {
    const selectedBreed = selectedOption.value;
    if (!selectedBreeds.includes(selectedBreed)) {
      setSelectedBreeds([...selectedBreeds, selectedBreed]);

      try {
        const data = await api.getImages(selectedBreed);
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
  };

  const handleDeleteSelectedBreed = (selectedBreed) => {
    setSelectedBreeds(selectedBreeds.filter((breed) => breed !== selectedBreed));
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
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="App">
      <header>
        <h1>Puppygram</h1>
        <BreedSelect breeds={breeds} onSelectChange={handleSelectChange} />
        <SelectedBreeds breeds={selectedBreeds} onDeleteBreed={handleDeleteSelectedBreed} />
      </header>
      <ImageGallery images={images} onOpenModal={handleOpenModal} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={images[selectedImageIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
