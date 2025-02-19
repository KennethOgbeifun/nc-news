import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import { SingleArticle } from "./components/singleArticle";
function App() {
  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
