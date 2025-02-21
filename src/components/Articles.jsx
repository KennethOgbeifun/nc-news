import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://ncnews-clfh.onrender.com/api/articles")
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
  }, []);
  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container">
        <h1 className="title">Articles</h1>
        <div className="article-grid">
          {articles.map((article) => {
            return (
              <div key={article.article_id} className="article-card">
                <Link to={`/articles/${article.article_id}`}>
                  <h2 className="article-title">{article.title}</h2>
                </Link>{" "}
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
                  Will change to the article.body <br />
                  ---Change--- <br />
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Omnis cumque repellat quasi a ut voluptatum maiores, velit
                  distinctio quas excepturi delectus itaque maxime fugiat
                  veritatis aut quam, quae quaerat quis?
                </p>
                <p className="article-data">
                  Votes: {article.votes} || Add a symbol!!
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
