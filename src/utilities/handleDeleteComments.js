export function handleDelete(deletedCommentId, setComments, setError) {
  fetch(`https://ncnews-clfh.onrender.com/api/comments/${deletedCommentId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }
    })
    .then(() => {
      setComments((comments) =>
        comments.filter((comment) => comment.comment_id !== deletedCommentId)
      );
    })
    .catch((err) => {
      setError(err.msg);
    });
}
