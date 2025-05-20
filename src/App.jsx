import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import { SingleArticle } from "./components/SingleArticle";
function App() {
  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/topics/:topic" element={<Articles />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
