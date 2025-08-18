import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Topics from "./Topics";

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
        <h1 className="mt-10 text-4xl sm:text-5xl front-extrabold tracking-tight">
          {topic ? `Articles in ${topic[0].toUpperCase() + topic.slice(1)}` : "Latest Articles"}
        </h1>
        <p className="mt-3 text-blue-600 max-w-2xl">
          Handpicked stories from the community. Browse by topic or dive right in.
        </p>

        <div id="topics-anchor" className="h-0"></div>
        <section className="mt-6">
            <Topics />
          </section>

        <section className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {articles.map((article) => (
             
              <article 
                key={article.article_id} 
                className="mb-6 break-inside-avoid rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                
                  {article.article_img_url && (
                    <Link to={`/articles/${article.article_id}`} className="block group">
                    <img
                      className="w-full h-56 object-cover transition group-hover:opacity-95"
                      src={article.article_img_url}
                      alt={article.title}
                      loading="lazy"
                    />
                    </Link>

                  )}

                <div className="p-4">
                  <Link to={`/articles/${article.article_id}`} className="no-underline">
                    <h2 className="text-lg font-semibold leading-snug hover:text-blue-600 transition">
                      {article.title}
                    </h2>
                  </Link>
                  <div className="mt-2 text-xs text-blue-600 flex items-center gap-3">
                    <span>
                      By {article.author}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"> </span>
                    <span>Votes {article.votes} 👍</span>
                  </div>

                  {article.body && (
                    <p className="mt-3 text-blue-600">
                       {article.body.length > 160 ? `${article.body.slice(0, 160)}...` : article.body}   
                    </p>
                  )}

                  <div className="mt-4">
                    <Link 
                      to={`/articles/${article.article_id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
          ))}
        </section>
      </div>
    </>
  );
}

export default Articles;
