import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import { SingleArticle } from "./components/SingleArticle";
function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-blue-700">
        <Nav />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/topics/:topic" element={<Articles />} />
          </Routes>
        </main>
        <footer className="mt-16 py-8 text-center text-sm text-blue-500">
          © {new Date().getFullYear()} Nc News
        </footer>
      </div>
    </>
  );
}

export default App;
