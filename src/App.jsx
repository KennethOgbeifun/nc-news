import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Articles from "./components/Articles";

function App() {
  return (
    <>
      <div>
        <Nav />
        <Articles />
      </div>
    </>
  );
}

export default App;
