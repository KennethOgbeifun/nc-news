import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

  function captitalise(slug) {
    let name = slug
    name = name.charAt(0).toUpperCase() + name.slice(1)
    return name
  }

  return (
  
      <div className="flex items-center gap-2">
      {topics.map((topic) => (
        <NavLink
          key={topic.slug}
          to={`/topics/${topic.slug}`}
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          className={({ isActive }) =>
            [
              "px-3 py-1 text-sm font-medium rounded-full border transition duration-200 hover:scale-105 focus:outline-none",
              isActive
                ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500 ring-offset-2"
                : "bg-white text-gray-900 border-gray-300 hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            ].join(" ")
          }
        >
          {captitalise(topic.slug)}
        </NavLink>
      ))}
    </div>
    
  );
}

export default Topics;
