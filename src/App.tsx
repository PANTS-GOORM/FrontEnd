import React from "react";
import "./App.css";
import LearningPage from "./pages/PersonalTrainningPage/LearningPage";
import LearningSelectPage from "./pages/PersonalTrainningPage/LearningSelectPage";
import Main from "./pages/MainPage/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/AdminPage/Admin";
import AdminWordList from "./pages/AdminPage/AdminWordList";
import AdminWordRegist from "./pages/AdminPage/AdminWordRegist";
import Header from "./components/header/Header";
import MyPage from "./pages/MyPage/MyPage";
import MySetting from "./pages/MyPage/MySetting";
import GetUserInfo from "./pages/GetUserInfoPage/GetUserInfo";
import RequireAdmin from "./pages/AdminPage/RequireAdmin";
import ResultPage from "./pages/PersonalTrainningPage/ResultPage";
import SolvedWordPage from "./pages/SolvedWordPage/SolvedWordPage";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/learning/select" element={<LearningSelectPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/mysetting" element={<MySetting />} />
        <Route path="/words" element={<SolvedWordPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/wordlist"
          element={
            <RequireAdmin>
              <AdminWordList />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/wordregist"
          element={
            <RequireAdmin>
              <AdminWordRegist />
            </RequireAdmin>
          }
        />
        <Route path="/login/oauth2/userinfo" element={<GetUserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
