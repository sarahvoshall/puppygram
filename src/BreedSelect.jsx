import React from "react";
import Select from "react-select";
import capitalize from "./capitalize";

const customStyles = {
  control: (provided) => ({
    ...provided,
    maxWidth: 400,
  }),
  menu: (provided) => ({
    ...provided,
    textAlign: "left",
  }),
};

const BreedSelect = ({ breeds, onSelectChange }) => {
  const getOptionLabel = (option) => capitalize(option.label);

  const breedOptions = Object.keys(breeds).flatMap((breed) =>
    breeds[breed].length > 0
      ? breeds[breed].map((subBreed) => ({
          value: `${breed} ${subBreed}`,
          label: `${breed} ${subBreed}`,
        }))
      : [{ value: breed, label: breed }]
  );

  return (
    <Select
      options={breedOptions}
      onChange={onSelectChange}
      placeholder="Select or search for a breed"
      styles={customStyles}
      getOptionLabel={getOptionLabel}
    />
  );
};

export default BreedSelect;
