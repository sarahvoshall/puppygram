const api = {
  async getBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    return data.message;
  },

  // accepts an array of breeds
  async getImages(breed) {
    const url = breed.includes(" ")
      ? `https://dog.ceo/api/breed/${breed
          .split(" ")
          .join("/")}/images/random/2`
      : `https://dog.ceo/api/breed/${breed}/images/random/10`;

    const response = await fetch(url);
    const data = await response.json();

    return data.message.map((img) => {
      return { breed: breed, image: img };
    });
  },
};

// api.getImages("akita")

export default api;
