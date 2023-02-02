import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { HomePage } from "./pages/home_page";
import { EditorPage } from "./pages/editor_page";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="editor" element={<EditorPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
