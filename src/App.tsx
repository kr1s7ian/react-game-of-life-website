import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { HomePage } from "./pages/home_page";
import EditorPage from "./pages/editor_page";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="editor" element={<EditorPage />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
