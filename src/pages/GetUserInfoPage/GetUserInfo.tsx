import React, { useState, useEffect } from "react";

const GetUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const userJson = queryParams.get("user");

    if (userJson) {
      try {
        // 쿼리 파라미터의 문자열을 JSON 객체로 변환
        const userData = JSON.parse(decodeURIComponent(userJson));
        setUserInfo(userData);
      } catch (error) {
        console.error("Error parsing user JSON:", error);
      }
    }
  }, []);

  return (
    <>
      <h1>User Information</h1>
      {userInfo ? (
        <ul>
          <li>Email: {userInfo.email}</li>
          <li>Nickname: {userInfo.nickname}</li>
        </ul>
      ) : (
        <p>No user data available.</p>
      )}
    </>
  );
};

export default GetUserInfo;
