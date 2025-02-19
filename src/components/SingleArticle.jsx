import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://ncnews-clfh.onrender.com/api/articles/${article_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleArticle(data);
        console.log(data);

        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container">
        <h1 className="article-title">{singleArticle.title}</h1>
        <p className="article-data">
          By {singleArticle.author} on{" "}
          {new Date(singleArticle.created_at).toLocaleDateString()}
        </p>
        {singleArticle.article_img_url && (
          <img
            className="article-img"
            src={singleArticle.article_img_url}
            alt={singleArticle.title}
          />
        )}
        <p className="article-body">{singleArticle.body}</p>
      </div>
    </>
  );
}
