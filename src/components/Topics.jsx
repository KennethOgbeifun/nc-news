import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Topics() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("https://ncnews-clfh.onrender.com/api/topics")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject("msg: error");
        } else {
          setTopics(data);
        }
      })
      .catch((error) => console.error("error fetching"));
  }, []);

  return (
    <>
      {topics.length > 0 &&
        topics.map((topic) => (
          <Link key={topic.slug} to={`/topics/${topic.slug}`}>
            <button>{topic.slug}</button>
          </Link>
        ))}
    </>
  );
}

export default Topics;
