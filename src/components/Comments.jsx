import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleDelete } from "../utilities/handleDeleteComments";

function GetComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(
      `https://ncnews-clfh.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject("msg: error");
        } else {
          setComments(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {return <p className="bg-white border rounded-2xl shadow-sm p-6">Loading...</p>;}
  if (error) {return <p className="bg-white border rounded-2xl shadow-sm p-6 text-red-600">Error: {error}</p>;}

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-blue-700">
        Comments {comments.length > 0 && <span className="text-blue-500">({comments.length})</span>}
      </h3>

      {comments.length === 0 ? (
        <p className="mt-3 text-blue-600">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-200">
          {comments.map((comment) => (
            <li key={comment.comment_id} className="py-4">
              <p className="text-blue-700 leading-relaxed">{comment.body}</p>

              <div className="mt-3 flex items-center justify-between text-sm text-blue-600">
                <span>
                  By {comment.author} on{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>

                <button
                  onClick={() => handleDelete(comment.comment_id, setComments, setError)}
                  className="inline-flex items-center rounded-full border border-red-300 text-red-600 px-3 py-1 hover:bg-red-50 text-xs transition"
                  title="Delete comment"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetComments;
