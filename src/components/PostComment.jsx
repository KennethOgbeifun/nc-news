import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function PostComment() {
  const { article_id } = useParams();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    fetch(
      `https://ncnews-clfh.onrender.com/api/articles/${article_id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, body }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error posting");
        }
        res.json();
      })
      .then((data) => {
        setSubmitting(false);
        setUsername("");
        setBody("");
      })
      .catch((err) => {
        setError(err.message);
        setSubmitting(false);
      });
  }

  return (
    <>
      <div className="submit-comment">
        <h3>Post a comment</h3>
        {error && <p className="error">Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Your Comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </div>
    </>
  );
}
