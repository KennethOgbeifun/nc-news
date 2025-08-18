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
    <div className="bg-white border rounded-2xl shadow-sm p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-blue-700">Post a comment</h3>
      {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Your Username
          </label>
          <input
            type="text"
            placeholder="e.g. cooljmessy"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-blue-700 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700">
            Your Comment
          </label>
          <textarea
            placeholder="Write something thoughtful…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-blue-700 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? "Submitting…" : "Submit Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}
