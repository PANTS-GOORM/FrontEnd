import React from "react";
import userStore from "../../store/user"; // 스토어 경로는 실제 구조에 맞게 조정하세요.

const Header = () => {
  // Zustand 스토어의 상태와 액션을 사용
  const { user, loginUser, logoutUser } = userStore();
  const imgURL: string =
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910";

  const handleLogin = () => {
    // exUser 정보로 로그인
    loginUser({
      userToken: "123asdzxc",
      userName: "KimMinBeom",
      profileImg: `${imgURL}`, // 실제 사용 가능한 이미지 URL로 교체 필요
      isAdmin: true,
    });
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    logoutUser(); // 로그아웃
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
                  onClick={handleLogin}
                  className="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  로그인
                </button>
                <a
                  href="/signup"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  회원가입
                </a>
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
    </header>
  );
};

export default Header;
