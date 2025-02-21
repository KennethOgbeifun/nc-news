import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="comments-section">
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p>{comment.body}</p>
              <p className="comment-author">
                By {comment.author} on{" "}
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default GetComments;
