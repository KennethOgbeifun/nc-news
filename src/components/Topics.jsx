import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Topics({variant = "default"}) {
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

  function capitalise(slug) {
    let name = slug
    name = name.charAt(0).toUpperCase() + name.slice(1)
    return name
  }

  const docked = variant === "docked"
  const edgeW = docked ? "w-4" : "w-8"
  const padX = docked ? "px-6" : "px-8"
  const padY = docked ? "py-1" : "py-2"
  const text = docked ? "text-xs md:text-sm" : "text-sm"

  return (
      <div className="relative isolate">
        <div className={`pointer-events-none absolute inset-y-0 left-0 ${edgeW} bg-gradient-to-r from-gray-50 to-transparent z-20`} />
        <div className={`pointer-events-none absolute inset-y-0 right-0 ${edgeW} bg-gradient-to-l from-gray-50 to-transparent z-20`} /> 
      
        <div className={`relative z-10 flex items-center gap-2 overflow-x-auto ${padX} ${padY} scroll-ps-6 scroll-pe-6 snap-x snap-mandatory`}>
          {topics.map((topic) => (
            <NavLink
              key={topic.slug}
              to={`/topics/${topic.slug}`}
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              className={({ isActive }) =>
                [
                  "group relative isolate inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 font-medium focus:outline-none transition-colors",
                text,
                // pill on ::before so text stays crisp on hover
                "before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:transition-transform before:duration-150 before:transform before:transform-gpu",
                // hover (no text blur)
                
                // focus ring
                "focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                // active vs idle
                isActive
                  ? "text-white before:bg-blue-600 before:border-blue-600 ring-2 ring-blue-500 ring-offset-1"
                  : "text-blue-700 before:bg-white before:border-blue-600 hover:before:scale-105 hover:before:bg-blue-500 hover:text-white",
              ].join(" ")
              }
            >
              <span className="relative z-10 subpixel-antialiased">
                {capitalise(topic.slug)}
              </span>
            </NavLink>
          ))}
      </div> 
    </div>
  
    
  );
}

export default Topics;
