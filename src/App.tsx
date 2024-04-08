import React from "react";
import "./App.css";
import Learning from "./pages/PersonalTrainningPage/LearningPage";
import Main from "./pages/MainPage/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/AdminPage/Admin";
import AdminWordList from "./pages/AdminPage/AdminWordList";
import AdminWordRegist from "./pages/AdminPage/AdminWordRegist";
import Header from "./components/header/Header";
import MyPage from "./pages/MyPage/MyPage";
import MySetting from "./pages/MyPage/MySetting";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/mysetting" element={<MySetting />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/wordlist" element={<AdminWordList />} />
        <Route path="/admin/wordregist" element={<AdminWordRegist />} />
      </Routes>
    </Router>
  );
}

export default App;
