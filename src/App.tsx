import React from "react";
import "./App.css";
import Learning from "./pages/PersonalTrainningPage/LearningPage";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/learning">Learning</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/learning" element={<Learning />} />
      </Routes>
    </Router>
  );
}

export default App;
