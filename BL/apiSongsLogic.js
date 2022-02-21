const searchFromApi = (value) => {
  const axios = require("axios").default;
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: value },
    headers: {
      "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_YOUTUBE_KEY,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      // console.log({response.data});
      const resultsVideoList = response.data.items.filter(
        (item) => item.type == "video"
      );
      // console.log({ resultsVideoList });
      return resultsVideoList;
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = { searchFromApi };
