import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetComments from "./Comments";
import { handleVote } from "../utilities/handleVotes";
import { PostComment } from "./PostComment";

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
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p className="px-4">Loading...</p>;
  if (error) return <p className="px4 text-red-600">Error: {error}</p>;

  const date = new Date(singleArticle.created_at).toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Article card */}
      <article className="mt-8 bg-white border rounded-2xl shadow-sm">
        <header className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-700">
            {singleArticle.title}
          </h1>
          <div className="mt-2 text-sm text-blue-600 flex items-center gap-3 flex-wrap">
            <span>By {singleArticle.author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <time dateTime={singleArticle.created_at}>{date}</time>
          </div>
        </header>

        {singleArticle.article_img_url && (
          <div className="px-6 sm:px-8">
            <img
              className="w-full aspect-[16/9] object-cover rounded-xl"
              src={singleArticle.article_img_url}
              alt={singleArticle.title}
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Body */}
          <div className="space-y-4 text-blue-700 leading-relaxed">
            {String(singleArticle.body)
              .split(/\n{2,}/)
              .map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleVote(1, singleArticle, setSingleArticle, article_id);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-600 text-blue-700 px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
            >
              👍 Like
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleVote(-1, singleArticle, setSingleArticle, article_id);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 text-blue-600 px-4 py-2 text-sm hover:bg-blue-50 transition"
            >
              👎 Dislike
            </button>

            <span className="ml-auto text-sm text-blue-600">
              Votes: {singleArticle.votes}
            </span>
          </div>
        </div>
      </article>

      {/* Comment box */}
      <section className="mt-8">
        <PostComment />
      </section>

      {/* Comments list */}
      <section className="mt-6">
        <GetComments />
      </section>
    </div>
  );
}
