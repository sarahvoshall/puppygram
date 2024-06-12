import React from "react";
import capitalize from "./capitalize";

const SelectedBreeds = ({ breeds, onDeleteBreed }) => {
  return (
    <div id="selected-breeds">
      {breeds.map((breed, index) => (
        <button
          className="selected"
          key={index}
          onClick={() => onDeleteBreed(breed)}
        >
          {capitalize(breed)} <span className="delete-selected">&times;</span>
        </button>
      ))}
    </div>
  );
};

export default SelectedBreeds;
