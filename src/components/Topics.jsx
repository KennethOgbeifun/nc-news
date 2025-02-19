import { useEffect, useState } from "react";

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
      {topics.length > 0 && (
        <>
          <button>{topics[0]?.slug}</button>
          <button>{topics[1]?.slug}</button>
          <button>{topics[2]?.slug}</button>
        </>
      )}
    </>
  );
}

export default Topics;
