import axios from "axios";

const API_KEY = "79e34d877d0e4b168de3864b7507ee50";

// Fetch news based on the news sources
export const fetchNewsBySource = async (sources) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&from=2024-09-23&sortBy=popularity&apiKey=${API_KEY}`
    );
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news from NewsAPI:", error);
    return [];
  }
};
