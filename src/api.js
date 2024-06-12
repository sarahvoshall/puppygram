const api = {
  async getBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    return data.message;
  },

  async getImages(breed) {
    const url = breed.includes(" ")
      ? `https://dog.ceo/api/breed/${breed
          .split(" ")
          .join("/")}/images/random/6`
      : `https://dog.ceo/api/breed/${breed}/images/random/6`;

    const response = await fetch(url);
    const data = await response.json();

    return data.message.map((img) => {
      return { breed: breed, image: img };
    });
  },
};

export default api;
