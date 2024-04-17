import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../../store/user";

const GetUserInfo = () => {
  const { loginUser } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const userJson = queryParams.get("user");

    if (userJson) {
      try {
        // 쿼리 파라미터의 문자열을 JSON 객체로 변환
        const userData = JSON.parse(decodeURIComponent(userJson));
        const { email, nickname, profileImg, admin } = userData;

        loginUser({
          email: email,
          nickname: nickname,
          profileImg: profileImg,
          isAdmin: admin,
        });

        // 로그인 후 리다이렉션 처리
        navigate("/");
      } catch (error) {
        console.error("Error parsing user JSON:", error);
      }
    }
  }, []);

  return (
    <>
      <h1>User Information</h1>
    </>
  );
};

export default GetUserInfo;
