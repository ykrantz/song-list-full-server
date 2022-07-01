const searchFromApi = async (value) => {
  const ApiKeys = [
    process.env.RAPID_YOUTUBE_KEY,
    process.env.RAPID_YOUTUBE_KEY_SECONDERY,
  ];
  if (value.length > 20) {
    return { message: "Too long. try less than 20 letters", status: 400 };
  }
  console.log({ value }, 14);
  const axios = require("axios").default;
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: value },
    headers: {
      "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
      "x-rapidapi-key": ApiKeys[1],
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      const resultsVideoList = response.data.items.filter(
        (item) => item.type == "video"
      );
      // console.log(resultsVideoList[0], { rapidKey });
      return resultsVideoList;
    })
    .catch(function (error) {
      // console.error("EROR :", error);
      console.log(error?.response?.status, 13);
      if (error?.response?.status === 429) {
        throw {
          code: error?.response?.status,
          message: error?.response?.statusText,
        };
      }
    });
};

module.exports = { searchFromApi };
