import { useEffect, useState } from "react";

function Articles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("https://ncnews-clfh.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject("msg: error");
        } else {
          setArticles(data);
        }
      })
      .catch((error) => console.error("error fetching"));
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">Articles</h1>
        <div className="article-grid">
          {articles.map((article) => {
            return (
              <div key={article.article_id} className="article-card">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-data">By {article.author}</p>
                <p className="article-preview">
                  Will change to the article.body <br />
                  ---Change--- <br />
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Omnis cumque repellat quasi a ut voluptatum maiores, velit
                  distinctio quas excepturi delectus itaque maxime fugiat
                  veritatis aut quam, quae quaerat quis?
                </p>
                <p className="article-data">
                  Topic: {article.topic} || Create link to topic when built!
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
