export function handleVote(
  change,
  singleArticle,
  setSingleArticle,
  article_id
) {
  const previousArticle = singleArticle;

  setSingleArticle((article) => ({
    ...article,
    votes: article.votes + change,
  }));

  fetch(`https://ncnews-clfh.onrender.com/api/articles/${article_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inc_votes: change }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setSingleArticle(data[0]);
    })
    .catch((err) => {
      console.error(err);
      setSingleArticle(previousArticle);
    });
}
