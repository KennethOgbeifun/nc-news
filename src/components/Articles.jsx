import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();
  useEffect(() => {
    let url = "https://ncnews-clfh.onrender.com/api/articles";
    if (topic) {
      url += `?topic=${topic}`;
    }
    console.log("Fetching", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject("msg: error");
        } else {
          setArticles(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(error.msg);
        setIsLoading(false);
      });
  }, [topic]);
  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container">
        <h1 className="title">Articles {topic ? `in ${topic}` : ""}</h1>
        <div className="article-grid">
          {articles.map((article) => {
            return (
              <div key={article.article_id} className="article-card">
                <Link to={`/articles/${article.article_id}`}>
                  <h2 className="article-title">{article.title}</h2>
                </Link>
                <p className="article-data">By {article.author}</p>
                <div>
                  {article.article_img_url && (
                    <img
                      className="article-img-small"
                      src={article.article_img_url}
                      alt={article.title}
                    />
                  )}
                </div>
                <p className="article-preview">
                 {article.body}
                </p>
                <p className="article-data">
                  Votes: {article.votes} 👍
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Articles;
