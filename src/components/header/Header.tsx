import React, { useState } from "react";
import useOAuthAxios from "../../hook/useOAuthAxios";
import userStore from "../../store/user"; // 스토어 경로는 실제 구조에 맞게 조정하세요.
import LoginModal from "./LoginModal";

const Header = () => {
  // Zustand 스토어의 상태와 액션을 사용
  const { user, logoutUser } = userStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const axios = useOAuthAxios();

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    logoutUser(); // 로그아웃

    axios.post("/logout").catch((error) => {
      console.error("Logout failed:", error);
    });

    window.location.href = `${process.env.REACT_APP_OAUTH_URL}/oauth2/logout`;
  };

  // 로그인 모달 열기
  const openLoginModal = () => {
    setModalIsOpen(true);
  };

  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setModalIsOpen(false);
  };

  return (
    <header>
      <nav className="bg-white opacity-85 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="/img/wordsketch_logo.png"
              className="h-6 mr-3 sm:h-9"
              alt="Word Sketch Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Word Sketch
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {!user ? (
              <>
                <button
                  onClick={openLoginModal}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  로그인
                </button>
              </>
            ) : (
              <>
                <a
                  href={user.isAdmin ? "/admin" : "/mypage"}
                  className="text-white bg-black hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  {user.isAdmin ? "관리자 페이지" : "마이 페이지"}
                </a>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeLoginModal} />
    </header>
  );
};

export default Header;
