import React from "react";
import "./App.css";
import Learning from "./pages/PersonalTrainningPage/LearningPage";
import Main from "./pages/MainPage/Main";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Admin from "./pages/AdminPage/Admin";
import AdminWordList from "./pages/AdminPage/AdminWordList";
import AdminWordRegist from "./pages/AdminPage/AdminWordRegist";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/learning">Learning</Link>
          </li>
          <li>
            <Link to="/admin">관리자 페이지</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/wordlist" element={<AdminWordList />} />
        <Route path="/admin/wordregist" element={<AdminWordRegist />} />
      </Routes>
    </Router>
  );
}

export default App;
