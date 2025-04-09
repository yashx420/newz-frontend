import { useState } from "react";
import axios from "axios";
import "./NewsList.css";

const API_KEY = "79e34d877d0e4b168de3864b7507ee50";

const predictBias = async (headline) => {
  try {
    const response = await axios.post("https://news-bias-backend-2.onrender.com/predict", {
      text: headline,
    });
    return response.data.prediction;
  } catch (err) {
    console.error("Prediction error:", err);
    return "Uncategorized";
  }
};

function NewsList() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Left");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const encodedQuery = encodeURIComponent(query);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodedQuery}&from=2025-03-20&sortBy=popularity&apiKey=${API_KEY}`
      );
      console.log("NewsAPI response:", response);
      const fetchedArticles = response.data.articles;
  
      // Run BERT predictions for each article title
      const articlesWithBias = await Promise.all(
        fetchedArticles.map(async (article) => {
          const bias = await predictBias(article.title);
          return { ...article, bias };
        })
      );
  
      setArticles(articlesWithBias);
    } catch {
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-container">
      <h1>Search and Categorize News by Political Leaning</h1>

      <form onSubmit={handleSearch} className="news-search-form">
        <input
          type="text"
          placeholder="Enter a search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}

      <div className="tabs">
        <button
          className={activeTab === "Left" ? "active-tab" : ""}
          onClick={() => setActiveTab("Left")}
        >
          Left-Leaning News
        </button>
        <button
          className={activeTab === "Center" ? "active-tab" : ""}
          onClick={() => setActiveTab("Center")}
        >
          Center-Leaning News
        </button>
        <button
          className={activeTab === "Right" ? "active-tab" : ""}
          onClick={() => setActiveTab("Right")}
        >
          Right-Leaning News
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "Left" && (
          <div className="news-list">
            <h2>Left-Leaning News</h2>
            <ul>
            {articles
              .filter((article) => article.bias === "Left")
              .map((article, index) => (
                <li key={index}>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </li>
))}

            </ul>
          </div>
        )}

        {activeTab === "Center" && (
          <div className="news-list">
            <h2>Center-Leaning News</h2>
            <ul>
            {articles
  .filter((article) => article.bias === "Center")
  .map((article, index) => (
    <li key={index}>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </li>
))}

            </ul>
          </div>
        )}

        {activeTab === "Right" && (
          <div className="news-list">
            <h2>Right-Leaning News</h2>
            <ul>
            {articles
  .filter((article) => article.bias === "Right")
  .map((article, index) => (
    <li key={index}>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </li>
))}

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsList;
