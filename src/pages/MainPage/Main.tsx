import React, { useState } from "react";
import userStore from "../../store/user";
import LoginModal from "../../components/header/LoginModal";
const Main = () => {
  const main_menu = [
    {
      title: "어휘 학습",
      link: "/learning/select",
      logo: "learning_logo.png",
    },
    {
      title: "경쟁 학습",
      link: "/ranklobby",
      logo: "ranking_logo.png",
    },
  ];

  // Zustand 스토어에서 사용자 상태 및 로그인 여부 확인
  const { user } = userStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 로그인 모달 열기
  const openLoginModal = () => {
    setModalIsOpen(true);
  };

  // 메뉴 클릭 이벤트 핸들러
  const handleMenuClick = (link) => {
    // if (!user) {
    //   openLoginModal(); // 로그인 되어 있지 않으면 모달 열기
    // } else {
    window.location.href = link; // 로그인 되어 있으면 해당 링크로 이동
    // }
  };

  return (
    <div className="flex justify-around min-h-screen">
      <div className="flex space-x-60">
        {main_menu.map((item) => (
          <div
            key={item.title}
            className="p-10 mx-auto my-auto bg-white rounded-full opacity-80"
          >
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleMenuClick(item.link)}
            >
              <img src={"img/" + item.logo} alt={item.title + " 로고"} />
              <p className="mt-2 text-center">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* 로그인 모달 컴포넌트 */}
      <LoginModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Main;
