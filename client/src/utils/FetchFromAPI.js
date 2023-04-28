import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

// you can add your own rapid api key below or in '.env' file
const REACT_APP_RAPID_API_KEY =
  "1b833ec468mshb55c1fb80c72afbp1dc25ejsncd2a60ae0551";

const options = {
  params: { maxResults: "50" },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const FetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
