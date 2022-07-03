const searchFromApi = async (value) => {
  const ApiKeys = [
    process.env.RAPID_YOUTUBE_KEY,
    process.env.RAPID_YOUTUBE_KEY_SECONDERY,
  ];
  if (value.length > 20) {
    return { message: "Too long. try less than 20 letters", status: 400 };
  }
  // pick random key. in order to use less request in each key . becuase of high cost
  const randomApiKey = ApiKeys[pickRandomKey(0, 1)];
  console.log({ randomApiKey });
  const axios = require("axios").default;
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: value },
    headers: {
      "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
      "x-rapidapi-key": randomApiKey,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      const resultsVideoList = response.data.items.filter(
        (item) => item.type == "video"
      );
      return resultsVideoList;
    })
    .catch(function (error) {
      console.error("EROR :", error);
      if (error?.response?.status === 429) {
        throw {
          code: error?.response?.status,
          message: error?.response?.statusText,
        };
      }
    });
};

const pickRandomKey = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};
module.exports = { searchFromApi };
