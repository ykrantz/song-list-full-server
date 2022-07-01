const searchFromApi = async (value) => {
  try {
    if (value.length > 20) {
      return { message: "Too long. try less than 20 letters", status: 400 };
    }
    console.log({ value }, { rapidKey }, 14);
    return await searchFromApiByKey(value, process.env.RAPID_YOUTUBE_KEY);
    // return await searchFromApiByKey(value, process.env.RAPID_YOUTUBE_KEY);
  } catch (e) {
    // console.log(e);
    if (error?.response?.status === 429) {
      console.log("yes2");
      // try second key. when first key is close becuase of too many attempts
      console.log("Trying second key");
      // return await searchFromApi(
      //   value,
      // process.env.RAPID_YOUTUBE_KEY_SECONDERY
      // );
      // const secondSearchTry=await  searchFromApi(value, process.env.RAPID_YOUTUBE_KEY_SECONDERY);
      // if (secondSearchTry) {
      //   console.log("got good ans in second try");
      //   throw secondSearchTry;
      // } else {
      //   throw {
      //     code: error?.response?.status,
      //     message: error?.response?.statusText,
      //   };
      // }
    }
  }
};

const searchFromApiByKey = (
  value,
  rapidKey = process.env.RAPID_YOUTUBE_KEY
) => {
  if (value.length > 20) {
    return { message: "Too long. try less than 20 letters", status: 400 };
  }
  console.log({ value }, { rapidKey }, 14);
  const axios = require("axios").default;
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: value },
    headers: {
      "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
      "x-rapidapi-key": rapidKey,
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
        if (rapidKey === process.env.RAPID_YOUTUBE_KEY) {
          // try second key. when first key is close becuase of too many attempts
          console.log("Trying second key");
          searchFromApi(value, process.env.RAPID_YOUTUBE_KEY_SECONDERY);
          throw {
            code: error?.response?.status,
            message: error?.response?.statusText,
          };
        }
      }
    });
};

module.exports = { searchFromApi };
